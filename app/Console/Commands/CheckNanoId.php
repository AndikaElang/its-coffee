<?php

namespace App\Console\Commands;

use Hidehalo\Nanoid\Client;
use Hidehalo\Nanoid\GeneratorInterface;
use Illuminate\Console\Command;

class CheckNanoId extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'app:check-nanoid';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Test nanoid stuff';

  /**
   * Execute the console command.
   */
  public function handle()
  {
    $client = new Client();
    echo "Formatted Nano ID: " . $client->formattedId('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 16) . PHP_EOL;
  }
}
