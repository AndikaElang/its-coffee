<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Insurance;
use App\Services\QueryBuilderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InsuranceController extends Controller
{
  protected $builderService;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
  }

  public function index(Request $request, Insurance $insurance): Response
  {
    $options = [];
    $limit = 8;

    $query = $this->builderService->buildQuery($insurance, $options)
      ->select(
        'id',
        'nama',
        'logo',
        'link'
      )
      ->where('status', true);

    if (!is_null($request->s)) {
      $query = $query->where('nama', 'ilike', "%{$request->s}%");
    }

    $query = $query->orderBy('created_at', 'desc');

    $insurances = $this->builderService->paginateQuery($query, $limit);

    return Inertia::render('Others/Insurance/index', [
      'data' => $insurances,
      'keyword' => $request->s
    ]);
  }
}
