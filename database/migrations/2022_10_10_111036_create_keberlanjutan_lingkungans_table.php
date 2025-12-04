<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKeberlanjutanLingkungansTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('keberlanjutan_lingkungan')) {
            Schema::connection($this->connection)->create('keberlanjutan_lingkungan', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('judul')->nullable();
                $table->string('slug')->nullable();
                $table->string('status')->nullable();
                $table->string('image_name')->nullable();
                $table->string('file_name')->nullable();
                $table->timestamp('tanggal')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('keberlanjutan_lingkungan');
    }
}
