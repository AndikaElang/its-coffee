<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentLogsTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('appointment_logs')) {
            Schema::connection($this->connection)->create('appointment_logs', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('identification_no')->unsigned()->nullable();
                $table->string('mobile_phone')->unsigned()->nullable();
                $table->date('date_appointment')->unsigned()->nullable();
                $table->string('clinic_id')->unsigned()->nullable();
                $table->string('doctor_id')->unsigned()->nullable();
                $table->string('appointment_type_key')->unsigned()->nullable();
                $table->string('doctor_schedule_det_key')->unsigned()->nullable();
                $table->string('slot_no')->unsigned()->nullable();
                $table->timestamp('from_time')->nullable();
                $table->timestamp('to_time')->nullable();
                $table->string('type')->unsigned()->nullable();
                $table->string('error_code')->unsigned()->nullable();
                $table->text('error_message')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('appointment_logs');
    }
}
