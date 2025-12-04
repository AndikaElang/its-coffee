<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromotionCategory extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'kategori_promosi';

  public function promotions()
  {
    return $this->hasMany(Promotion::class, 'kategori_id', 'id');
  }

  public function getAllCategories(): object
  {
    return $this->orderBy('nama_kategori', 'asc')->get();
  }
}
