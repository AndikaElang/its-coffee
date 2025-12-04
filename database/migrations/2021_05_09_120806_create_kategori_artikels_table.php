<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKategoriArtikelsTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('kategori_artikels')) {
            Schema::connection($this->connection)->create('kategori_artikels', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('artikel_id');
                $table->foreign('artikel_id')->references('id')->on('artikel_populers')->onDelete('cascade');
                $table->bigInteger('kategori_id');
                $table->string('kategori_name');
                $table->string('slug');
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
        Schema::connection($this->connection)->dropIfExists('kategori_artikels');
    }
}
