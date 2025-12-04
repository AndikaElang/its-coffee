<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePublikasisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection('pgsql')->hasTable('publikasis')) {
            Schema::connection('pgsql')->create('publikasis', function (Blueprint $table) {
                // $table->id();
                $table->bigIncrements('id');
                $table->string('title')->unsigned()->unique();;
                $table->year('year')->unsigned()->nullable();
                $table->string('writer')->unsigned()->nullable();
                $table->string('journal')->unsigned()->nullable();
                $table->string('doi')->unsigned()->nullable();
                $table->integer('flag_active_disable')->unsigned();
                $table->string('sender')->unsigned()->nullable();
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
        Schema::dropIfExists('publikasis');
    }
}
