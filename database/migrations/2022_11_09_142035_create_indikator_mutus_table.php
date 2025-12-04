<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIndikatorMutusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection('pgsql')->hasTable('indikator_mutus')) {
            Schema::connection('pgsql')->create('indikator_mutus', function (Blueprint $table) {
                // $table->id();
                $table->bigIncrements('id');
                $table->year('tahun');
                // $table->foreign('kategori_id')->references('id')->on('kategori_indikator_mutus')->onDelete('cascade');
                $table->integer('kategori_id')->unsigned();
                $table->char('kode_imut', 100)->unique();
                $table->text('target')->unsigned()->nullable();
                $table->text('capaian')->unsigned()->nullable();
                $table->string('sender')->unsigned()->nullable();
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
        Schema::dropIfExists('indikator_mutus');
    }
}
