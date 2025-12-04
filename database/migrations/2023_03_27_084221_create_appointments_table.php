<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('appointment')) {
            Schema::connection($this->connection)->create('appointment', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('identification_no')->unsigned()->nullable();
                $table->bigInteger('id_layanan')->unsigned()->nullable();
                $table->bigInteger('kategori_appointment')->unsigned()->nullable();
                $table->bigInteger('kategori_penjamin')->unsigned()->nullable();
                $table->string('guarantor_id')->unsigned()->nullable();
                $table->string('guarantor_name')->unsigned()->nullable();
                $table->string('clinic_id')->unsigned()->nullable();
                $table->string('clinic_name')->unsigned()->nullable();
                $table->string('clinic_schedule')->unsigned()->nullable();
                $table->string('doctor_id')->unsigned()->nullable();
                $table->string('doctor_name')->unsigned()->nullable();
                $table->string('doctor_schedule')->unsigned()->nullable();
                $table->string('package_id')->unsigned()->nullable();
                $table->string('sender')->unsigned()->nullable();
                $table->string('reference_id')->unique();
                $table->date('tgl_registrasi')->unsigned()->nullable();
                $table->bigInteger('nik_master')->unsigned()->nullable(); // NIK pasien utama
                $table->string('appointment_key')->unsigned()->nullable();
                $table->string('appointment_type')->unsigned()->nullable();
                $table->timestamp('start_time')->nullable();
                $table->timestamp('end_time')->nullable();
                $table->time('duration')->nullable();
                $table->string('queue_no')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('appointment');
    }
}
