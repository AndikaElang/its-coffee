<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PopupSpecialOffer extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'popup_penawaran_spesial';
  protected $fillable = [
    'penawaran_spesial_id',
    'status',
  ];

  public function specialOffer()
  {
    return $this->belongsTo(SpecialOffer::class, 'penawaran_spesial_id');
  }
}
