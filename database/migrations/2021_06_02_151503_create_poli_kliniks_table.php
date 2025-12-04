<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePoliKliniksTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('poli_klinik')) {
            Schema::connection($this->connection)->create('poli_klinik', function (Blueprint $table) {
                $table->id();
                $table->string('judul')->unique();
                $table->string('slug')->unique();
                $table->string('status');
                $table->boolean('prioritas');
                $table->string('img_file_name');
                $table->text('deskripsi')->nullable();
                $table->text('ruang_lingkup_layanan')->nullable();
                $table->text('layanan_unggulan')->nullable();
                $table->text('fasilitas_dan_teknologi')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('poli_klinik');
    }
}
