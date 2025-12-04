<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasiensTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('pasien')) {
            Schema::connection($this->connection)->create('pasien', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('id_user')->unsigned()->nullable();
                $table->bigInteger('identification_no')->unsigned()->nullable();
                $table->string('name')->unsigned()->nullable();
                $table->string('gender')->unsigned()->nullable();
                $table->string('place_of_birth')->unsigned()->nullable();
                $table->date('date_of_birth')->unsigned()->nullable();
                $table->string('mobile_phone')->unsigned()->nullable();
                $table->string('email')->unsigned()->nullable();
                $table->text('home_address')->unsigned()->nullable();
                $table->string('rt')->unsigned()->nullable();
                $table->string('rw')->unsigned()->nullable();
                $table->string('country_id')->unsigned()->nullable();
                $table->string('country_name')->unsigned()->nullable();
                $table->string('provinces_id')->unsigned()->nullable();
                $table->string('provinces_name')->unsigned()->nullable();
                $table->string('regencies_cities_id')->unsigned()->nullable();
                $table->string('regencies_cities_name')->unsigned()->nullable();
                $table->string('districts_id')->unsigned()->nullable();
                $table->string('districts_name')->unsigned()->nullable();
                $table->string('villages_id')->unsigned()->nullable();
                $table->string('villages_name')->unsigned()->nullable();
                $table->string('postal_code')->unsigned()->nullable();
                $table->string('same_as_home_address')->unsigned()->nullable();
                $table->text('current_address')->unsigned()->nullable();
                $table->string('current_rt')->unsigned()->nullable();
                $table->string('current_rw')->unsigned()->nullable();
                $table->string('current_country_id')->unsigned()->nullable();
                $table->string('current_country_name')->unsigned()->nullable();
                $table->string('current_provinces_id')->unsigned()->nullable();
                $table->string('current_provinces_name')->unsigned()->nullable();
                $table->string('current_regencies_cities_id')->unsigned()->nullable();
                $table->string('current_regencies_cities_name')->unsigned()->nullable();
                $table->string('current_districts_id')->unsigned()->nullable();
                $table->string('current_districts_name')->unsigned()->nullable();
                $table->string('current_villages_id')->unsigned()->nullable();
                $table->string('current_villages_name')->unsigned()->nullable();
                $table->string('current_postal_code')->unsigned()->nullable();
                $table->string('status')->unsigned()->nullable();
                // $table->string('guarantorId')->unsigned()->nullable();
                // $table->string('clinicId')->unsigned()->nullable();
                // $table->string('clinicSchedule')->unsigned()->nullable();
                // $table->string('doctorId')->unsigned()->nullable();
                // $table->string('doctorSchedule')->unsigned()->nullable();
                // $table->string('packageId')->unsigned()->nullable();
                // $table->string('sender')->unsigned()->nullable();
                // $table->string('referenceId')->unsigned()->nullable();
                // $table->string('referenceId')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('pasien');
    }
}
