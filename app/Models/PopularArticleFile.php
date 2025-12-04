<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class PopularArticleFile extends Model implements HasMedia
{
  use InteractsWithMedia;

  protected $connection = 'pgsql_website';
  protected $table = 'file_artikels';
  protected $fillable = [
    'artikel_id',
    'file_name',
    'extension',
    'size',
  ];

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('file_name')
      ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg']);
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

  public function popularArticle()
  {
    return $this->belongsTo(PopularArticle::class, 'artikel_id');
  }
}
