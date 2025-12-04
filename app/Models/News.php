<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class News extends Model implements HasMedia
{
  use Searchable, InteractsWithMedia;

  protected $connection = 'pgsql_website';
  protected $table = 'berita';
  protected $fillable = [
    'judul',
    'status',
    'image_name',
    'file_name',
    'deskripsi',
    'sender',
    'slug',
    'landingpage',
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

    $this->addMediaCollection('image_name')
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

  /**
   * Get the media attribute.
   *
   * This accessor function returns the asset URL for the media
   */
  public function getImageNameAttribute(): string
  {
    return $this->getFirstMediaUrl('image_name');
  }

  public function search($validated, $limit = null, $paginate = false)
  {
    $q = $this
      ->select('judul', 'slug', 'deskripsi', 'created_at')
      ->where('status', 'Aktif')
      ->where(
        function ($query) use ($validated) {
          return $query
            ->where('judul', 'ilike', "%{$validated['keyword']}%")
            ->orWhere('deskripsi', 'ilike', "%{$validated['keyword']}%");
        }
      )
      ->orderBy('created_at', 'desc');

    if ($paginate) {
      return $q->paginate($limit)->withQueryString();
    }

    if (!is_null($limit)) {
      $q->limit($limit);
    }

    return $q->get();
  }

  public function getNews($slug)
  {
    $q = $this
      ->where('slug', $slug);

    return $q->firstOrFail();
  }

  public function otherNews($id, $limit = null, $paginate = false)
  {
    $q = $this
      ->whereNot('id', $id)
      ->orderBy('created_at', 'desc');

    if ($paginate) {
      return $q->paginate($limit)->withQueryString();
    }

    if (!is_null($limit)) {
      $q->limit($limit);
    }

    return $q->get();
  }
}
