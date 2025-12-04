<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKegiatansTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::connection($this->connection)->create('kegiatans', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });

        if (!Schema::connection($this->connection)->hasTable('kegiatan')) {
            Schema::connection($this->connection)->create('kegiatan', function (Blueprint $table) {
                // $table->id();
                $table->bigIncrements('id');
                $table->string('judul')->unique();
                $table->string('slug')->unique();
                $table->string('htm')->nullable();
                $table->date('tglAwal')->nullable();
                $table->date('tglAkhir')->nullable();
                $table->time('jamAwal')->nullable();
                $table->time('jamAkhir')->nullable();
                $table->string('file_name')->nullable();
                $table->string('url_whatsapp')->nullable();
                $table->string('url_daftar')->nullable();
                $table->string('status')->nullable();
                $table->text('deskripsi')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('kegiatan');
    }
}
