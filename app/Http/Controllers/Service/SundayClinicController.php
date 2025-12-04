<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Models\SundayClinic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SundayClinicController extends Controller
{
  protected $dbClinic;

  public function __construct()
  {
    $this->dbClinic = new SundayClinic();
  }

  public function index(): Response
  {
    $clinic = $this->dbClinic
      ->with([
        'poster' => function ($query) {
          $query->where('poster_aktif', true)
            ->orderBy('sunday_clinic_poster.updated_at', 'desc');
        },
        'article' => function ($query) {
          $query->where('artikel_aktif', true)
            ->orderBy('sunday_clinic_article.updated_at', 'desc');
        },
        'video' => function ($query) {
          $query->orderBy('sunday_clinic_video.updated_at', 'desc');
        },
        'doctor' => function ($query) {
          $query->orderBy('sunday_clinic_doctor.created_at', 'desc');
        }
      ])
      ->first();

    return Inertia::render('Service/SundayClinic/index', [
      'data' => $clinic
    ]);
  }
}
