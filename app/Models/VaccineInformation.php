<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VaccineInformation extends Model
{
  protected $connection = 'pgsql_pasien';
  protected $table = 'informasi_vaksin';
  protected $fillable = [
    'judul',
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
      'status' => $this->status,
    ];
  }
}
