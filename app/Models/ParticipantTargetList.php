<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParticipantTargetList extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'target_peserta_list';

  public function getParticipantTargetList()
  {
    return $this->select('id', 'target_peserta')
      ->orderBy('target_peserta', 'asc')
      ->get();
  }

  public function getParticipantTargetById($id): object
  {
    return $this->where('id', $id)->first();
  }
}
