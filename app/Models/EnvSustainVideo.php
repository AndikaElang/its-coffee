<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class EnvSustainVideo extends Model
{
  use Searchable;

  protected $connection = 'pgsql_website';
  protected $table = 'keberlanjutan_video';
  protected $fillable = [
    'judul',
    'slug',
    'link_video',
    'status',
    'tanggal',
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
      'link_video' => $this->link_video,
    ];
  }
}
