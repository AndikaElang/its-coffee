<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCacheTable extends Migration
{
    protected $connections = ['pgsql', 'pgsqlpasien'];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach ($this->connections as $connection) {
            if (!Schema::connection($connection)->hasTable('cache')) {
                Schema::connection($connection)->create('cache', function (Blueprint $table) {
                    $table->string('key')->primary();
                    $table->mediumText('value');
                    $table->integer('expiration');
                });
            }

            if (!Schema::connection($connection)->hasTable('cache_locks')) {
                Schema::connection($connection)->create('cache_locks', function (Blueprint $table) {
                    $table->string('key')->primary();
                    $table->string('owner');
                    $table->integer('expiration');
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach ($this->connections as $connection) {
            Schema::connection($connection)->dropIfExists('cache');
            Schema::connection($connection)->dropIfExists('cache_locks');
        }
    }
};
