<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

  /**
   * Run the migrations.
   */
  public function up(): void
  {
    if (!Schema::connection($this->connection)->hasTable('push_notification_msgs')) {
      Schema::connection($this->connection)->create('push_notification_msgs', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->string('title')->nullable(false);
        $table->string('body')->nullable(false);
        $table->string('url')->nullable(false);
        $table->boolean('is_read')->default(false);
        $table->foreignUuid('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->timestamps();
      });
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::connection($this->connection)->dropIfExists('push_notification_msgs');
  }
};
