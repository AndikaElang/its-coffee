<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccordionPolikliniksTable extends Migration
{
    // Specify the connection
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (!Schema::connection($this->connection)->hasTable('accordion_polikliniks')) {
            Schema::connection($this->connection)->create('accordion_polikliniks', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('id_poli_klinik');
                $table->foreign('id_poli_klinik')->references('id')->on('poli_klinik')->onDelete('cascade');
                $table->string('kategori_accordion');
                $table->text('header_accordion');
                $table->text('content_accordion');
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
        Schema::connection($this->connection)->dropIfExists('accordion_polikliniks');
    }
}
