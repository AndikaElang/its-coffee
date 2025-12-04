<?php

namespace App\Http\Controllers\InfoMedia;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Services\QueryBuilderService;
use App\Utilities\MediaBaseURL;
use App\Utilities\MediaChecker;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
  protected $builderService;
  protected $mediaBaseURL;
  protected $dbNews;

  public function __construct(QueryBuilderService $builderService, MediaBaseURL $mediaBaseURL)
  {
    $this->builderService = $builderService;
    $this->mediaBaseURL = $mediaBaseURL;
    $this->dbNews = new News();
  }

  public function index(Request $request, News $berita): Response
  {
    $options = [];
    $limit = 8;

    $query = $this->builderService->buildQuery($berita, $options)
      ->select(
        'id',
        'judul',
        'image_name',
        'slug'
      )
      ->where('status', 'Aktif')
      ->orderBy('created_at', 'desc');

    $news = $this->builderService->paginateQuery($query, $limit);

    return Inertia::render('InfoMedia/News/index', [
      'data' => $news
    ]);
  }

  public function show($slug): Response|RedirectResponse
  {
    $news = $this->dbNews->getNews($slug);

    if (!$news) {
      return redirect()->back();
    }

    $limit = 5;
    $otherNews = $this->dbNews->otherNews($news->id, $limit, true);

    return Inertia::render('InfoMedia/News/show', [
      'data' => [
        'news' => $news,
        'otherNews' => $otherNews,
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
      $data = $this->dbNews->otherNews($validated['id'], $limit, true);

      return response()->json([
        'success' => true,
        'data' => $data,
        'message' => 'Data ditemukan'
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Other news scroll error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }

  public function download(Request $request)
  {
    try {
      $request->validate([
        'id' => 'required|exists:pgsql_website.berita,id'
      ]);

      $news = $this->dbNews->findOrFail($request->id);

      // Get the media item from the collection
      $media = $news->getFirstMedia('file_name');

      // Get file from MinIO through Spatie Media Library
      $fileURL = $media->getPath();
      $fileName = $media->file_name;

      // read base url from env
      $mediaBaseURL = $this->mediaBaseURL->getMediaBaseUrl();
      $mediaURL = $mediaBaseURL . $fileURL;

      // check if the file exists in that url
      if (!MediaChecker::isDownloadable($mediaURL)) {
        \Log::warning('File not found on server', ['file_url' => $mediaURL]);
        return response()->json([
          'message' => 'File not found on server',
          'data' => $media
        ], 404);
      }

      $remote = Http::withOptions(['stream' => true])->get($mediaURL);
      return response()->stream(function () use ($remote) {
        while (!$remote->getBody()->eof()) {
          echo $remote->getBody()->read(1024 * 8);
        }
      }, 200, [
        'Content-Type' => $remote->header('Content-Type') ?? 'application/octet-stream',
        'Content-Length' => $remote->header('Content-Length'),
        'Content-Disposition' => 'inline; filename="' . $fileName . '"',
        'Cache-Control' => 'public, max-age=31536000',
      ]);
    } catch (\Exception $e) {
      \Log::error('Download news error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }
}
