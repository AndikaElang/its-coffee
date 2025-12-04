<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideosTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('video')) {
            Schema::connection($this->connection)->create('video', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('judul')->nullable()->unique();
                $table->string('slug')->nullable()->unique();
                $table->string('link')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('video');
    }
}
