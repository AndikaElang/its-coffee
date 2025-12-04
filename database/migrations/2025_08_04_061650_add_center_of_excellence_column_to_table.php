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
    if (!Schema::connection($this->connection)->hasColumn('poli_klinik', 'center_of_excellence')) {
      Schema::connection($this->connection)->table('poli_klinik', function (Blueprint $table) {
        $table->boolean('center_of_excellence')->default(false)->after('prioritas');
      });
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    if (Schema::connection($this->connection)->hasColumn('poli_klinik', 'center_of_excellence')) {
      Schema::connection($this->connection)->table('poli_klinik', function (Blueprint $table) {
        $table->dropColumn('center_of_excellence');
      });
    }
  }
};
