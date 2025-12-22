<?php

use App\Http\Controllers\ReportController;
use App\Http\Controllers\SaleController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::fallback(function () {
  return Inertia::render('Errors/404');
});

// * Notice:
// - Public route should use "Indonesia" language
// - Admin route should use "English" language
// - Route that return JSON should use "English" language
Route::group(['middleware' => ['web']], function () {
  // Beranda
  Route::get('/', [SaleController::class, 'index'])->name('sale.index');
  Route::post('/', [SaleController::class, 'store'])->name('sale.store');
  Route::patch('/{order}/update', [SaleController::class, 'update'])->name('sale.update');
  Route::delete('/{order}/delete', [SaleController::class, 'destroy'])->name('sale.destroy');

  Route::get('/report', [ReportController::class, 'index'])->name('report.index');
  Route::post('/report/export', [ReportController::class, 'getOrder'])->name('report.getOrder');
  Route::delete('/{order}/delete', [ReportController::class, 'destroy'])->name('report.destroy');
});

require __DIR__ . '/auth.php';
