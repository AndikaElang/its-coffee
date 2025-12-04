<?php

namespace App\Http\Controllers\InfoMedia;

use App\Http\Controllers\Controller;
use App\Models\VisualEducation;
use App\Services\QueryBuilderService;
use App\Utilities\MediaBaseURL;
use App\Utilities\MediaChecker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class VisualEducationController extends Controller
{
  protected $builderService;
  protected $mediaBaseURL;
  protected $dbVisualEducation;

  public function __construct(QueryBuilderService $builderService, MediaBaseURL $mediaBaseURL)
  {
    $this->builderService = $builderService;
    $this->mediaBaseURL = $mediaBaseURL;
    $this->dbVisualEducation = new VisualEducation();
  }

  public function index(Request $request, VisualEducation $visualEducation): Response
  {
    $options = [];
    $limit = 4;

    $query = $this->builderService->buildQuery($visualEducation, $options)
      ->select(
        'edukasi_visual.id',
        'judul',
        'file_name',
        'deskripsi',
        'tanggal',
        'count',
        'kategori_id',
        'nama_kategori'
      )
      ->join('kategori_edukasi_visual', 'kategori_edukasi_visual.id', '=', 'edukasi_visual.kategori_id')
      ->where('status', 'Aktif');

    if (!is_null($request->category)) {
      $query = $query->whereHas('kategori', function ($sub) use ($request) {
        $sub->where('kategori_id', $request->category);
      });
    }

    $query = $query->orderBy('tanggal', 'desc');

    $visualEducations = $this->builderService->paginateQuery($query, $limit);

    return Inertia::render('InfoMedia/VisualEducation/index', [
      'visualEducations' => $visualEducations,
      'selectedCategory' => $request->category ?? null,
    ]);
  }

  public function download(Request $request)
  {
    try {
      $request->validate([
        'id' => 'required|exists:pgsql_website.edukasi_visual,id'
      ]);

      $ve = $this->dbVisualEducation->findOrFail($request->id);

      // Get the media item from the collection
      $media = $ve->getFirstMedia('file_name');

      if (!$media) {
        return response()->json([
          'message' => 'File not found',
          'data' => $media
        ], 404);
      }

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

      // Increment download counter
      $ve->increment('count');
      $ve->update(['increased_at' => now()]);

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
      \Log::error('Download healthy talk newsletter error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }
}
