<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParticipantTarget extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'target_peserta';
  protected $fillable = [
    'kegiatan_id',
    'target_peserta_id',
    'target_peserta_name',
    'slug'
  ];
}
