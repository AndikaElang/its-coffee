<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoktersTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('dokter')) {
            Schema::connection($this->connection)->create('dokter', function (Blueprint $table) {
                $table->id();
                $table->boolean('status_dokter');
                $table->string('nip')->unique();
                // $table->string('email_dokter')->unique();
                $table->string('nama_dokter');
                $table->string('path_foto_dokter');
                $table->unsignedBigInteger('spesialis_id');
                $table->foreign('spesialis_id')->references('id')->on('spesialis')->onDelete('cascade');
                $table->text('pendidikan_dokter')->nullable();
                $table->text('penghargaan_dokter')->nullable();
                $table->text('keanggotaan_dokter')->nullable();
                $table->text('penelitian_dokter')->nullable();
                $table->text('kompetensi_dokter')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('dokters');
    }
}
