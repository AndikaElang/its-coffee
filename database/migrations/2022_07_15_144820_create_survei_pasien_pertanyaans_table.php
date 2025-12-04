<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurveiPasienPertanyaansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection('pgsqlpasien')->hasTable('survei_pasien_pertanyaans')) {
            Schema::connection('pgsqlpasien')->create('survei_pasien_pertanyaans', function (Blueprint $table) {
                $table->id();
                $table->string('category')->unsigned()->nullable();
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
        Schema::dropIfExists('survei_pasien_pertanyaans');
    }
}
