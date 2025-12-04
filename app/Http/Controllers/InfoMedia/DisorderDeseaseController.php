<?php

namespace App\Http\Controllers\InfoMedia;

use App\Http\Controllers\Controller;
use App\Models\DisorderDisease;
use App\Models\PopularArticle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisorderDeseaseController extends Controller
{
  protected $dbDisorderDisease;
  protected $dbPopularArticle;

  public function __construct()
  {
    $this->dbDisorderDisease = new DisorderDisease();
    $this->dbPopularArticle = new PopularArticle();
  }

  public function index(Request $request)
  {
    $letter = strtoupper($request->query('letter', 'A'));

    if (!preg_match('/^[A-Z]$/', $letter)) {
      $letter = 'A'; // fallback
    }

    $data = $this->dbDisorderDisease->filterByLetter($letter);

    return Inertia::render('InfoMedia/DisorderDisease/index', [
      'data' => $data,
      'letter' => $letter
    ]);
  }

  public function filterByLetter(Request $request)
  {
    try {
      $validated = $request->validate([
        'letter' => 'required|string|size:1'
      ]);

      $data = $this->dbDisorderDisease->filterByLetter($validated['letter']);

      return response()->json([
        'data' => $data,
        'letter' => $validated['letter']
      ]);
    } catch (\Exception $e) {
      \Log::error('Fetching disorder disease by letter error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }

  public function show($slug)
  {
    try {
      $diseases = $this->dbDisorderDisease->with(['categories', 'files'])->where('slug', $slug)->where('status', 'Aktif')->firstOrFail();
      $relatedArticle = $this->dbPopularArticle->articlesRelatedToDisorderDisease($diseases['judul']);

      return Inertia::render('InfoMedia/DisorderDisease/show', [
        'data' => [
          'diseases' => $diseases,
          'relatedArticle' => $relatedArticle
        ],
      ]);
    } catch (\Exception $e) {
      \Log::error('Fetching disorder disease detail error', ['error' => $e->getMessage()]);
      return redirect()->route('info-media.disorderDisease.index');
    }
  }

  public function scroll(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'id' => ['required'],
        'page' => ['required', 'integer']
      ]);

      $data = $this->dbPopularArticle->articlesRelatedToDisorderDisease($validated['id']);

      return response()->json([
        'success' => true,
        'data' => $data,
        'message' => 'Data ditemukan'
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Disorder diseases related article scroll error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }
}
