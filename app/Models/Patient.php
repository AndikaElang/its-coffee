<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
  protected $connection = 'pgsql_pasien';
  protected $table = 'pasien';

  /**
   * Prepare instance for indexing in search.
   *
   * @return array
   */
  public function toSearchableArray()
  {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'identification_no' => $this->identification_no,
    ];
  }

  public function getTotalPatientByGender()
  {
    return $this->selectRaw('gender, count(*) as total')
      ->groupBy('gender')
      ->get();
  }
}
