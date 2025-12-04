<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailFilesTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('detail_file')) {
            Schema::connection($this->connection)->create('detail_file', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('identification_no')->unsigned()->nullable();
                $table->string('file_name')->unsigned()->nullable();
                $table->string('extension')->unsigned()->nullable();
                $table->string('size')->unsigned()->nullable();
                $table->string('categories')->unsigned()->nullable();
                $table->bigInteger('id_kategori_file')->unsigned()->nullable();
                $table->string('device')->unsigned()->nullable();
                $table->string('flag')->unsigned()->nullable();
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
        Schema::connection($this->connection)->dropIfExists('detail_file');
    }
}
