<?php

namespace App\Http\Controllers\InfoMedia;

use App\Http\Controllers\Controller;
use App\Models\HealthyTalkNewsletter;
use App\Services\QueryBuilderService;
use App\Utilities\MediaBaseURL;
use App\Utilities\MediaChecker;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HealthyTalkNewsletterController extends Controller
{
  protected $builderService;
  protected $mediaBaseURL;
  protected $dbHealthyTalkNewsletter;

  public function __construct(QueryBuilderService $builderService, MediaBaseURL $mediaBaseURL)
  {
    $this->builderService = $builderService;
    $this->mediaBaseURL = $mediaBaseURL;
    $this->dbHealthyTalkNewsletter = new HealthyTalkNewsletter();
  }

  public function index(Request $request, HealthyTalkNewsletter $buletin): Response
  {
    $options = [];
    $limit = 4;

    $query = $this->builderService->buildQuery($buletin, $options)
      ->select(
        '*'
      )
      ->where('status', 'Aktif')
      ->orderBy('created_at', 'desc');

    $buletins = $this->builderService->paginateQuery($query, $limit);

    return Inertia::render('InfoMedia/HealthyTalkNewsletter/index', [
      'data' => $buletins,
    ]);
  }

  public function download(Request $request)
  {
    try {
      $request->validate([
        'id' => 'required|exists:pgsql_website.buletin_bicara_sehat,id'
      ]);

      $newsletter = $this->dbHealthyTalkNewsletter->findOrFail($request->id);

      // Get the media item from the collection
      $media = $newsletter->getFirstMedia('file_name');

      if (!$media) {
        return response()->json([
          'message' => 'File not found',
          'data' => $media
        ], 404);
      }

      // Increment download counter
      $newsletter->increment('count');
      $newsletter->update(['increased_at' => now()]);

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
      \Log::error('Download healthy talk newsletter error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }
}
