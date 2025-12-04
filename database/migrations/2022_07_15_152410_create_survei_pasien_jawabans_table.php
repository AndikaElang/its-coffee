<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurveiPasienJawabansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection('pgsqlpasien')->hasTable('survei_pasien_jawabans')) {
            Schema::connection('pgsqlpasien')->create('survei_pasien_jawabans', function (Blueprint $table) {
                $table->id();
                $table->string('email')->unsigned()->nullable();
                $table->string('nama')->unsigned()->nullable();
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
        Schema::dropIfExists('survei_pasien_jawabans');
    }
}
