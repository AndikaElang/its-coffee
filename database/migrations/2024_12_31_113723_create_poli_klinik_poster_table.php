<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePoliKlinikPosterTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('poli_klinik_poster')) {
            Schema::connection($this->connection)->create('poli_klinik_poster', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('poli_id');
                $table->foreign('poli_id')->references('id')->on('poli_klinik')->onDelete('cascade');
                $table->string('poster_file_name');
                $table->string('poster_extension');
                $table->string('poster_url');
                $table->boolean('poster_aktif');
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
        Schema::connection($this->connection)->dropIfExists('poli_klinik_poster');
    }
}
