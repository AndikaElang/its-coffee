<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
  protected $routePrefix = [
    'user',
    'rolePermission',
    'vacanciesAvailable',
    'vacanciesApplied',
    'profile',
    'profile.personalData',
    'profile.trainingData',
    'profile.educationHistory',
    'profile.employmentHistory',
    'profile.starCompetency',
    'profile.language',
    'profile.supportingData',
    'profile.document',
    'homePage',
    'page.schedule',
    'page.requirement',
    'announcement',
    'jobs',
    'applicants',
  ];

  protected $permissionTypes = [
    'view',
    'create',
    'update',
    'delete',
  ];

  protected $additionalPermissionTypes = [
    'apply',
    'cancel',
  ];

  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

    $superAdmin = Role::firstOrCreate(['name' => 'Super Administrator']);
    $admin = Role::firstOrCreate(['name' => 'Administrator']);
    $user = Role::firstOrCreate(['name' => 'User']);

    // $roleAdmin->givePermissionTo([
    //   'user.view',
    //   'user.create',
    //   'user.update',
    //   'user.delete'
    // ]);

    foreach ($this->routePrefix as $rp) {
      echo 'Processing route prefix: ' . $rp . "\n";

      foreach ($this->permissionTypes as $type) {
        $permission = $rp . '.' . $type;
        echo '  Creating permission: ' . $permission . "\n";
        Permission::firstOrCreate(['name' => $permission]);

        $superAdmin->givePermissionTo($permission);
        echo "    Assigned to super admin\n";

        if ($rp != 'rolePermission') {
          $admin->givePermissionTo($permission);
          echo "    Assigned to admin\n";
        }

        if (($rp === 'vacanciesAvailable' || $rp === 'vacanciesApplied') && $type === 'view') {
          $user->givePermissionTo($permission);
          echo "    Assigned to user\n";
        }

        if (strpos($rp, 'profile') === 0) {
          $user->givePermissionTo($permission);
          echo "    Assigned to user\n";
        }
      }

      if ($rp === 'vacanciesAvailable' || $rp === 'vacanciesApplied') {
        foreach ($this->additionalPermissionTypes as $apt) {
          $permission = $rp . '.' . $apt;
          echo '  Creating permission: ' . $permission . "\n";
          Permission::firstOrCreate(['name' => $permission]);

          $superAdmin->givePermissionTo($permission);
          echo "    Assigned to super admin\n";

          $admin->givePermissionTo($permission);
          echo "    Assigned to admin\n";

          $user->givePermissionTo($permission);
          echo "    Assigned to admin\n";
        }
      }
    }

    echo "Seeding completed successfully\n";
  }
}
