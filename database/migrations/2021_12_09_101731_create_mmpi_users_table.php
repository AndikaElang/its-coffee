<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMmpiUsersTable extends Migration
{
    // protected $connection = 'pgsqlmmpi';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('mmpi_users')) {
            Schema::connection($this->connection)->create('mmpi_users', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('identification_no')->unsigned()->nullable();
                $table->string('name');
                $table->string('email')->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->string('role')->default('Pasien');
                $table->string('password')->nullable();
                $table->string('api_token')->unsigned()->nullable();
                $table->rememberToken();
                $table->string('device')->unsigned()->nullable();
                $table->bigInteger('login_counter')->default(0);
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
        Schema::connection($this->connection)->dropIfExists('mmpi_users');
    }
}
