<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VaccineSession extends Model
{
  protected $connection = 'pgsql_pasien';
  protected $table = 'sesi_vaksin';
  protected $fillable = [
    'tgl_vaksin',
    'sesi',
    'total',
    'status',
    'id_jenis_vaksin',
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
      'tgl_vaksin' => $this->tgl_vaksin,
      'status' => $this->status,
    ];
  }
}
