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
    if (!Schema::connection($this->connection)->hasTable('sunday_clinic')) {
      Schema::connection($this->connection)->create('sunday_clinic', function (Blueprint $table) {
        $table->id();
        $table->string('judul')->unique();
        $table->string('slug')->unique();
        $table->string('img_file_name');
        $table->text('deskripsi')->nullable();
        $table->text('ruang_lingkup_layanan')->nullable();
        $table->text('layanan_unggulan')->nullable();
        $table->text('fasilitas_dan_teknologi')->nullable();
        $table->timestamps();
      });
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::connection($this->connection)->dropIfExists('sunday_clinic');
  }
};
