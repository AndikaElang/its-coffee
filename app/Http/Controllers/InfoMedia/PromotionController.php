<?php

namespace App\Http\Controllers\InfoMedia;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use App\Services\QueryBuilderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PromotionController extends Controller
{
  protected $builderService;
  protected $dbPromotion;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
    $this->dbPromotion = new Promotion();
  }

  public function index(Request $request, Promotion $promosi): Response
  {
    $options = [];
    $limit = 8;

    $query = $this->builderService->buildQuery($promosi, $options)
      ->select(
        'promosi.id',
        'promosi.judul',
        'promosi.slug',
        'promosi.tanggal',
        'promosi.deskripsi',
        'kategori_promosi.nama_kategori'
      )
      ->join('kategori_promosi', 'kategori_promosi.id', '=', 'promosi.kategori_id')
      ->with('files')
      ->where('promosi.status', '=', 'Aktif')
      ->orderBy('promosi.updated_at', 'desc');

    $promotions = $this->builderService->paginateQuery($query, $limit);

    return Inertia::render('InfoMedia/Promotion/index', [
      'data' => $promotions
    ]);
  }

  public function show($slug): Response|RedirectResponse
  {
    $promotion = $this->dbPromotion->getPromotion($slug);

    if (!$promotion) {
      return redirect()->back();
    }

    $limit = 5;
    $otherPromotion = $this->dbPromotion->otherPromotion($promotion->id, $limit, true);

    return Inertia::render('InfoMedia/Promotion/show', [
      'data' => [
        'promotion' => $promotion,
        'otherPromotion' => $otherPromotion
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
      $data = $this->dbPromotion->otherPromotion($validated['id'], $limit, true);

      return response()->json([
        'success' => true,
        'data' => $data,
        'message' => 'Data ditemukan'
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Other promotion scroll error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }
}
