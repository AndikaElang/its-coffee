<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePushNotificationsTable extends Migration
{
  protected $connection = 'pgsqlpasien';
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    if (!Schema::connection($this->connection)->hasTable('push_notifications')) {
      Schema::connection($this->connection)->create('push_notifications', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->json('subscriptions')->nullable(false);
        $table->string('endpoint')->nullable(false);
        $table->string('key_auth')->nullable(false);
        $table->string('key_p256dh')->nullable(false);
        $table->bigInteger('user_id');
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->string('session_id')->nullable(false);
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
    Schema::connection($this->connection)->dropIfExists('push_notifications');
  }
}
