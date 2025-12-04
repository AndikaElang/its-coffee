<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class RsuiLatest extends Model
{
  use Searchable;
  protected $connection = 'pgsql_website';
  protected $table = 'rsui_terkini';
  protected $fillable = [
    'judul',
    'status',
    'link',
    'sender'
  ];

  /**
   * Prepare the user instance for indexing in search.
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
