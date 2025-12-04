<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PolyClinicVideo extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'poli_klinik_video';
  protected $fillable = [
    'poli_id',
    'video_url',
    'video_judul',
  ];

  public function poly()
  {
    return $this->belongsTo(PolyClinicDetail::class, 'poli_id');
  }
}
