<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PolyClinicDoctor extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'poli_klinik_dokter';
  protected $fillable = [
    'poli_id',
    'nama',
    'link_dokter'
  ];

  public function poly()
  {
    return $this->belongsTo(PolyClinicDetail::class, 'poli_id');
  }
}
