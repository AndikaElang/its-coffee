<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHeadlineDokterToDokterTable extends Migration
{
    protected $connection = 'pgsql';

  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    if (!Schema::connection($this->connection)->hasColumn('dokter', 'headline_dokter')) {
      Schema::connection($this->connection)->table('dokter', function (Blueprint $table) {
        $table->string('headline_dokter')->nullable()->after('nip');
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
    if (Schema::connection($this->connection)->hasColumn('dokter', 'headline_dokter')) {
      Schema::connection($this->connection)->table('dokter', function (Blueprint $table) {
        $table->dropColumn('headline_dokter');
      });
    }
  }
}
