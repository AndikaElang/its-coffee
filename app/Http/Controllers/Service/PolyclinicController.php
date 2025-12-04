<?php

namespace App\Http\Controllers\Service;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\PolyClinicDetail;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Str;

class PolyclinicController extends Controller
{
  protected $dbClinic;

  public function __construct()
  {
    $this->dbClinic = new PolyClinicDetail();
  }

  public function index(): Response
  {
    $data = [];

    $data['clinics'] = $this->dbClinic
      ->select('id', 'slug', 'judul', 'center_of_excellence')
      ->where('status', 'Aktif')
      ->orderBy('prioritas', 'desc')
      ->orderBy('judul', 'asc')
      ->get();

    return Inertia::render('Service/Polyclinic/index', $data);
  }

  public function show($id, $slug = ''): Response|RedirectResponse
  {
    $data = [];

    // Eager load semua relasi sekaligus dengan constraints - mengurangi dari 4-5 query menjadi 1 query
    $data['clinic'] = $this->dbClinic
      ->with([
        'poster' => function ($query) {
          $query->where('poster_aktif', true)
            ->orderBy('poli_klinik_poster.updated_at', 'desc');
        },
        'article' => function ($query) {
          $query->where('artikel_aktif', true)
            ->orderBy('poli_klinik_artikel.updated_at', 'desc');
        },
        'video' => function ($query) {
          $query->orderBy('poli_klinik_video.updated_at', 'desc');
        },
        'doctor' => function ($query) {
          $query->orderBy('poli_klinik_dokter.created_at', 'desc');
        }
      ])
      ->where('id', $id)
      ->where('status', 'Aktif')
      ->first();

    if (!$data['clinic']) {
      return redirect()->route('service.polyclinic.index');
    }

    if ($slug == null) {
      return redirect()->route('service.polyclinic.show-full', ['id' => $id, 'slug' => Str::slug($data['clinic']['judul'])]);
    } else {
      if ($slug != Str::slug($data['clinic']['judul'])) {
        return redirect()->route('service.polyclinic.show', ['id' => $id, 'slug' => Str::slug($data['clinic']['judul'])]);
      }
    }

    // Ambil dari relasi yang sudah di-eager load (tidak memicu query tambahan)
    $data['clinicPoster'] = $data['clinic']->poster;
    $data['clinicArticles'] = $data['clinic']->article;
    $data['clinicVideos'] = $data['clinic']->video;
    $data['clinicDoctors'] = $data['clinic']->doctor;

    return Inertia::render('Service/Polyclinic/show', $data);
  }
}
