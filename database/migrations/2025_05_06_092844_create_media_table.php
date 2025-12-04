<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMediaTable extends Migration
{
    protected $connections = ['pgsql'];
    public function up()
    {
        foreach ($this->connections as $connection) {
            if (!Schema::connection($connection)->hasTable('media')) {
                Schema::connection($connection)->create('media', function (Blueprint $table) {
                    $table->id();

                    $table->morphs('model');
                    $table->uuid('uuid')->nullable()->unique();
                    $table->string('collection_name');
                    $table->string('name');
                    $table->string('file_name');
                    $table->string('mime_type')->nullable();
                    $table->string('disk');
                    $table->string('conversions_disk')->nullable();
                    $table->unsignedBigInteger('size');
                    $table->json('manipulations');
                    $table->json('custom_properties');
                    $table->json('generated_conversions');
                    $table->json('responsive_images');
                    $table->unsignedInteger('order_column')->nullable();

                    $table->nullableTimestamps();
                });
            }
        }
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach ($this->connections as $connection) {
            Schema::connection($connection)->dropIfExists('media');
        };
    }
}
