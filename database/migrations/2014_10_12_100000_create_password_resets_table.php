<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasswordResetsTable extends Migration
{
    protected $connections = ['pgsql', 'pgsqlpasien'];

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach ($this->connections as $connection) {
            if (!Schema::connection($connection)->hasTable('password_resets')) {
                Schema::connection($connection)->create('password_resets', function (Blueprint $table) {
                    $table->string('email')->index();
                    $table->string('token');
                    $table->timestamp('created_at')->nullable();
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach ($this->connections as $connection) {
            Schema::connection($connection)->dropIfExists('password_resets');
        };
    }
}
