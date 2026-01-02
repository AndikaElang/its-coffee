<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\Order;
use App\Models\orderItem;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class SaleSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    foreach (range(1, 20) as $i) {

      $buyerType = Arr::random(['IT', 'NON-IT']);
      $extraCup = (bool) rand(0, 1);

      $orderDate = Carbon::create(
        now()->year + 1,
        rand(1, 12),
        rand(1, 28)
      )->format('Y-m-d');

      $order = Order::create([
        'order_date' => $orderDate,
        'buyer_name' => 'Customer ' . $i,
        'buyer_type' => $buyerType,
        'payment_type' => Arr::random(['Cash', 'QRIS', 'Transfer']),
        'is_paid' => rand(0, 1),
        'extra_cup' => $extraCup,
        'created_at' => $orderDate,
        'updated_at' => $orderDate,
      ]);

      // exactly 1 item per order
      $menu = Menu::inRandomOrder()->first();

      $qty = rand(1, 5);

      /** ===============================
       * PRICE LOGIC (same as frontend)
       * =============================== */
      if ($buyerType === 'IT') {
        $price = $menu->it_price;

        if ($extraCup) {
          $price += 1000;
        }
      } else {
        $price = $menu->base_price;
      }

      // optional discount
      $discount = rand(0, 1) ? rand(1000, 5000) : 0;

      $subtotal = ($price * $qty) - $discount;

      OrderItem::create([
        'order_id' => $order->id,
        'menu_id' => $menu->id,
        'qty' => $qty,
        'price' => $price,
        'subtotal' => max($subtotal, 0),
        'created_at' => $orderDate,
        'updated_at' => $orderDate,
      ]);

    }
  }
}
