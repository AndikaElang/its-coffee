<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalRecordEpisode extends Model
{
  protected $connection = 'pgsql_pasien';
  protected $table = 'rekam_medis';

  /**
   * Prepare instance for indexing in search.
   *
   * @return array
   */
  public function toSearchableArray()
  {
    return [
      'id' => $this->id,
      'episode_no' => $this->episode_no,
      'episode_date' => $this->episode_date,
      'treatment_type' => $this->treatment_type,
      'episode_status' => $this->episode_status,
      'patient_name' => $this->patient_name,
      'medical_record_no' => $this->medical_record_no,
      'date_of_birth' => $this->date_of_birth,
      'examiner_name' => $this->examiner_name,
      'episode_location' => $this->episode_location,
    ];
  }
}
