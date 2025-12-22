<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('orders', function (Blueprint $table) {
      $table->id();
      $table->date('order_date');
      $table->string('buyer_name');
      $table->enum('buyer_type', ['IT', 'NON-IT']);
      $table->enum('payment_type', ['Cash', 'QRIS', 'Transfer']);
      $table->boolean('is_paid')->default(false);
      $table->boolean('extra_cup')->default(false);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('orders');
  }
};
