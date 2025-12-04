<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePoliKlinikDokterTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('poli_klinik_dokter')) {
            Schema::connection($this->connection)->create('poli_klinik_dokter', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('poli_id');
                $table->foreign('poli_id')->references('id')->on('poli_klinik')->onDelete('cascade');
                $table->string('nama');
                $table->string('link_dokter');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection($this->connection)->dropIfExists('poli_klinik_dokter');
    }
}
