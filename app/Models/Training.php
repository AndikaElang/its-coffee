<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;

class Training extends Model implements HasMedia
{
  use Searchable, InteractsWithMedia;

  protected $connection = 'pgsql_website';
  protected $table = 'pelatihan';
  protected $fillable = [
    'nama_pelatihan',
    'penyelenggara_pelatihan',
    'link_gform_pelatihan',
    'tanggal_mulai_pelatihan',
    'tanggal_selesai_pelatihan',
    'biaya_pelatihan',
    'status_pelatihan',
    'tipe_pelatihan',
    'total_skp_pelatihan',
    'kuota_peserta_pelatihan',
    'deskripsi_pelatihan',
    'thumbnail_pelatihan',
    'slug',
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
      'nama_pelatihan' => $this->nama_pelatihan,
      'penyelenggara_pelatihan' => $this->penyelenggara_pelatihan,
      'tanggal_mulai_pelatihan' => $this->tanggal_mulai_pelatihan,
      'tanggal_selesai_pelatihan' => $this->tanggal_selesai_pelatihan,
    ];
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('thumbnail_pelatihan')
      ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg'])
      ->singleFile();
  }

  /**
   * Get the media attribute.
   *
   * This accessor function returns the asset URL for the media
   */
  public function getThumbnailPelatihanAttribute(): string
  {
    return $this->getFirstMediaUrl('thumbnail_pelatihan');
  }

  public function search($validated, $limit = null, $paginate = false)
  {
    $q = $this
      ->select('nama_pelatihan as judul', 'slug', 'deskripsi_pelatihan as deskripsi', 'created_at')
      ->where(
        function ($query) use ($validated) {
          return $query
            ->where('nama_pelatihan', 'ilike', "%{$validated['keyword']}%")
            ->orWhere('deskripsi_pelatihan', 'ilike', "%{$validated['keyword']}%");
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

  public function getTraining($slug)
  {
    $q = $this
      ->where('slug', $slug);

    return $q->firstOrFail();
  }

  public function otherTraining($id, $limit = null, $paginate = false)
  {
    $q = $this
      ->select('id', 'slug', 'nama_pelatihan', 'thumbnail_pelatihan', 'tanggal_mulai_pelatihan')
      ->whereNot('id', $id)
      ->orderByRaw("
        CASE
            WHEN tanggal_mulai_pelatihan >= CURRENT_DATE THEN 0
            ELSE 1
        END,
        CASE
            WHEN tanggal_mulai_pelatihan >= CURRENT_DATE THEN tanggal_mulai_pelatihan
            ELSE NULL
        END ASC,
        CASE
            WHEN tanggal_mulai_pelatihan < CURRENT_DATE THEN tanggal_mulai_pelatihan
            ELSE NULL
        END DESC
      ");

    if ($paginate) {
      return $q->paginate($limit)->withQueryString();
    }

    if (!is_null($limit)) {
      $q->limit($limit);
    }

    return $q->get();
  }
}
