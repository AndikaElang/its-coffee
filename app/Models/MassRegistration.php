<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MassRegistration extends Model
{
  protected $connection = 'pgsql_pasien';
  protected $table = 'registrasi_masals';

  protected $fillable = [
    'name',
    'identification_no',
    'gender',
    'date_of_birth',
    'place_of_birth',
    'home_address',
    'mobile_phone',
    'email',
    'sender',
    'notes'
  ];


  public function toSearchableArray()
  {
    return [
      'name' => $this->name,
      'identification_no' => $this->identification_no,
      'gender' => $this->gender,
      'date_of_birth' => $this->date_of_birth,
      'place_of_birth' => $this->place_of_birth,
      'notes' => $this->notes,
    ];
  }
}
