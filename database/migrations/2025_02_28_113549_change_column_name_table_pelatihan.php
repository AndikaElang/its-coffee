<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeColumnNameTablePelatihan extends Migration
{
    protected $connection = 'pgsql';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection($this->connection)->table('pelatihan', function (Blueprint $table) {
            if (Schema::connection($this->connection)->hasColumn('pelatihan', 'kontak_penyelenggara_pelatihan')) {
                $table->renameColumn('kontak_penyelenggara_pelatihan', 'link_gform_pelatihan');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection($this->connection)->table('pelatihan', function (Blueprint $table) {
            if (Schema::connection($this->connection)->hasColumn('pelatihan', 'link_gform_pelatihan')) {
                $table->renameColumn('link_gform_pelatihan', 'kontak_penyelenggara_pelatihan');
            }
        });
    }
}
