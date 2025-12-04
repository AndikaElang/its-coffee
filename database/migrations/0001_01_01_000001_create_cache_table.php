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
    if (!Schema::connection($this->connection)->hasTable('cache')) {
      Schema::connection($this->connection)->create('cache', function (Blueprint $table) {
        $table->string('key')->primary();
        $table->mediumText('value');
        $table->integer('expiration');
      });
    }

    if (!Schema::connection($this->connection)->hasTable('cache_locks')) {
      Schema::connection($this->connection)->create('cache_locks', function (Blueprint $table) {
        $table->string('key')->primary();
        $table->string('owner');
        $table->integer('expiration');
      });
    }
  }


  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::connection($this->connection)->dropIfExists('cache');
    Schema::connection($this->connection)->dropIfExists('cache_locks');
  }

};
