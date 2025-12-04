<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEdukasiVisualsTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // if (!Schema::connection($this->connection)->hasTable('edukasi_visual')) {
        //     Schema::connection($this->connection)->create('edukasi_visual', function (Blueprint $table) {
        //         $table->bigIncrements('id');
        //         $table->string('judul')->nullable();
        //         $table->string('status')->nullable();
        //         $table->string('file_name')->nullable();
        //         $table->text('deskripsi')->nullable();
        //         $table->string('sender')->nullable();
        //         $table->timestamps();
        //     });
        // }

        if (!Schema::connection($this->connection)->hasTable('edukasi_visual')) {
            Schema::connection($this->connection)->create('edukasi_visual', function (Blueprint $table) {
                $table->id();
                $table->string('judul')->unique();
                $table->string('slug')->unique();
                $table->bigInteger('kategori_id');
                $table->string('file_name')->nullable();
                $table->timestamp('tanggal')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('edukasi_visual');
    }
}
