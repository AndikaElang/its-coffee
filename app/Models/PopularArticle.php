<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class PopularArticle extends Model
{
  use Searchable;

  protected $connection = 'pgsql_website';
  protected $table = 'artikel_populers';
  protected $fillable = [
    'judul',
    'slug',
    'penulis',
    'tanggal',
    'deskripsi',
    'status',
    'sender',
    'count',
    'increased_at',
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
    return $this->hasMany(PopularArticleCategory::class, 'artikel_id');
  }

  public function files()
  {
    return $this->hasMany(PopularArticleFile::class, 'artikel_id');
  }

  public function search($validated, $limit = null, $paginate = false)
  {
    $q = $this
      ->select('artikel_populers.judul', 'artikel_populers.slug', 'artikel_populers.deskripsi', 'artikel_populers.tanggal as created_at')
      ->join('kategori_artikels', 'kategori_artikels.artikel_id', '=', 'artikel_populers.id')
      ->where('artikel_populers.status', 'Aktif')
      ->where(
        function ($query) use ($validated) {
          return $query
            ->where('artikel_populers.judul', 'ilike', "%{$validated['keyword']}%")
            ->orWhere('artikel_populers.penulis', 'ilike', "%{$validated['keyword']}%")
            ->orWhere('artikel_populers.deskripsi', 'ilike', "%{$validated['keyword']}%")
            ->orWhere('kategori_artikels.kategori_name', 'ilike', "%{$validated['keyword']}%");
        }
      )
      ->groupBy('artikel_populers.id')
      ->orderBy('artikel_populers.tanggal', 'desc');

    if ($paginate) {
      return $q->paginate($limit)->withQueryString();
    }

    if (!is_null($limit)) {
      $q->limit($limit);
    }

    return $q->get();
  }

  public function getCategories()
  {
    $q = $this
      ->selectRaw('kategoris.id as id, kategoris.kategori as kategori, count(*) as total')
      ->join('kategori_artikels', 'artikel_populers.id', '=', 'kategori_artikels.artikel_id')
      ->join('kategoris', 'kategori_artikels.kategori_id', '=', 'kategoris.id')
      ->where('artikel_populers.status', '=', 'Aktif')
      ->groupBy('kategoris.id')
      ->orderBy('kategori', 'asc');

    return $q->get();
  }

  public function getArticle($slug)
  {
    $q = $this
      ->where('slug', $slug)
      ->with(['categories', 'files']);

    return $q->firstOrFail();
  }

  public function otherArticle($id, $limit = null, $paginate = false)
  {
    $q = $this
      ->select('id', 'judul', 'slug', 'tanggal')
      ->with('files')
      ->whereNot('id', $id)
      ->where('status', 'Aktif')
      ->orderBy('tanggal', 'desc');

    if ($paginate) {
      return $q->paginate($limit)->withQueryString();
    }

    if (!is_null($limit)) {
      $q->limit($limit);
    }

    return $q->get();
  }

  public function articlesRelatedToDisorderDisease($value, $limit = 5)
  {
    $q = $this
      ->select('artikel_populers.id', 'artikel_populers.judul', 'artikel_populers.slug', 'artikel_populers.tanggal')
      ->join('kategori_artikels', 'kategori_artikels.artikel_id', '=', 'artikel_populers.id')
      ->with('files')
      ->where('status', 'Aktif')
      ->where(
        function ($query) use ($value) {
          return $query
            ->where('artikel_populers.judul', 'ilike', "%{$value}%")
            ->orWhere('artikel_populers.penulis', 'ilike', "%{$value}%")
            ->orWhere('artikel_populers.deskripsi', 'ilike', "%{$value}%")
            ->orWhere('kategori_artikels.kategori_name', 'ilike', "%{$value}%");
        }
      )
      ->orderBy('tanggal', 'desc');

    return $q->paginate($limit)->withQueryString();
  }
}
