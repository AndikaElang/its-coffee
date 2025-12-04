<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePengalamanPasiensTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('pengalaman_pasien')) {
            Schema::connection($this->connection)->create('pengalaman_pasien', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('nama')->nullable();
                $table->string('status')->nullable();
                $table->string('file_name')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('pengalaman_pasien');
    }
}
