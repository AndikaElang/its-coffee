<?php

namespace App\Http\Controllers\RsuiProfile;

use App\Http\Requests\FindQualityIndicatorRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\EnvSustainVideo;
use App\Models\EnvSustainReport;
use App\Models\QualityIndicator;
use App\Models\EnvSustainArticle;
use App\Http\Controllers\Controller;
use App\Services\QueryBuilderService;
use Illuminate\Support\Facades\Route;
use App\Models\QualityIndicatorCategory;

class RSUIProfileController extends Controller
{
  protected $builderService;
  protected $dbEnvSustainArticle;
  protected $dbQualityIndicator;
  protected $dbQualityIndicatorCategory;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
    $this->dbEnvSustainArticle = new EnvSustainArticle();
    $this->dbQualityIndicator = new QualityIndicator();
    $this->dbQualityIndicatorCategory = new QualityIndicatorCategory();
  }
  public function index(): Response
  {
    $data = [];
    $year = Carbon::now()->format('Y');

    $data = Cache::remember('about-rsui', now()->addMinutes(60), function () use ($year) {
      $data = $this->environmentSustain();
      $data['qualityIndicator'] = $this->qualityIndicator($year);

      return $data;
    });

    return Inertia::render('RsuiProfile/index', [
      'data' => $data,
    ]);
  }

  public function findQualityIndicator(FindQualityIndicatorRequest $request): JsonResponse
  {
    // validate must be number
    $validated = $request->validated();

    $data = [];
    try {
      $cacheKey = 'find-quality-indicator-' . $validated['year'];
      $data['qualityIndicator'] = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($validated) {
        return $this->qualityIndicator($validated['year']);
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

  private function environmentSustain(): array
  {
    // Di code lama make paginate
    // $envSustainArticleOptions = [];
    // $qEnvSustainArticle = $this->builderService->buildQuery($this->dbEnvSustainArticle, $envSustainArticleOptions)
    //   ->where('status', 'Aktif')
    //   ->orderBy('tanggal', 'desc');
    // $article = $this->builderService->paginateQuery($qEnvSustainArticle);

    $article = $this->dbEnvSustainArticle->select('id', 'judul', 'slug', 'image_name', 'tanggal', 'deskripsi')
      ->where('status', 'Aktif')
      ->orderBy('tanggal', 'desc')
      ->get();

    return [
      'articles' => $article,
    ];
  }

  private function qualityIndicator($year): array
  {
    $selected_year = $year;

    $category = $this->dbQualityIndicatorCategory->getCategories();
    $year = $this->dbQualityIndicator->getYear();
    $quality_indicator_data = $this->dbQualityIndicator->getQualityIndicatorData($selected_year);

    $count_data = count($quality_indicator_data);

    if ($count_data === 0) {
      return [
        'year' => $year,
        'yearNow' => $selected_year,
      ];
    }

    foreach ($quality_indicator_data as $each) {
      $unserialized_target[] = unserialize($each->target);
      $unserialized_capaian[] = unserialize($each->capaian);
    }

    foreach ($unserialized_target as $key => $value) {
      $data_int_target[] = array_map('floatval', $value);
    }

    foreach ($unserialized_capaian as $key => $value) {
      $data_int_capaian[] = array_map('floatval', $value);
    }

    foreach ($data_int_target as $key => $value) {
      $data_target['data'][] = array_values($value);
    }

    foreach ($data_int_capaian as $key => $value) {
      $data_capaian['data'][] = array_values($value);
    }

    for ($i = 0; $i < $count_data; $i++) {
      ${"data_capaian_$i"}['data'] = $data_capaian['data'][$i];
      ${"data_target_$i"}['data'] = $data_target['data'][$i];

      $data_json_capaian['chart_data_' . $i] = json_encode(${"data_capaian_$i"});
      $data_json_target['chart_data_' . $i] = json_encode(${"data_target_$i"});
    }

    return [
      'selectedYear' => $selected_year,
      'yearList' => $year,
      'category' => $category,
      'qualityIndicatorData' => $quality_indicator_data,
      'dataCapaian' => $data_json_capaian,
      'dataTarget' => $data_json_target,
    ];
  }
}
