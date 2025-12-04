<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
  protected $connection = 'pgsql_pasien';
  protected $table = 'registrasi';

  public function getTotalVisitPlan()
  {
    $visitPlan = $this->selectRaw("
      date_part('year', tgl_registrasi) as year,
      to_char(tgl_registrasi::date, 'FMMonth') as monthname,
      extract(month from tgl_registrasi) as month,
      count(*) as total
    ")
      ->where('id_layanan', '2')
      ->whereNotIn('clinic_id', ['452', '468'])
      ->whereBetween('tgl_registrasi', [now()->subMonths(6), now()])
      ->groupBy('year', 'monthname', 'month')
      ->orderByRaw('min(tgl_registrasi) desc')
      ->get();

    return $visitPlan->reverse()->values();
  }

  public function getTotalRegistrationByGuarantor()
  {
    return $this->selectRaw('kategori_penjamin, count(*) as total')
      ->where('kategori_penjamin', '!=', null)
      ->groupBy('kategori_penjamin')
      ->get();
  }

  public function getTopSixRegistrationPoli()
  {
    return $this->selectRaw('clinic_name as poliklinik, count(*) as total')
      ->whereNotIn('clinic_id', ['339', '379', '452', '468'])
      ->groupBy('clinic_id', 'clinic_name')
      ->orderBy('total', 'desc')
      ->limit(6)
      ->get();
  }
}
