<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class SpecialOffer extends Model implements HasMedia
{
  use InteractsWithMedia, Searchable;
  protected $fillable = ['judul', 'status', 'link', 'sender', 'deskripsi', 'file_name'];

  protected $connection = 'pgsql_website';
  protected $table = 'penawaran_spesial';


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
      'link' => $this->link,
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

  public function popupSpecialOffer()
  {
    return $this->hasMany(PopupSpecialOffer::class, 'penawaran_spesial_id', 'id');
  }
}
