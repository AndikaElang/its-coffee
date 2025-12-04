<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilePolikliniksTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('file_poliklinik')) {
            Schema::connection($this->connection)->create('file_poliklinik', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('poliklinik_id');
                $table->foreign('poliklinik_id')->references('id')->on('poli_klinik')->onDelete('cascade');
                $table->string('file_name');
                $table->string('extension');
                $table->string('size');
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
        Schema::connection($this->connection)->dropIfExists('file_poliklinik');
    }
}
