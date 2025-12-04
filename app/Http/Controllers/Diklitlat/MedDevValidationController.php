<?php

namespace App\Http\Controllers\Diklitlat;

use App\Http\Controllers\Controller;
use App\Http\Requests\MedDevValidationRequest;
use App\Models\MedDevValidation;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class MedDevValidationController extends Controller
{
  protected $dbMedDevValidation;

  public function __construct()
  {
    $this->dbMedDevValidation = new MedDevValidation();
  }
  public function index(): Response
  {
    $data = [];
    $yearList = $this->dbMedDevValidation->distinct()->orderBy('tahun_group', 'desc')->pluck('tahun_group');
    $year = $yearList[0];

    $data = Cache::remember('med-dev-validation', now()->addMinutes(60), function () use ($year) {
      return $this->medDevValidationData($year);
    });

    return Inertia::render('Diklitlat/MedDevValidation/index', [
      'data' => $data,
    ]);
  }

  public function findMedDevValidation(MedDevValidationRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $data = [];

    try {
      $cacheKey = 'find-med-dev-validation-' . $validated['year'];
      $data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($validated) {
        return $this->medDevValidationData($validated['year']);
      });

      return response()->json([
        'success' => true,
        'message' => 'Success',
        'data' => $data,
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Find quality indicator error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }

  private function medDevValidationData($selected_year): array
  {
    $year = $this->dbMedDevValidation->getYear();
    $medDevData = $this->dbMedDevValidation->getMedDevData($selected_year);

    $count_data = count($medDevData);

    if ($count_data === 0) {
      return [
        'year' => $year,
        'yearNow' => $selected_year,
        'dataJson' => '',
        'medDevData' => [],
      ];
    }

    $transformData = [];
    foreach ($medDevData as $each) {
      $transformData['label'][] = $each->jenis_pengujian;
      $transformData['data'][] = $each->nilai;
    }

    $dataJson['chartData'] = json_encode($transformData);

    return [
      'year' => $year,
      'yearNow' => $selected_year,
      'dataJson' => $dataJson,
      'medDevData' => $medDevData,
    ];
  }
}
