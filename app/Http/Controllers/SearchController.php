<?php

namespace App\Http\Controllers;

use App\Utilities\CustomPagination;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Route;
use App\Models\News;
use Inertia\Response;
use App\Models\Activity;
use App\Models\Training;
use App\Models\Promotion;
use Illuminate\Http\Request;
use App\Models\PopularArticle;
use App\Models\DisorderDisease;
use App\Models\VisualEducation;
use App\Models\PolyClinicDetail;
use Illuminate\Support\Collection;

class SearchController extends Controller
{
  protected $dbDisorderDisease;
  protected $dbPopularArticle;
  protected $dbNews;
  protected $dbVisualEducation;
  protected $dbActivity;
  protected $dbPromotion;
  protected $dbPolyClynic;
  protected $dbTraining;
  protected $customPagination;

  public function __construct(CustomPagination $customPagination)
  {
    $this->dbDisorderDisease = new DisorderDisease();
    $this->dbPopularArticle = new PopularArticle();
    $this->dbNews = new News();
    $this->dbVisualEducation = new VisualEducation();
    $this->dbActivity = new Activity();
    $this->dbPromotion = new Promotion();
    $this->dbPolyClynic = new PolyClinicDetail();
    $this->dbTraining = new Training();
    $this->customPagination = $customPagination;
  }

  public function index(Request $request): Response
  {
    $validated = $request->validate([
      'keyword' => ['required', 'string'],
    ]);

    $limit = 5;

    // Kelainan Penyakit
    $disorderDiseases = $this->dbDisorderDisease
      ->search($validated, $limit);

    $disorderDiseases->map(function ($disorderDiseases) {
      $disorderDiseases['kategori'] = 'kelainanPenyakit';
      $disorderDiseases['url'] = 'info-media/info-kelainan-penyakit';
      return $disorderDiseases;
    });

    // Artikel Populer
    $popularArticles = $this->dbPopularArticle
      ->search($validated, $limit);

    $popularArticles->map(function ($popularArticles) {
      $popularArticles['kategori'] = 'artikelPopuler';
      $popularArticles['url'] = 'info-media/artikel-populer';
      return $popularArticles;
    });

    // Berita
    $news = $this->dbNews
      ->search($validated, $limit);

    $news->map(function ($news) {
      $news['kategori'] = 'berita';
      $news['url'] = 'info-media/berita';
      return $news;
    });

    // Edukasi Visual
    $visualEducations = $this->dbVisualEducation
      ->search($validated, $limit);

    $visualEducations->map(function ($visualEducations) {
      $visualEducations['kategori'] = 'edukasiVisual';
      $visualEducations['url'] = '';
      return $visualEducations;
    });

    // Kegiatan
    $activities = $this->dbActivity
      ->search($validated, $limit);

    $activities->map(function ($activities) {
      $activities['kategori'] = 'kegiatan';
      $activities['url'] = 'info-media/kegiatan';
      return $activities;
    });

    // Promosi
    $promotions = $this->dbPromotion
      ->search($validated, $limit);

    $promotions->map(function ($promotions) {
      $promotions['kategori'] = 'promosi';
      $promotions['url'] = 'info-media/promosi';
      return $promotions;
    });

    // Poli Klinik
    $polyClinics = $this->dbPolyClynic
      ->search($validated, $limit);

    $polyClinics->map(function ($polyClinics) {
      $polyClinics['kategori'] = 'poliklinik';
      $polyClinics['url'] = 'layanan/poli-klinik';
      return $polyClinics;
    });

    // Pelatihan
    $trainings = $this->dbTraining
      ->search($validated, $limit);

    $trainings->map(function ($trainings) {
      $trainings['kategori'] = 'pelatihan';
      $trainings['url'] = 'diklitlat/pelatihan';
      return $trainings;
    });

    return Inertia::render('Search/index', [
      'data' => [
        'disorderDiseases' => $disorderDiseases,
        'popularArticles' => $popularArticles,
        'news' => $news,
        'visualEducations' => $visualEducations,
        'activities' => $activities,
        'promotions' => $promotions,
        'polyClinics' => $polyClinics,
        'trainings' => $trainings
      ],
      'keyword' => $validated['keyword']
    ]);
  }


  public function searchScroll(Request $request): JsonResponse
  {
    $validated = $request->validate([
      'category' => ['required', 'string'],
      'keyword' => ['required', 'string'],
      'page' => ['required', 'integer'],
    ]);

    $limit = 5;

    // swithc case by category
    switch ($validated['category']) {
      case 'kelainanPenyakit':
        $model = $this->dbDisorderDisease;
        break;
      case 'artikelPopuler':
        $model = $this->dbPopularArticle;
        break;
      case 'berita':
        $model = $this->dbNews;
        break;
      case 'edukasiVisual':
        $model = $this->dbVisualEducation;
        break;
      case 'kegiatan':
        $model = $this->dbActivity;
        break;
      case 'promosi':
        $model = $this->dbPromotion;
        break;
      case 'poliklinik':
        $model = $this->dbPolyClynic;
        break;
      case 'pelatihan':
        $model = $this->dbTraining;
        break;
      default:
        $model = null;
        break;
    }

    if (is_null($model)) {
      return response()->json([
        'success' => false,
        'message' => 'Kategori tidak ditemukan'
      ], 400);
    }

    $data = $model->search($validated, $limit, true);

    return response()->json([
      'success' => true,
      'data' => $data,
      'message' => 'Data ditemukan'
    ], 200);

    // return Inertia::render('Search/newIndex', [
    //   'data' => $popularArticles,
    //   'category' => $validated['category'],
    //   'keyword' => $validated['keyword'],
    //   'page' => $validated['page']
    // ]);
  }
}
