<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForgotPasswordVerificationCodeToUsersTable extends Migration
{
    protected $connection = 'pgsqlpasien';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection($this->connection)->table('users', function (Blueprint $table) {
            $table->string('forgot_password_verification_code', 6)->nullable();
            $table->timestamp('forgot_password_verification_code_expires_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection($this->connection)->table('users', function (Blueprint $table) {
            $table->dropColumn(['forgot_password_verification_code', 'forgot_password_verification_code_expires_at']);
        });

    }
}
