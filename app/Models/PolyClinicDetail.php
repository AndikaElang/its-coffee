<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class PolyClinicDetail extends Model implements HasMedia
{
  use Searchable, InteractsWithMedia;

  protected $connection = 'pgsql_website';
  protected $table = 'poli_klinik';
  protected $fillable = [
    'judul',
    'slug',
    'status',
    'prioritas',
    'img_file_name',
    'deskripsi',
    'ruang_lingkup_layanan',
    'layanan_unggulan',
    'fasilitas_dan_teknologi',
    'sender',
    'center_of_excellence',
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
    return $this->hasMany(PolyClinicDoctor::class, 'poli_id');
  }

  public function article()
  {
    return $this->hasMany(PolyClinicArticle::class, 'poli_id');
  }

  public function poster()
  {
    return $this->hasMany(PolyClinicPoster::class, 'poli_id');
  }

  public function video()
  {
    return $this->hasMany(PolyClinicVideo::class, 'poli_id');
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
}
