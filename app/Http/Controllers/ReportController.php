<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetOrderByDateRequest;
use App\Models\Order;
use App\Services\QueryBuilderService;
use DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
  protected $builderService;
  protected $dbOrder;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
    $this->dbOrder = new Order();
  }

  public function index(Request $request, Order $order)
  {
    $startYear = $this->dbOrder->min(DB::raw('YEAR(created_at)')) ?? now()->year;
    $currentYear = now()->year;
    $years = range($startYear, $currentYear);
    $currentMonth = now()->month;

    if ($request->query('year')) {
      $currentYear = (int) $request->query('year');
    }

    if ($request->query('month')) {
      $currentMonth = (int) $request->query('month');
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
      'searchFields' => ['order_date', 'buyer_name']
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
      ->whereBetween('order_date', [
        now()->setYear($currentYear)->setMonth($currentMonth)->startOfMonth(),
        now()->setYear($currentYear)->setMonth($currentMonth)->endOfMonth()
      ]);

    // if no sort, default to updated_at
    if (!$request->query('sort')) {
      $query->orderBy('orders.created_at', 'desc');
    }

    $orders = $this->builderService->paginateQuery($query, 10);
    $profitThisMonth = $this->dbOrder
      ->join('order_items', 'orders.id', '=', 'order_items.order_id')
      ->where('is_paid', true)
      ->whereBetween('order_date', [
        now()->setYear($currentYear)->setMonth($currentMonth)->startOfMonth(),
        now()->setYear($currentYear)->setMonth($currentMonth)->endOfMonth()
      ])
      ->sum('subtotal');
    $ordersThisMonth = Order::with('items.menu')
      ->whereMonth('created_at', $currentMonth)
      ->where('buyer_type', 'non-it')
      ->get();
    $monthlyDepositTotal = $ordersThisMonth->sum(function ($order) {
      return $order->items->sum(function ($item) {
        return $item->menu->deposit * $item->qty;
      });
    });

    return Inertia::render('Report/index', [
      'data' => [
        'orders' => $orders,
        'years' => $years,
        'selectedYear' => $currentYear,
        'selectedMonth' => $currentMonth,
        'profitThisMonth' => $profitThisMonth,
        'monthlydeposittotal' => $monthlyDepositTotal,
      ]
    ]);
  }

  public function getOrder(GetOrderByDateRequest $request): JsonResponse
  {
    try {
      $validated = $request->validated();

      $data = $this->dbOrder
        ->join('order_items', 'orders.id', '=', 'order_items.order_id')
        ->join('menus', 'menus.id', '=', 'order_items.menu_id')
        ->whereBetween('order_date', [
          $validated['start_date'],
          $validated['end_date']
        ])
        ->select(
          'orders.id',
          'order_date',
          'buyer_name',
          'name',
          'qty',
          'price',
          'subtotal',
          'is_paid'
        )
        ->get();

      return response()->json([
        'success' => true,
        'message' => 'Successfully fetching order data.',
        'data' => $data,
      ], 200);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Something wrong, please try again later!',
        'errors' => $e->getMessage(),
      ], 500);
    }
  }

  public function destroy(Order $order): JsonResponse
  {
    $order->delete();
    return response()->json([
      'message' => 'Order deleted successfully, BLE BLE BLE',
      'success' => true,
      'status' => 200,
    ], 200);
  }
}
