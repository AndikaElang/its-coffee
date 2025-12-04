<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class DisorderDisease extends Model
{
  use Searchable;

  protected $connection = 'pgsql_website';
  protected $table = 'kelainan_penyakit';
  protected $fillable = [
    'judul',
    'slug',
    'penulis',
    'ditinjau',
    'tanggal',
    'deskripsi',
    'status',
    'sender'
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
      'penulis' => $this->penulis,
      'status' => $this->status,
    ];
  }

  public function categories()
  {
    return $this->hasMany(DisorderDiseaseCategory::class, 'kelainan_penyakit_id');
  }

  public function files()
  {
    return $this->hasMany(DisorderDiseaseFile::class, 'kelainan_penyakit_id');
  }

  public function search($validated, $limit = null, $paginate = false)
  {
    $q = $this
      ->select('kelainan_penyakit.judul', 'kelainan_penyakit.slug', 'kelainan_penyakit.deskripsi', 'kelainan_penyakit.tanggal as created_at')
      ->join('kategori_kelainan_penyakit', 'kategori_kelainan_penyakit.kelainan_penyakit_id', '=', 'kelainan_penyakit.id')
      ->where('status', ' Aktif')
      ->where(
        function ($query) use ($validated) {
          return $query
            ->where('kelainan_penyakit.judul', 'ilike', "%{$validated['keyword']}%")
            ->orWhere('kelainan_penyakit.penulis', 'ilike', "%{$validated['keyword']}%")
            ->orWhere('kelainan_penyakit.deskripsi', 'ilike', "%{$validated['keyword']}%")
            ->orWhere('kategori_kelainan_penyakit.kategori_name', 'ilike', "%{$validated['keyword']}%");
        }
      )
      ->groupBy('kelainan_penyakit.id')
      ->orderBy('kelainan_penyakit.tanggal', 'desc');

    if ($paginate) {
      return $q->paginate($limit)->withQueryString();
    }

    if (!is_null($limit)) {
      $q->limit($limit);
    }

    return $q->get();
  }

  public function filterByLetter($letter)
  {
    $q = $this
      ->select('judul', 'slug')
      ->where('judul', 'LIKE', strtoupper($letter) . '%')
      ->where('status', 'Aktif');

    return $q->get();
  }
}
