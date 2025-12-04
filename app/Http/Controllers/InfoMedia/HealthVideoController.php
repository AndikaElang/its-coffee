<?php

namespace App\Http\Controllers\InfoMedia;

use App\Http\Controllers\Controller;
use App\Models\ArticleNewsVideo;
use App\Services\QueryBuilderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HealthVideoController extends Controller
{
  protected $builderService;
  protected $dbArticleNewsVideo;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
    $this->dbArticleNewsVideo = new ArticleNewsVideo();
  }

  public function index(Request $request, ArticleNewsVideo $video): Response
  {
    $options = [];
    $limit = 4;

    $query = $this->builderService->buildQuery($video, $options)
      ->select(
        'id',
        'judul',
        'link',
        'deskripsi'
      )
      ->where('status', 'Aktif')
      ->orderBy('created_at', 'desc');

    $videos = $this->builderService->paginateQuery($query, $limit);

    return Inertia::render('InfoMedia/HealthVideo/index', [
      'data' => $videos
    ]);
  }
}
