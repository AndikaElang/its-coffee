<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFileArtikelsTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('file_artikels')) {
            Schema::connection($this->connection)->create('file_artikels', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('artikel_id');
                $table->foreign('artikel_id')->references('id')->on('artikel_populers')->onDelete('cascade');
                $table->string('file_name');
                $table->string('extension');
                $table->string('size');
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
        Schema::table('file_artikels', function (Blueprint $table) {
            $table->dropForeign('file_artikels_artikel_id_foreign');
            $table->dropColumn('artikel_id');
        });
        Schema::connection($this->connection)->dropIfExists('file_artikels');
    }
}
