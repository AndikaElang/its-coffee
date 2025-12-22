<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Menu;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\orderItem;
use App\Services\QueryBuilderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SaleController extends Controller
{
  protected $builderService;
  protected $dbOrder;
  protected $dbOrderItem;
  protected $dbMenu;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
    $this->dbOrder = new Order();
    $this->dbOrderItem = new orderItem();
    $this->dbMenu = new Menu();
  }

  public function index(Request $request, Order $order): Response
  {
    $editOrder = null;
    if ($request->filled('edit')) {
      $editOrder = Order::with('items.menu')
        ->where('id', $request->edit)
        ->first();
    }

    $options = [
      'allowedSorts' => [
        'orders.id',
        'order_date',
        'buyer_name',
        'buyer_type',
        'name',
        'qty',
        'price',
        'subtotal',
        'is_paid',
      ],
      'searchJoins' => [
        [
          'table' => 'order_items',
          'first' => 'orders.id',
          'second' => 'order_items.order_id',
          'searchFields' => []
        ],
        [
          'table' => 'menus',
          'first' => 'menus.id',
          'second' => 'order_items.menu_id',
          'searchFields' => ['name']
        ]
      ],
      'searchFields' => ['order_date', 'buyer_name', 'buyer_type']
    ];

    $query = $this->builderService->buildQuery($order, $options)
      ->select(
        'orders.id',
        'menu_id',
        'order_date',
        'buyer_name',
        'buyer_type',
        'payment_type',
        'extra_cup',
        'name',
        'qty',
        'price',
        'subtotal',
        'is_paid',
      )
      ->join('order_items', 'orders.id', '=', 'order_items.order_id')
      ->join('menus', 'menus.id', '=', 'order_items.menu_id')
      ->whereDate('order_date', today());

    // if no sort, default to updated_at
    if (!$request->query('sort')) {
      $query->orderBy('orders.created_at', 'desc');
    }

    $orders = $this->builderService->paginateQuery($query, 10);
    $menus = $this->dbMenu->where('is_available', true)->get();
    $profitThisMonth = $this->dbOrder
      ->join('order_items', 'orders.id', '=', 'order_items.order_id')
      ->where('is_paid', true)
      ->whereBetween('order_date', [
        now()->startOfMonth(),
        now()->endOfMonth()
      ])
      ->sum('subtotal');
    $profitAllTime = $this->dbOrder
      ->join('order_items', 'orders.id', '=', 'order_items.order_id')
      ->where('is_paid', true)
      ->sum('subtotal');

    $ordersThisMonth = Order::with('items.menu')
      ->whereMonth('created_at', now()->month)
      ->where('buyer_type', 'non-it')
      ->get();
    $monthlyDepositTotal = $ordersThisMonth->sum(function ($order) {
      return $order->items->sum(function ($item) {
        return $item->menu->deposit * $item->qty;
      });
    });

    return Inertia::render('Sale/index', [
      'data' => [
        'orders' => $orders,
        'menus' => $menus,
        'profitThisMonth' => $profitThisMonth,
        'profitAllTime' => $profitAllTime,
        'monthlyDepositTotal' => $monthlyDepositTotal,
        'editOrder' => $editOrder,
      ]
    ]);
  }

  public function store(StoreOrderRequest $request, Order $order): RedirectResponse
  {
    $validated = $request->validated();

    $order->fill([
      'order_date' => $validated['order_date'],
      'buyer_name' => $validated['buyer_name'],
      'buyer_type' => $validated['buyer_type'],
      'payment_type' => $validated['payment_type'],
      'is_paid' => $validated['is_paid'],
      'extra_cup' => $validated['extra_cup']
    ]);
    $order->save();

    $orderId = $order->id;
    $orderItem = new orderItem();

    $total = $validated['price'] * $validated['qty'];
    if ($validated['discount']) {
      $total = $total - $validated['discount'];
    }

    $orderItem->fill([
      'order_id' => $orderId,
      'menu_id' => $validated['menu_id'],
      'qty' => $validated['qty'],
      'price' => $validated['price'],
      'subtotal' => $total,
    ]);
    $orderItem->save();

    return redirect()->back();
  }

  public function update(StoreOrderRequest $request, Order $order): RedirectResponse
  {
    $validated = $request->validated();

    $order->update([
      'order_date' => $validated['order_date'],
      'buyer_name' => $validated['buyer_name'],
      'buyer_type' => $validated['buyer_type'],
      'payment_type' => $validated['payment_type'],
      'is_paid' => $validated['is_paid'],
      'extra_cup' => $validated['extra_cup']
    ]);

    $orderId = $order->id;

    $orderItem = $this->dbOrderItem->where('order_id', $orderId)->firstOrFail();
    $orderItem->update([
      'menu_id' => $validated['menu_id'],
      'qty' => $validated['qty'],
      'price' => $validated['price'],
      'subtotal' => $validated['price'] * $validated['qty'],
    ]);


    return redirect()->back();
  }

  public function destroy(Order $order): JsonResponse
  {
    $order->delete();
    return response()->json([
      'message' => 'Order deleted successfully',
      'success' => true,
      'status' => 200,
    ], 200);
  }
}
