<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetOrderByDateRequest;
use App\Http\Requests\StoreExpenseRequest;
use App\Models\Expense;
use App\Models\Order;
use App\Services\QueryBuilderService;
use DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
  protected $builderService;
  protected $dbOrder;
  protected $dbExpense;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
    $this->dbOrder = new Order();
    $this->dbExpense = new Expense();
  }

  public function index(Request $request)
  {
    $startYear = $this->dbOrder->min(DB::raw('YEAR(order_date)')) ?? now()->year;
    $endYear = $this->dbOrder->max(DB::raw('YEAR(order_date)'));
    $currentYear = now()->year;
    $years = range($startYear, $endYear);
    $currentMonth = now()->month;

    if ($request->query('year')) {
      $currentYear = (int) $request->query('year');
    }

    if ($request->query('month')) {
      $currentMonth = (int) $request->query('month');
    }

    $orderOpt = [
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
    $orderQ = $this->builderService->for('orders')->buildQuery(new Order(), $orderOpt)
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
      ->distinct()
      ->join('order_items', 'orders.id', '=', 'order_items.order_id')
      ->join('menus', 'menus.id', '=', 'order_items.menu_id')
      ->whereBetween('order_date', [
        now()->setYear($currentYear)->setMonth($currentMonth)->startOfMonth(),
        now()->setYear($currentYear)->setMonth($currentMonth)->endOfMonth()
      ]);
    $orders = $this->builderService->paginateQuery($orderQ, 10);

    $expenseOpt = [
      'allowedSorts' => [
        'id',
        'type',
        'amount',
        'created_at',
      ],
      'searchFields' => ['type', 'description'] // Add the fields you want to search
    ];
    $expenseQ = $this->builderService->for('expenses')->buildQuery(new Expense(), $expenseOpt)
      ->distinct()
      ->whereBetween('created_at', [
        now()->setYear($currentYear)->setMonth($currentMonth)->startOfMonth(),
        now()->setYear($currentYear)->setMonth($currentMonth)->endOfMonth()
      ]);
    $expenses = $this->builderService->paginateQuery($expenseQ, 10);

    $grossProfitThisMonth = $this->dbOrder
      ->join('order_items', 'orders.id', '=', 'order_items.order_id')
      ->where('is_paid', true)
      ->whereBetween('order_date', [
        now()->setYear($currentYear)->setMonth($currentMonth)->startOfMonth(),
        now()->setYear($currentYear)->setMonth($currentMonth)->endOfMonth()
      ])
      ->sum('subtotal');
    $expenseThisMonth = $this->dbExpense
      ->whereBetween('created_at', [
        now()->setYear($currentYear)->setMonth($currentMonth)->startOfMonth(),
        now()->setYear($currentYear)->setMonth($currentMonth)->endOfMonth()
      ])
      ->sum('amount');
    $netProfitThisMonth = $grossProfitThisMonth - $expenseThisMonth;
    $ordersThisMonth = $this->dbOrder->with('items.menu')
      ->whereBetween('order_date', [
        now()->setYear($currentYear)->setMonth($currentMonth)->startOfMonth(),
        now()->setYear($currentYear)->setMonth($currentMonth)->endOfMonth()
      ])
      ->where('buyer_type', 'non-it')
      ->get();
    $monthlyDepositTotal = $ordersThisMonth->sum(function ($order) {
      return $order->items->sum(function ($item) {
        return $item->menu->deposit * $item->qty;
      });
    });
    $monthlyItDepositExpenseTotal = $this->dbExpense
      ->whereBetween('created_at', [
        now()->setYear($currentYear)->setMonth($currentMonth)->startOfMonth(),
        now()->setYear($currentYear)->setMonth($currentMonth)->endOfMonth()
      ])
      ->where('type', 'bayar it')
      ->sum('amount');
    $monthlyDepositTotal -= $monthlyItDepositExpenseTotal;
    $grossProfitAllTime = $this->dbOrder
      ->join('order_items', 'orders.id', '=', 'order_items.order_id')
      ->where('is_paid', true)
      ->sum('subtotal');
    $expenseAllTime = $this->dbExpense
      ->sum('amount');
    $netProfitAllTime = $grossProfitAllTime - $expenseAllTime;

    return Inertia::render('Report/index', [
      'data' => [
        'orders' => $orders,
        'expenses' => $expenses,
        'years' => $years,
        'selectedYear' => $currentYear,
        'selectedMonth' => $currentMonth,
        'grossProfitThisMonth' => $grossProfitThisMonth,
        'expenseThisMonth' => $expenseThisMonth,
        'netProfitThisMonth' => $netProfitThisMonth,
        'monthlydeposittotal' => $monthlyDepositTotal,
        'netProfitAllTime' => $netProfitAllTime,
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

  public function storeExpense(StoreExpenseRequest $request, Expense $expense): RedirectResponse
  {
    $validated = $request->validated();

    $expense->fill([
      'type' => $validated['type'],
      'description' => $validated['description'],
      'amount' => $validated['amount'],
    ]);
    $expense->save();

    return redirect()->back();
  }

  public function updateExpense(StoreExpenseRequest $request, Expense $expense): RedirectResponse
  {
    $validated = $request->validated();

    $duar = $expense->update([
      'type' => $validated['type'],
      'description' => $validated['description'],
      'amount' => $validated['amount'],
    ]);

    return redirect()->back();
  }

  public function destroyExpense(Expense $expense): JsonResponse
  {
    $expense->delete();
    return response()->json([
      'message' => 'Expense deleted successfully',
      'success' => true,
      'status' => 200,
    ], 200);
  }
}
