<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PopularArticleCategory extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'kategori_artikels';
  protected $fillable = [
    'artikel_id',
    'kategori_id',
    'kategori_name',
    'slug',
  ];

  public function popularArticle()
  {
    return $this->belongsTo(PopularArticle::class, 'artikel_id');
  }
}
