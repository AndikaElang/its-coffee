<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class EnvSustainReport extends Model implements HasMedia
{
  use Searchable, InteractsWithMedia;

  protected $connection = 'pgsql_website';
  protected $table = 'keberlanjutan_laporan';
  protected $fillable = [
    'judul',
    'slug',
    'status',
    'file_name',
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
    ];
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('file_name')
      ->acceptsMimeTypes(['application/pdf'])
      ->singleFile();
  }

  /**
   * Get the media attribute.
   *
   * This accessor function returns the asset URL for the media
   */
  public function getFileNameAttribute(): string
  {
    return $this->getFirstMediaUrl('file_name');
  }
}
