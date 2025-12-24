<?php

namespace Database\Seeders;

use App\Models\Expense;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $expense = Expense::updateOrCreate([
      'type' => "belanja",
      'description' => 'Beli beans kopi 1kg',
      'amount' => 35000
    ]);

    $expense = Expense::updateOrCreate([
      'type' => "bayar it",
      'description' => 'Setoran NON-IT',
      'amount' => 5000
    ]);
  }
}
