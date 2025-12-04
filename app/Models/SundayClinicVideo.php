<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SundayClinicVideo extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'sunday_clinic_video';
  protected $fillable = [
    'sunday_clinic_id',
    'video_url',
    'video_judul',
  ];

  public function clinic()
  {
    return $this->belongsTo(SundayClinic::class, 'sunday_clinic_id');
  }
}
