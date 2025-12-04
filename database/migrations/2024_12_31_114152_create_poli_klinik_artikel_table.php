<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePoliKlinikArtikelTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('poli_klinik_artikel')) {
            Schema::connection($this->connection)->create('poli_klinik_artikel', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('poli_id');
                $table->foreign('poli_id')->references('id')->on('poli_klinik')->onDelete('cascade');
                $table->string('artikel_judul');
                $table->string('artikel_file_name');
                $table->string('artikel_extension');
                $table->string('artikel_thumbnail_file_name');
                $table->string('artikel_thumbnail_extension');
                $table->boolean('artikel_aktif');
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
        Schema::connection($this->connection)->dropIfExists('poli_klinik_artikel');
    }
}
