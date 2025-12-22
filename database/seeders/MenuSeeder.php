<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $menu = Menu::updateOrCreate([
      'name' => "AMERICANO",
      'base_price' => 7000,
      'it_price' => 3000,
      'deposit' => 4000,
      'is_available' => true,
    ]);

    $menu = Menu::updateOrCreate([
      'name' => "SPANISH LATTE",
      'base_price' => 13000,
      'it_price' => 6000,
      'deposit' => 4000,
      'is_available' => true,
    ]);

    $menu = Menu::updateOrCreate([
      'name' => "HOT LATTE",
      'base_price' => 11000,
      'it_price' => 5000,
      'deposit' => 4000,
      'is_available' => true,
    ]);

    $menu = Menu::updateOrCreate([
      'name' => "VIETNAM DRIP",
      'base_price' => 9000,
      'it_price' => 5000,
      'deposit' => 4000,
      'is_available' => true,
    ]);

    $menu = Menu::updateOrCreate([
      'name' => "V60",
      'base_price' => 7000,
      'it_price' => 3000,
      'deposit' => 4000,
      'is_available' => true,
    ]);

    $menu = Menu::updateOrCreate([
      'name' => "ES KOPI SUSU",
      'base_price' => 11000,
      'it_price' => 5000,
      'deposit' => 4000,
      'is_available' => true,
    ]);

    $menu = Menu::updateOrCreate([
      'name' => "IT'S COFFEE",
      'base_price' => 13000,
      'it_price' => 6000,
      'deposit' => 5000,
      'is_available' => true,
    ]);
  }
}
