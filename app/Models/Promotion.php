<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Promotion extends Model
{
  use Searchable;

  protected $connection = 'pgsql_website';
  protected $table = 'promosi';
  protected $fillable = [
    'judul',
    'slug',
    'status',
    'kategori_id',
    'tanggal',
    'sender',
    'deskripsi',
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

  public function files()
  {
    return $this->hasMany(PromotionFile::class, 'promosi_id', 'id');
  }

  public function categories()
  {
    return $this->belongsTo(PromotionCategory::class, 'kategori_id', 'id');
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

  public function getPromotion($slug)
  {
    $q = $this
      ->where('slug', $slug)
      ->with('files');

    return $q->firstOrFail();
  }

  public function otherPromotion($id, $limit = null, $paginate = false)
  {
    $q = $this
      ->select(
        'promosi.id',
        'promosi.judul',
        'promosi.slug',
        'promosi.tanggal',
        'kategori_promosi.nama_kategori'
      )
      ->join('kategori_promosi', 'kategori_promosi.id', '=', 'promosi.kategori_id')
      ->with('files')
      ->where('promosi.status', '=', 'Aktif')
      ->whereNot('promosi.id', $id)
      ->orderBy('promosi.created_at', 'desc');

    if ($paginate) {
      return $q->paginate($limit)->withQueryString();
    }

    if (!is_null($limit)) {
      $q->limit($limit);
    }

    return $q->get();
  }
}
