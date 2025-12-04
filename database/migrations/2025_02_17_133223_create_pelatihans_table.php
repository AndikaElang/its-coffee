<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePelatihansTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('pelatihan')) {
            Schema::connection($this->connection)->create('pelatihan', function (Blueprint $table) {
                $table->id();
                $table->string('nama_pelatihan');
                $table->string('penyelenggara_pelatihan');
                $table->string('kontak_penyelenggara_pelatihan');
                $table->date('tanggal_mulai_pelatihan');
                $table->date('tanggal_selesai_pelatihan');
                $table->bigInteger('biaya_pelatihan');
                $table->string('status_pelatihan');
                $table->string('tipe_pelatihan');
                $table->integer('total_skp_pelatihan');
                $table->integer('kuota_peserta_pelatihan');
                $table->text('deskripsi_pelatihan');
                $table->string('thumbnail_pelatihan');
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
        Schema::connection($this->connection)->dropIfExists('pelatihan');
    }
}
