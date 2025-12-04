<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePoliKlinikVideoTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('poli_klinik_video')) {
                Schema::connection($this->connection)->create('poli_klinik_video', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('poli_id');
                $table->foreign('poli_id')->references('id')->on('poli_klinik')->onDelete('cascade');
                $table->string('video_url');
                $table->string('video_judul');
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
        Schema::connection($this->connection)->dropIfExists('poli_klinik_video');
    }
}
