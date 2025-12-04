<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistrasisTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('registrasi')) {
            Schema::connection($this->connection)->create('registrasi', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('identification_no')->unsigned()->nullable();
                $table->bigInteger('id_layanan')->unsigned()->nullable();
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
                $table->string('reference_id')->unsigned()->nullable();
                $table->date('tgl_registrasi')->unsigned()->nullable();
                $table->bigInteger('nik_master')->unsigned()->nullable(); // NIK pasien utama
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
        Schema::connection($this->connection)->dropIfExists('registrasi');
    }
}
