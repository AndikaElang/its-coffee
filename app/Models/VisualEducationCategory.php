<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisualEducationCategory extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'kategori_edukasi_visual';

  public function visualEducation()
  {
    return $this->hasMany(VisualEducation::class, 'kategori_id', 'id');
  }

  public function getAllVisualEducationCategories()
  {
    return $this->orderBy('nama_kategori', 'asc')->get();
  }
}
