<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\PatientExperience;
use App\Services\QueryBuilderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PatientExperiencController extends Controller
{
  protected $builderService;
  protected $dbPatientExperience;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
    $this->dbPatientExperience = new PatientExperience();
  }

  public function index(): Response
  {
    // $options = [];
    $limit = 5;

    $patientExperiences = $this->dbPatientExperience
      ->select(
        'id',
        'nama',
        'file_name',
        'deskripsi',
        'profesi'
      )
      ->where('status', 'Aktif')
      ->orderBy('landingpage')
      ->orderBy('updated_at', 'desc')
      ->limit($limit)
      ->get();

    return Inertia::render('Others/PatientExperience/index', [
      'data' => $patientExperiences
    ]);
  }

  public function patientExperienceScroll(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'page' => ['required', 'integer']
      ]);

      $limit = 5;

      $data = $this->dbPatientExperience
        ->select(
          'id',
          'nama',
          'file_name',
          'deskripsi',
          'profesi'
        )
        ->where('status', 'Aktif')
        ->orderBy('landingpage')
        ->orderBy('updated_at', 'desc')
        ->paginate($limit)->withQueryString();

      return response()->json([
        'success' => true,
        'data' => $data,
        'message' => 'Data ditemukan'
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Scroll patient experience error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }
}
