<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  protected $connection = 'pgsql_website';

  /**
   * Run the migrations.
   */
  public function up(): void
  {
    if (!Schema::connection($this->connection)->hasColumn('pencapaian', 'status')) {
      Schema::connection($this->connection)->table('pencapaian', function (Blueprint $table) {
        $table->boolean('status')->default(true);
      });
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    if (Schema::connection($this->connection)->hasColumn('pencapaian', 'status')) {
      Schema::connection($this->connection)->table('pencapaian', function (Blueprint $table) {
        $table->dropColumn('status');
      });
    }
  }
};
