<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'publikasis';
  protected $fillable = [
    'title',
    'year',
    'writer',
    'journal',
    'doi',
    'flag_active_disable',
    'sender',
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
      'title' => $this->title,
      'flag_active_disable' => $this->flag_active_disable,
    ];
  }
}
