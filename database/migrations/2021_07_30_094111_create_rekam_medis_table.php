<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRekamMedisTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('rekam_medis')) {
            Schema::connection($this->connection)->create('rekam_medis', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('id_pasien')->unsigned()->nullable();
                $table->string('episode_no')->unsigned()->nullable();
                $table->string('episode_date')->unsigned()->nullable();
                $table->string('treatment_type')->unsigned()->nullable();
                $table->string('episode_status')->unsigned()->nullable();
                $table->string('patient_name')->unsigned()->nullable();
                $table->string('medical_record_no')->unsigned()->nullable();
                $table->string('gender')->unsigned()->nullable();
                $table->string('date_of_birth')->unsigned()->nullable();
                // $table->date('date_of_birth')->unsigned()->nullable();
                $table->string('patient_identity_no')->unsigned()->nullable();
                $table->string('passport_no')->unsigned()->nullable();
                $table->string('examiner_name')->unsigned()->nullable();
                $table->string('episode_location')->unsigned()->nullable();
                $table->string('sender')->unsigned()->nullable();
                $table->string('created_afya_by')->unsigned()->nullable();
                $table->string('reference_id')->unsigned()->nullable();
                $table->string('created_by')->unsigned()->nullable();
                $table->string('updated_by')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('rekam_medis');
    }
}
