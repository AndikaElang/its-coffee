<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    $user = User::updateOrCreate(['email' => 'admin@example.local'], [
      'name' => 'Admin RSUI',
      'email' => 'admin@example.local',
      'email_verified_at' => now(),
      'password' => Hash::make('password'),
      'remember_token' => Str::random(10),
    ]);

    $user->assignRole('Administrator');


    $user = User::updateOrCreate(['email' => 'superadmin@example.local'], [
      'name' => 'Super Admin RSUI',
      'email' => 'superadmin@example.local',
      'email_verified_at' => now(),
      'password' => Hash::make('password'),
      'remember_token' => Str::random(10),
    ]);

    $user->assignRole('Administrator');
    $user->assignRole('Super Administrator');
  }
}
