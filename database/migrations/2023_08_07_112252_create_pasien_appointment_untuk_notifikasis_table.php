<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasienAppointmentUntukNotifikasisTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('pasien_appointment_untuk_notifikasi')) {
            Schema::connection($this->connection)->create('pasien_appointment_untuk_notifikasi', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('appointment_key')->unsigned()->nullable();
                $table->bigInteger('code_booking')->unsigned()->nullable();
                $table->bigInteger('medical_record_number')->unsigned()->nullable();
                $table->string('name')->unsigned()->nullable();
                $table->string('mobile_phone')->unsigned()->nullable();
                $table->string('guarantor_id')->unsigned()->nullable();
                $table->string('guarantor_name')->unsigned()->nullable();
                $table->string('clinic_id')->unsigned()->nullable();
                $table->string('clinic_name')->unsigned()->nullable();
                $table->string('doctor_id')->unsigned()->nullable();
                $table->string('doctor_name')->unsigned()->nullable();
                $table->string('reference_id')->unsigned()->nullable();
                $table->date('appointment_date')->unsigned()->nullable();
                $table->string('appointment_type_key')->unsigned()->nullable();
                $table->string('appointment_type')->unsigned()->nullable();
                $table->time('start_time')->nullable();
                $table->time('end_time')->nullable();
                $table->string('queue_no')->unsigned()->nullable();
                $table->string('status')->unsigned()->nullable();
                $table->string('notification_status')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('pasien_appointment_untuk_notifikasi');
    }
}
