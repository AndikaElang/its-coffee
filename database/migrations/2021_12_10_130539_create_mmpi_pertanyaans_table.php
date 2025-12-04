<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMmpiPertanyaansTable extends Migration
{
    // protected $connection = 'pgsqlmmpi';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('mmpi_pertanyaan')) {
            Schema::connection($this->connection)->create('mmpi_pertanyaan', function (Blueprint $table) {
                $table->id();
                $table->string('pertanyaan')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('mmpi_pertanyaan');
    }
}
