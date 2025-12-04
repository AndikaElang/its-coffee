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
    if (!Schema::connection($this->connection)->hasTable('sunday_clinic_doctor')) {
      Schema::connection($this->connection)->create('sunday_clinic_doctor', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('sunday_clinic_id');
        $table->foreign('sunday_clinic_id')->references('id')->on('sunday_clinic')->onDelete('cascade');
        $table->string('nama');
        $table->string('link_dokter');
        $table->timestamps();
      });
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::connection($this->connection)->dropIfExists('sunday_clinic_doctor');
  }
};
