<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  protected $connection = 'pgsql';

  /**
   * Run the migrations.
   */
  public function up(): void
  {
    if (!Schema::connection($this->connection)->hasTable('asuransi')) {
      Schema::connection($this->connection)->create('asuransi', function (Blueprint $table) {
        $table->id();
        $table->string('nama');
        $table->boolean('status')->default(true);
        $table->string('logo');
        $table->string('link')->nullable();
        $table->timestamps();
      });
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::connection($this->connection)->dropIfExists('asuransi');
  }
};
