<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class SundayClinicArticle extends Model implements HasMedia
{
  use InteractsWithMedia;

  protected $connection = 'pgsql_website';
  protected $table = 'sunday_clinic_article';
  protected $fillable = [
    'sunday_clinic_id',
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

  public function clinic()
  {
    return $this->belongsTo(SundayClinic::class, 'sunday_clinic_id');
  }
}
