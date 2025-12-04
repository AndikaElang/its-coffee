<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistrasiMasalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection('pgsqlpasien')->hasTable('registrasi_masals')) {
            Schema::connection('pgsqlpasien')->create('registrasi_masals', function (Blueprint $table) {
                // $table->id();
                $table->bigIncrements('id');
                $table->string('identification_no')->unsigned()->unique();
                $table->string('name')->unsigned();
                $table->string('gender')->unsigned();
                $table->date('date_of_birth')->unsigned()->nullable();
                $table->string('place_of_birth')->unsigned()->nullable();
                $table->string('mobile_phone')->unsigned()->nullable();
                $table->string('email')->unsigned()->unique();
                $table->string('home_address')->unsigned()->nullable();
                $table->string('sender')->unsigned()->nullable();
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
        Schema::dropIfExists('registrasi_masals');
    }
}
