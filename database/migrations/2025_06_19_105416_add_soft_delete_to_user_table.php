<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSoftDeleteToUserTable extends Migration
{
    protected $connection = 'pgsqlpasien';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasColumn('users', 'deleted_at')) {
            Schema::connection($this->connection)->table('users', function (Blueprint $table) {
                $table->softDeletes();
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
        if (Schema::connection($this->connection)->hasColumn('users', 'deleted_at')) {
            Schema::connection($this->connection)->table('users', function (Blueprint $table) {
                $table->dropSoftDeletes();
            });
        }
    }
}
