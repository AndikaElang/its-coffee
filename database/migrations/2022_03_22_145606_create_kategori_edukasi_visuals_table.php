<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKategoriEdukasiVisualsTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('kategori_edukasi_visual')) {
            Schema::connection($this->connection)->create('kategori_edukasi_visual', function (Blueprint $table) {
                $table->id();
                $table->string('nama_kategori');
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
        Schema::connection($this->connection)->dropIfExists('kategori_edukasi_visual');
    }
}
