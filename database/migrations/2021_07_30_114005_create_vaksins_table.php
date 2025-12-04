<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVaksinsTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('vaksin')) {
            Schema::connection($this->connection)->create('vaksin', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('id_registrasi')->unsigned()->nullable();
                $table->bigInteger('identification_no')->unsigned()->nullable();
                $table->string('lokasi_vaksin')->unsigned()->nullable();
                $table->date('tgl_vaksin')->unsigned()->nullable();
                $table->string('sesi_vaksin')->unsigned()->nullable();
                $table->bigInteger('id_jenis_vaksin')->unsigned()->nullable();
                $table->string('vaksin_ke')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('vaksin');
    }
}
