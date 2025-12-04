<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Accomplishment extends Model implements HasMedia
{
  use Searchable, InteractsWithMedia;

  protected $connection = 'pgsql_website';
  protected $table = 'pencapaian';
  protected $fillable = [
    'nama',
    'logo',
    'link',
    'status',
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
      'nama' => $this->nama,
      'link' => $this->link,
      'status' => $this->status,
    ];
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('logo')
      ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg'])
      ->singleFile();
  }

  /**
   * Get the media attribute.
   *
   * This accessor function returns the asset URL for the media
   */
  public function getLogoAttribute(): string
  {
    return $this->getFirstMediaUrl('logo');
  }
}
