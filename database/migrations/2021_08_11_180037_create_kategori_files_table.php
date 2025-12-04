<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKategoriFilesTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('kategori_file')) {
            Schema::connection($this->connection)->create('kategori_file', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('kode_kategori')->unsigned()->nullable();
                $table->string('nama_kategori')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('kategori_file');
    }
}
