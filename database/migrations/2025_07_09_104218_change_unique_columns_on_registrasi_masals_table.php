<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeUniqueColumnsOnRegistrasiMasalsTable extends Migration
{
    protected $connection = 'pgsqlpasien';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection($this->connection)->table('registrasi_masals', function (Blueprint $table) {
            $table->dropUnique(['identification_no']);
            $table->dropUnique(['email']);

            $table->string('identification_no')->unsigned()->change();
            $table->string('email')->unsigned()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection($this->connection)->table('registrasi_masals', function (Blueprint $table) {
            $table->string('identification_no')->unsigned()->unique()->change();
            $table->string('email')->unsigned()->unique()->change();
        });
    }
}
