<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VaccineType extends Model
{
  protected $connection = 'pgsql_pasien';
  protected $table = 'jenis_vaksin';

  public function getVaccineType(): object
  {
    return $this->orderBy('nama_jenis_vaksin')->get();
  }
}
