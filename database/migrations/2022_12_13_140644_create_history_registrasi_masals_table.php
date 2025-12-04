<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoryRegistrasiMasalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection('pgsqlpasien')->hasTable('history_registrasi_masals')) {
            Schema::connection('pgsqlpasien')->create('history_registrasi_masals', function (Blueprint $table) {
                $table->bigIncrements('id');
                // $table->bigInteger('id_pasien')->unsigned()->nullable();
                $table->string('episode_no')->unsigned()->nullable();
                $table->string('name')->unsigned()->nullable();
                $table->string('email')->unsigned()->nullable();
                $table->string('mobile_phone')->unsigned()->nullable();
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
        Schema::dropIfExists('history_registrasi_masals');
    }
}
