<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DisorderDiseaseCategory extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'kategori_kelainan_penyakit';
  protected $fillable = [
    'kelainan_penyakit_id',
    'kategori_id',
    'kategori_name',
    'slug',
  ];

  public function disorderDisease()
  {
    return $this->belongsTo(DisorderDisease::class, 'kelainan_penyakit_id');
  }
}
