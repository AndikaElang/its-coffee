<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Specialist extends Model
{
  use Searchable;
  protected $connection = 'pgsql_website';
  protected $table = 'spesialis';
  protected $fillable = [
    'nama_spesialisasi',
    'id_api'
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
      'nama_spesialisasi' => $this->nama_spesialisasi,
    ];
  }

  public function doctor()
  {
    return $this->hasMany(Doctor::class, 'spesialis_id');
  }

  public function getSpecialist(): object
  {
    return $this->orderBy('nama_spesialisasi', 'asc')->get();
  }
}
