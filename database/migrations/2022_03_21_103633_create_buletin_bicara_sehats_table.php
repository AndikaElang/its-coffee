<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBuletinBicaraSehatsTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection($this->connection)->hasTable('buletin_bicara_sehat')) {
            Schema::connection($this->connection)->create('buletin_bicara_sehat', function (Blueprint $table) {
                $table->id();
                $table->string('judul')->unique();
                $table->string('slug')->unique();
                $table->string('status')->nullable();
                $table->string('image_name')->nullable();
                $table->string('file_name')->nullable();
                $table->text('deskripsi')->nullable();
                $table->string('sender')->nullable();
                $table->bigInteger('count')->default(0);
                $table->dateTime('increased_at')->nullable();
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
        Schema::connection($this->connection)->dropIfExists('buletin_bicara_sehat');
    }
}
