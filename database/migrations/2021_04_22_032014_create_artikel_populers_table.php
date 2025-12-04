<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtikelPopulersTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('artikel_populers')) {
            Schema::connection($this->connection)->create('artikel_populers', function (Blueprint $table) {
                // $table->id();
                $table->bigIncrements('id');
                $table->string('judul')->unique();
                $table->string('slug')->unique();
                $table->string('penulis')->nullable();
                $table->timestamp('tanggal')->nullable();
                $table->text('deskripsi')->nullable();
                $table->string('status')->nullable();
                $table->string('sender')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('artikel_populers');
    }
}
