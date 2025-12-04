<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Activity extends Model implements HasMedia
{
  use InteractsWithMedia, Searchable;
  protected $connection = 'pgsql_website';
  protected $table = 'kegiatan';
  protected $fillable = [
    'judul',
    'slug',
    'htm',
    'tgl_awal',
    'tgl_akhir',
    'jam_awal',
    'jam_akhir',
    'file_name',
    'url_whatsapp',
    'url_daftar',
    'status',
    'deskripsi',
    'sender',
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

  public function participantTargets()
  {
    return $this->hasMany(ParticipantTarget::class, 'kegiatan_id');
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

  public function getActivity($slug)
  {
    $q = $this
      ->where('slug', $slug)
      ->with('participantTargets');

    return $q->firstOrFail();
  }

  public function otherActivity($id, $limit = null, $paginate = false)
  {
    $q = $this
      ->select('id', 'judul', 'slug', 'file_name', 'tgl_awal')
      ->whereNot('id', $id)
      ->where('status', 'Aktif')
      ->orderBy('kegiatan.tgl_awal', 'desc');

    if ($paginate) {
      return $q->paginate($limit)->withQueryString();
    }

    if (!is_null($limit)) {
      $q->limit($limit);
    }

    return $q->get();
  }
}
