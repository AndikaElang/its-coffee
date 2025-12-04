<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class PatientExperience extends Model implements HasMedia
{
  use InteractsWithMedia, Searchable;
  protected $connection = 'pgsql_website';
  protected $table = 'pengalaman_pasien';
  protected $fillable = [
    'nama',
    'status',
    'file_name',
    'deskripsi',
    'sender',
    'profesi',
    'landingpage'
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
      'name' => $this->judul,
      'status' => $this->status,
      'profesi' => $this->link,
    ];
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('file_name')
      ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg'])
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
