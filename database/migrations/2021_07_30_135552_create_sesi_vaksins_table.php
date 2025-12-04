<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSesiVaksinsTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('sesi_vaksin')) {
            Schema::connection($this->connection)->create('sesi_vaksin', function (Blueprint $table) {
                $table->id();
                $table->date('tgl_vaksin')->unsigned()->nullable();
                $table->string('sesi')->unsigned()->nullable();
                $table->bigInteger('id_jenis_vaksin')->unsigned()->nullable();
                $table->bigInteger('total')->unsigned()->nullable();
                $table->string('status')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('sesi_vaksin');
    }
}
