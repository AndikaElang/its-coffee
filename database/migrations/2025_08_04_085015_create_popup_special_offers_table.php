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
    if (!Schema::connection($this->connection)->hasTable('popup_penawaran_spesial')) {
      Schema::connection($this->connection)->create('popup_penawaran_spesial', function (Blueprint $table) {
        $table->id();
        $table->foreignId('penawaran_spesial_id')->constrained('penawaran_spesial')->onDelete('cascade');
        $table->boolean('status')->default(false);
        $table->timestamps();
      });
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::connection($this->connection)->dropIfExists('popup_penawaran_spesial');
  }
};
