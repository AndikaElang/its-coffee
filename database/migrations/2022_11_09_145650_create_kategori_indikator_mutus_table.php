<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKategoriIndikatorMutusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection('pgsql')->hasTable('kategori_indikator_mutus')) {
            Schema::connection('pgsql')->create('kategori_indikator_mutus', function (Blueprint $table) {
                // $table->id();
                $table->bigIncrements('id');
                $table->string('kategori_nama')->unique();
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
        Schema::dropIfExists('kategori_indikator_mutus');
    }
}
