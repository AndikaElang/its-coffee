<?php

namespace Database\Seeders;

use App\Models\JobsVacancies;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobVacancySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $user = JobsVacancies::create([
      'title' => 'Totally Not IT',
      'level' => 'Staff',
      'unit' => 'Marketing',
      'position' => 'Ya Marketing',
      'location' => 'RSUI Depok',
      'location_type' => 'on-site',
      'content' => json_encode([
        'description' => 'Ini deskripsi kerja'
      ]),
    ]);
  }
}
