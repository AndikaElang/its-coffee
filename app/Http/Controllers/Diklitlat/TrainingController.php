<?php

namespace App\Http\Controllers\Diklitlat;

use App\Http\Controllers\Controller;
use App\Models\Training;
use App\Services\QueryBuilderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrainingController extends Controller
{
  protected $builderService;
  protected $training;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
    $this->training = new Training();
  }

  public function index(Request $request, Training $pelatihan): Response
  {
    $options = [];

    $query = $this->builderService->buildQuery($pelatihan, $options)
      ->select(
        'id',
        'nama_pelatihan',
        'penyelenggara_pelatihan',
        'tanggal_mulai_pelatihan',
        'tanggal_selesai_pelatihan',
        'status_pelatihan',
        'biaya_pelatihan',
        'thumbnail_pelatihan',
        'total_skp_pelatihan',
        'slug'
      )
      ->orderByRaw("
        CASE
            WHEN tanggal_mulai_pelatihan >= CURRENT_DATE THEN 0
            ELSE 1
        END,
        CASE
            WHEN tanggal_mulai_pelatihan >= CURRENT_DATE THEN tanggal_mulai_pelatihan
            ELSE NULL
        END ASC,
        CASE
            WHEN tanggal_mulai_pelatihan < CURRENT_DATE THEN tanggal_mulai_pelatihan
            ELSE NULL
        END DESC
      ");

    $trainings = $this->builderService->paginateQuery($query, 8);

    return Inertia::render('Diklitlat/Training/index', [
      'data' => $trainings,
    ]);
  }

  public function show($slug): Response|RedirectResponse
  {
    $training = $this->training->getTraining($slug);

    if (!$training) {
      return redirect()->back();
    }

    $limit = 5;
    $otherTraining = $this->training->otherTraining($training->id, $limit, true);

    return Inertia::render('Diklitlat/Training/show', [
      'data' => [
        'training' => $training,
        'otherTraining' => $otherTraining
      ],
    ]);
  }

  public function scroll(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'id' => ['required', 'integer'],
        'page' => ['required', 'integer']
      ]);

      $limit = 5;
      $data = $this->training->otherTraining($validated['id'], $limit, true);

      return response()->json([
        'success' => true,
        'data' => $data,
        'message' => 'Data ditemukan'
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Other training scroll error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }
}
