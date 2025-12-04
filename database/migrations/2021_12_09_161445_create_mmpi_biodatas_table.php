<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMmpiBiodatasTable extends Migration
{
    // protected $connection = 'pgsqlmmpi';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('mmpi_biodata')) {
            Schema::connection($this->connection)->create('mmpi_biodata', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('user_id')->unsigned()->nullable();
                $table->string('nama')->unsigned()->nullable();
                $table->string('jenis_kelamin')->unsigned()->nullable();
                $table->string('umur')->unsigned()->nullable();
                $table->string('pendidikan')->unsigned()->nullable();
                $table->string('pekerjaan')->unsigned()->nullable();
                $table->string('status_perkawinan')->unsigned()->nullable();
                $table->string('mobile_phone')->unsigned()->nullable();
                $table->string('keperluan')->unsigned()->nullable();
                $table->text('alamat')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('mmpi_biodata');
    }
}
