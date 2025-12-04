<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLayanansTable extends Migration
{
    /**
     * Gatau masih kepake atau enggak
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('layanan')) {
            Schema::connection($this->connection)->create('layanan', function (Blueprint $table) {
                $table->id();
                $table->string('nama_layanan')->unsigned()->nullable();
                $table->string('status_layanan')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('layanan');
    }
}
