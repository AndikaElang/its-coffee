<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateValidasiAlkesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection('pgsql')->hasTable('validasi_alkes')) {
            Schema::connection('pgsql')->create('validasi_alkes', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->year('tahun_group');                
                // $table->mediumInteger('total_data');                
                $table->integer('sequence')->unsigned();
                $table->char('kode_alkes', 100)->unique();
                $table->text('jenis_pengujian')->unsigned()->nullable();
                $table->mediumInteger('nilai')->unsigned()->nullable();
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
        Schema::dropIfExists('validasi_alkes');
    }
}
