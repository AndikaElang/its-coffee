<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QualityIndicator extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'indikator_mutus';
  protected $fillable = [
    'tahun',
    'kategori_id',
    'kode_imut',
    'target',
    'capaian',
    'sender'
  ];

  public function getYear(): object
  {
    return $this->select('tahun')
      ->where('tahun', '>', 2021)
      ->where('kategori_id', 1)
      ->orderBy('tahun', 'desc')
      ->get();
  }

  public function getQualityIndicatorData($year): object
  {
    return $this->select('tahun', 'target', 'capaian', 'kode_imut')
      ->where('tahun', $year)
      ->orderBy('id', 'asc')
      ->get();
  }

  public function getQualityIndicatorByYearGroup($year): object
  {
    return $this->select('tahun', 'target', 'capaian', 'kode_imut')->where('tahun', $year)->orderBy('id', 'asc')->get();
  }

  public function deleteByYear($year): int
  {
    return $this->where('tahun', $year)->delete();
  }
}
