<?php

namespace App\Http\Controllers;

use App\Http\Requests\FindClinicRequest;
use App\Http\Requests\FindDoctorRequest;
use App\Models\Accomplishment;
use App\Models\Doctor;
use App\Models\Insurance;
use App\Models\News;
use App\Models\PatientExperience;
use App\Models\PolyClinicDetail;
use App\Models\PopupSpecialOffer;
use App\Models\Slider;
use App\Models\SpecialOffer;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class HomepageController extends Controller
{
  protected $dbPopupSpecialOffer;
  protected $dbSlider;
  protected $dbDoctor;
  protected $dbPoly;
  protected $dbSpecialOffer;
  protected $dbNews;
  protected $dbPatientExperience;
  protected $dbInsurance;
  protected $dbAccomplishment;

  public function __construct()
  {
    $this->dbPopupSpecialOffer = new PopupSpecialOffer();
    $this->dbSlider = new Slider();
    $this->dbDoctor = new Doctor();
    $this->dbPoly = new PolyClinicDetail();
    $this->dbSpecialOffer = new SpecialOffer();
    $this->dbNews = new News();
    $this->dbPatientExperience = new PatientExperience();
    $this->dbInsurance = new Insurance();
    $this->dbAccomplishment = new Accomplishment();
  }

  public function index(): Response
  {
    $data = Cache::remember('homepage', 3600, function () {
      $data['popupSpecialOffer'] = $this->dbPopupSpecialOffer->with('specialOffer')
        ->where('status', true)
        ->orderBy('created_at', 'desc')
        ->first();

      $data['sliders'] = $this->dbSlider->select('id', 'link', 'file_name', 'judul')
        ->where('status', 'Aktif')
        ->orderBy('created_at', 'desc')
        ->limit(6)
        ->get();

      $data['doctors'] = $this->dbDoctor->select('id', 'nama_dokter')
        ->where('status_dokter', true)
        ->orderBy('nama_dokter', 'asc')
        ->limit(4)
        ->get();

      $data['centerOfExcellences'] = $this->dbPoly->select('id', 'judul', 'slug', 'img_file_name', 'deskripsi', 'center_of_excellence')
        ->where('status', 'Aktif')
        ->where('center_of_excellence', true)
        ->orderBy('judul', 'asc')
        ->get();

      $data['specialOffers'] = $this->dbSpecialOffer->select('id', 'judul', 'link', 'deskripsi', 'file_name')
        ->where('status', 'Aktif')
        ->orderBy('created_at', 'desc')
        ->limit(8)
        ->get();

      $data['news'] = $this->dbNews->select('id', 'judul', 'image_name', 'deskripsi', 'slug', 'created_at')
        ->where('status', 'Aktif')
        ->where('landingpage', 'Aktif')
        ->orderBy('created_at', 'desc')
        ->limit(7)
        ->get();

      $data['patientExperiences'] = $this->dbPatientExperience->select('id', 'nama', 'file_name', 'deskripsi', 'profesi')
        ->where('status', 'Aktif')
        ->where('landingpage', 'Ya')
        ->orderBy('created_at', 'desc')
        ->get();

      $data['insurances'] = $this->dbInsurance->select('id', 'logo', 'link')
        ->where('status', true)
        ->get();

      $data['accomplishments'] = $this->dbAccomplishment->select('id', 'logo', 'link')
        ->where('status', true)
        ->orderBy('created_at', 'desc')
        ->limit(6)
        ->get();

      return $data;
    });

    return Inertia::render('Homepage/index', [
      'data' => $data,
    ]);
  }

  public function findDoctor(FindDoctorRequest $request): JsonResponse
  {
    $validated = $request->validated();

    try {
      $cacheKey = 'find-doctor-' . $validated['keyword'];
      $data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($validated) {
        return $this->dbDoctor->where('nama_dokter', 'ilike', "%{$validated['keyword']}%")
          ->where('status_dokter', true)
          ->select('id', 'nama_dokter')
          ->orderBy('nama_dokter', 'asc')
          ->get();
      });

      return response()->json([
        'success' => true,
        'message' => 'Success',
        'data' => $data,
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Find doctor error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }

  public function findClinic(FindClinicRequest $request): JsonResponse
  {
    $validated = $request->validated();

    try {
      $cacheKey = 'find-clinic-' . $validated['keyword'];
      $data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($validated) {
        return $this->dbPoly->where('judul', 'ilike', "%{$validated['keyword']}%")
          ->where('status', 'Aktif')
          ->select('id', 'judul')
          ->orderBy('judul', 'asc')
          ->get();
      });

      return response()->json([
        'success' => true,
        'message' => 'Success',
        'data' => $data,
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Find clinic error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }
}
