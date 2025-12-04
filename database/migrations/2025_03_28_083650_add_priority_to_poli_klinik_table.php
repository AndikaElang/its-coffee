<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPriorityToPoliKlinikTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasColumn('poli_klinik', 'prioritas')) {
            Schema::connection($this->connection)->table('poli_klinik', function (Blueprint $table) {
                $table->boolean('prioritas')->nullable()->after('status');
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
        if (Schema::connection($this->connection)->hasColumn('poli_klinik', 'prioritas')) {
            Schema::connection($this->connection)->table('poli_klinik', function (Blueprint $table) {
                $table->dropColumn('prioritas');
            });
        }
    }
}
