<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class SundayClinic extends Model implements HasMedia
{
  use Searchable, InteractsWithMedia;

  protected $connection = 'pgsql_website';
  protected $table = 'sunday_clinic';
  protected $fillable = [
    'judul',
    'slug',
    'img_file_name',
    'deskripsi',
    'ruang_lingkup_layanan',
    'layanan_unggulan',
    'fasilitas_dan_teknologi',
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
    $this->addMediaCollection('img_file_name')
      ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg'])
      ->singleFile();
  }

  /**
   * Get the media attribute.
   *
   * This accessor function returns the asset URL for the media
   */
  public function getImgFileNameAttribute(): string
  {
    return $this->getFirstMediaUrl('img_file_name');
  }

  public function doctor()
  {
    return $this->hasMany(SundayClinicDoctor::class, 'sunday_clinic_id');
  }

  public function article()
  {
    return $this->hasMany(SundayClinicArticle::class, 'sunday_clinic_id');
  }

  public function poster()
  {
    return $this->hasMany(SundayClinicPoster::class, 'sunday_clinic_id');
  }

  public function video()
  {
    return $this->hasMany(SundayClinicVideo::class, 'sunday_clinic_id');
  }
}
