<?php

namespace App\Http\Controllers\Diklitlat;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use App\Services\QueryBuilderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicationController extends Controller
{
  protected $builderService;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
  }

  public function index(Request $request, Publication $publication): Response
  {
    $options['allowedSorts'] = ['title', 'year', 'writer', 'journal', 'doi'];

    $query = $this->builderService->buildQuery($publication, $options)
      ->select('id', 'title', 'year', 'writer', 'journal', 'doi')
      ->where('flag_active_disable', 1)
      ->orderBy('year', 'desc');

    // if no sort, default to updated_at
    if (!$request->query('sort')) {
      $query->orderBy('created_at', 'desc');
    }

    $publications = $this->builderService->paginateQuery($query);

    return Inertia::render('Diklitlat/Publication/index', [
      'data' => $publications
    ]);
  }
}
