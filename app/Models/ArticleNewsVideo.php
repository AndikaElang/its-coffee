<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class ArticleNewsVideo extends Model
{
  use Searchable;

  protected $connection = 'pgsql_website';
  protected $table = 'video';
  protected $fillable = [
    'judul',
    'slug',
    'link',
    'status',
    'deskripsi',
    'sender'
  ];

  /**
   * Prepare instance for indexing in search.
   *
   * @return array
   */
  public function toSearchableArray()
  {
    return [
      'id' => $this->id,
      'judul' => $this->judul,
      'status' => $this->status,
      'link' => $this->link,
    ];
  }
}
