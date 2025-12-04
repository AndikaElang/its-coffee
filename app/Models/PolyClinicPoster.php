<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class PolyClinicPoster extends Model implements HasMedia
{
  use InteractsWithMedia;
  protected $connection = 'pgsql_website';
  protected $table = 'poli_klinik_poster';
  protected $fillable = [
    'poli_id',
    'poster_file_name',
    'poster_extension',
    'poster_url',
    'poster_aktif'
  ];

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('poster_file_name')
      ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg'])
      ->singleFile();
  }

  /**
   * Get the media attribute.
   *
   * This accessor function returns the asset URL for the media
   */
  public function getPosterFileNameAttribute(): string
  {
    return $this->getFirstMediaUrl('poster_file_name');
  }

  public function poly()
  {
    return $this->belongsTo(PolyClinicDetail::class, 'poli_id');
  }
}
