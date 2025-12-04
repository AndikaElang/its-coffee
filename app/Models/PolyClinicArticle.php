<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class PolyClinicArticle extends Model implements HasMedia
{
  use Searchable, InteractsWithMedia;

  protected $connection = 'pgsql_website';
  protected $table = 'poli_klinik_artikel';
  protected $fillable = [
    'poli_id',
    'artikel_judul',
    'artikel_file_name',
    'artikel_extension',
    'artikel_thumbnail_file_name',
    'artikel_thumbnail_extension',
    'artikel_aktif'
  ];

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('artikel_file_name')
      ->acceptsMimeTypes(['application/pdf'])
      ->singleFile();

    $this->addMediaCollection('artikel_thumbnail_file_name')
      ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg'])
      ->singleFile();
  }

  /**
   * Get the media attribute.
   *
   * This accessor function returns the asset URL for the media
   */
  public function getArtikelFileNameAttribute(): string
  {
    return $this->getFirstMediaUrl('artikel_file_name');
  }

  public function getArtikelThumbnailFileNameAttribute(): string
  {
    return $this->getFirstMediaUrl('artikel_thumbnail_file_name');
  }

  public function poly()
  {
    return $this->belongsTo(PolyClinicDetail::class, 'poli_id');
  }
}
