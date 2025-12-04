<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoryMassRegistration extends Model
{
  protected $connection = 'pgsql_pasien';
  protected $table = 'history_registrasi_masals';

  protected $fillable = [
    'name',
    'email' ,
    'mobile_phone' ,
    'episode_no',
    'episode_date' ,
    'treatment_type',
    'episode_status',
    'patient_name' ,
    'medical_record_no',
    'gender',
    'date_of_birth',
    'patient_identity_no',
    'passport_no',
    'examiner_name',
    'episode_location',
    'sender',
    'created_afya_by',
    'reference_id',
    'created_by',
  ];
}
