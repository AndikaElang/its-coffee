<?php

namespace App\Http\Controllers\InfoMedia;

use App\Http\Controllers\Controller;
use App\Models\PopularArticle;
use App\Services\QueryBuilderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PopularArticleController extends Controller
{
  protected $builderService;
  protected $dbPopularArticle;

  public function __construct(QueryBuilderService $builderService)
  {
    $this->builderService = $builderService;
    $this->dbPopularArticle = new PopularArticle();
  }

  public function index(Request $request, PopularArticle $popularArticle): Response
  {
    $options = [];
    $limit = 3;

    $query = $this->builderService->buildQuery($popularArticle, $options)
      ->select(
        'id',
        'judul',
        'slug',
        'penulis',
        'tanggal',
        'deskripsi',
        'count'
      )
      ->with(['categories', 'files'])
      ->where('artikel_populers.status', 'Aktif');

    if (!is_null($request->category)) {
      $query = $query->whereHas('categories', function ($sub) use ($request) {
        $sub->where('kategori_artikels.kategori_name', $request->category);
      });
    }

    $query = $query->orderBy('artikel_populers.tanggal', 'desc');

    $popularArticles = $this->builderService->paginateQuery($query, $limit);
    $categories = $this->dbPopularArticle->getCategories();

    return Inertia::render('InfoMedia/PopularArticle/index', [
      'articles' => $popularArticles,
      'categories' => $categories,
      'selectedCategory' => $request->category ?? null,
    ]);
  }

  public function show($slug): Response|RedirectResponse
  {
    $article = $this->dbPopularArticle->getArticle($slug);

    if (!$article) {
      return redirect()->back();
    }

    $limit = 5;
    $otherArticle = $this->dbPopularArticle->otherArticle($article->id, $limit, true);

    return Inertia::render('InfoMedia/PopularArticle/show', [
      'data' => [
        'article' => $article,
        'otherArticle' => $otherArticle,
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
      $data = $this->dbPopularArticle->otherArticle($validated['id'], $limit, true);

      return response()->json([
        'success' => true,
        'data' => $data,
        'message' => 'Data ditemukan'
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Other article scroll error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }
}
