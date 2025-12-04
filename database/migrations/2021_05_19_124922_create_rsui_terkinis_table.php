<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRsuiTerkinisTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('rsui_terkini')) {
            Schema::connection($this->connection)->create('rsui_terkini', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('judul')->nullable();
                $table->string('status')->nullable();
                $table->string('link')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('rsui_terkini');
    }
}
