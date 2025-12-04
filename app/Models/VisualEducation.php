<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class VisualEducation extends Model implements HasMedia
{
  use Searchable, InteractsWithMedia;

  protected $connection = 'pgsql_website';
  protected $table = 'edukasi_visual';
  protected $fillable = [
    'judul',
    'status',
    'file_name',
    'deskripsi',
    'sender',
    'slug',
    'kategori_id',
    'tanggal',
    'count',
    'increased_at'
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

  public function kategori()
  {
    return $this->belongsTo(VisualEducationCategory::class, 'kategori_id', 'id');
  }

  public function search($validated, $limit = null, $paginate = false)
  {
    $q = $this
      ->select('judul', 'deskripsi', 'created_at')
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
}
