<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTargetPesertasTable extends Migration
{
    protected $connection = 'pgsql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::connection($this->connection)->create('target_pesertas', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });

        if (!Schema::connection($this->connection)->hasTable('target_peserta')) {
            Schema::connection($this->connection)->create('target_peserta', function (Blueprint $table) {
                // $table->id();
                // $table->unsignedBigInteger('kegiatan_id');
                // $table->foreign('kegiatan_id')->references('id')->on('kegiatan')->onDelete('cascade');
                // $table->string('id_sekolah')->nullable();
                // $table->string('id_kelas')->nullable();
                // $table->timestamps();
                $table->bigIncrements('id');
                $table->unsignedBigInteger('kegiatan_id');
                $table->foreign('kegiatan_id')->references('id')->on('kegiatan')->onDelete('cascade');
                $table->bigInteger('target_peserta_id');
                $table->string('target_peserta_name');
                $table->string('slug');
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
        Schema::table('target_peserta', function (Blueprint $table) {
            $table->dropForeign('target_peserta_kegiatan_id_foreign');
            $table->dropColumn('kegiatan_id');
        });
        Schema::connection($this->connection)->dropIfExists('target_peserta');
    }
}
