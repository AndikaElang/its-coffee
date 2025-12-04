<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInformasiVaksinsTable extends Migration
{
    protected $connection = 'pgsqlpasien';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('informasi_vaksin')) {
            Schema::connection($this->connection)->create('informasi_vaksin', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('judul')->unique();
                $table->text('deskripsi')->nullable();
                $table->string('status')->nullable();
                $table->string('sender')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('informasi_vaksin');
    }
}
