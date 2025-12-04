<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMmpiJawabansTable extends Migration
{
    // protected $connection = 'pgsqlmmpi';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('mmpi_jawaban')) {
            Schema::connection($this->connection)->create('mmpi_jawaban', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('user_id')->unsigned()->nullable();
                $table->string('nama')->unsigned()->nullable();
                $table->string('email')->unsigned()->nullable();
                $table->text('jawaban')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('mmpi_jawaban');
    }
}
