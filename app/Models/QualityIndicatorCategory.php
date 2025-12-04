<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QualityIndicatorCategory extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'kategori_indikator_mutus';

  public function getCategories()
  {
    return $this->selectRaw('id, kategori_nama')
      ->orderBy('id', 'asc')->get();
  }
}
