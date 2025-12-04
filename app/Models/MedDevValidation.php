<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedDevValidation extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'validasi_alkes';
  protected $fillable = [
    'tahun_group',
    'sequence',
    'kode_alkes',
    'jenis_pengujian',
    'nilai',
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
      'tahun_group' => $this->tahun_group,
    ];
  }

  public function getMedDevValidationByYearGroup($year): object
  {
    return $this->select('id', 'jenis_pengujian', 'nilai', 'sequence', 'tahun_group')
      ->where('tahun_group', '=', $year)
      ->orderBy('sequence', 'asc')
      ->get();
  }

  public function getYear(): object
  {
    $q = $this
      ->select('tahun_group')
      ->where('sequence', '=', '1')
      ->orderBy('tahun_group', 'desc');

    return $q->get();
  }

  public function getMedDevData($year): object
  {
    $q = $this
      ->select('jenis_pengujian', 'nilai', 'sequence')
      ->where('tahun_group', '=', $year)
      ->orderBy('sequence', 'asc');

    return $q->get();
  }
}
