<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SundayClinicDoctor extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'sunday_clinic_doctor';
  protected $fillable = [
    'sunday_clinic_id',
    'nama',
    'link_dokter'
  ];

  public function clinic()
  {
    return $this->belongsTo(SundayClinic::class, 'sunday_clinic_id');
  }

}
