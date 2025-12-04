<?php

namespace App\Http\Controllers\InfoMedia;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Services\QueryBuilderService;
use App\Utilities\PriceFormatter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
  protected $builderService;
  protected $priceFormatter;
  protected $dbActivity;

  public function __construct(QueryBuilderService $builderService, PriceFormatter $priceFormatter)
  {
    $this->builderService = $builderService;
    $this->priceFormatter = $priceFormatter;
    $this->dbActivity = new Activity();
  }

  public function index(Request $request, Activity $activity): Response
  {
    $options = [];
    $limit = 8;

    $query = $this->builderService->buildQuery($activity, $options)
      ->select(
        'id',
        'judul',
        'slug',
        'htm',
        'tgl_awal',
        'tgl_akhir',
        'jam_awal',
        'jam_akhir',
        'file_name'
      )
      ->with('participantTargets')
      ->where('status', 'Aktif')
      ->orderBy('kegiatan.tgl_awal', 'desc');

    $activities = $this->builderService->paginateQuery($query, $limit);

    $i = 0;
    foreach ($activities as $val) {
      $activities[$i]->htm = $this->priceFormatter->formatPrice($val->htm);
      $i++;
    }

    return Inertia::render('InfoMedia/Activity/index', [
      'data' => $activities
    ]);
  }

  public function show($slug): Response|RedirectResponse
  {
    $activity = $this->dbActivity->getActivity($slug);

    if (!$activity) {
      return redirect()->back();
    }

    $activity->htm = $this->priceFormatter->formatPrice($activity->htm);

    $limit = 5;
    $otherActivity = $this->dbActivity->otherActivity($activity->id, $limit, true);

    return Inertia::render('InfoMedia/Activity/show', [
      'data' => [
        'activity' => $activity,
        'otherActivity' => $otherActivity,
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
      $data = $this->dbActivity->otherActivity($validated['id'], $limit, true);

      return response()->json([
        'success' => true,
        'data' => $data,
        'message' => 'Data ditemukan'
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Other activity scroll error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }
}
