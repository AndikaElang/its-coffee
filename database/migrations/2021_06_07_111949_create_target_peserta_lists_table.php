<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTargetPesertaListsTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::connection($this->connection)->create('target_peserta_lists', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });

        if (!Schema::connection($this->connection)->hasTable('target_peserta_list')) {
            Schema::connection($this->connection)->create('target_peserta_list', function (Blueprint $table) {
                $table->id();
                $table->string('target_peserta');
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
        Schema::connection($this->connection)->dropIfExists('target_peserta_list');
    }
}
