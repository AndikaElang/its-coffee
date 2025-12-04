<?php

use App\Http\Controllers\Diklitlat\EducationController;
use App\Http\Controllers\Diklitlat\MedDevValidationController;
use App\Http\Controllers\Diklitlat\PublicationController;
use App\Http\Controllers\Diklitlat\ResearchController;
use App\Http\Controllers\Diklitlat\TrainingController;
use App\Http\Controllers\InfoMedia\ActivityController;
use App\Http\Controllers\InfoMedia\DisorderDeseaseController;
use App\Http\Controllers\InfoMedia\FaqController;
use App\Http\Controllers\InfoMedia\HealthVideoController;
use App\Http\Controllers\InfoMedia\HealthyTalkNewsletterController;
use App\Http\Controllers\InfoMedia\NewsController;
use App\Http\Controllers\InfoMedia\PopularArticleController;
use App\Http\Controllers\InfoMedia\VisualEducationController;
use App\Http\Controllers\Others\InsuranceController;
use App\Http\Controllers\Others\LocationGuideController;
use App\Http\Controllers\Others\PrivacyPolicyController;
use App\Http\Controllers\Others\TermsController;
use App\Http\Controllers\Others\PatientExperiencController;
use App\Http\Controllers\Service\EmergencyInstallationController;
use App\Http\Controllers\Service\HemodialysisController;
use App\Http\Controllers\Service\IntensiveCareController;
use App\Http\Controllers\Service\LaboratoriumController;
use App\Http\Controllers\Service\MedicalCheckupController;
use App\Http\Controllers\Service\PolyclinicController;
use App\Http\Controllers\PatientVisitor\FindDoctorController;
use App\Http\Controllers\RsuiProfile\RSUIProfileController;
use App\Http\Controllers\InfoMedia\PromotionController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\SearchController;

use App\Http\Controllers\Service\RadiologyController;
use App\Http\Controllers\Service\SundayClinicController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::fallback(function () {
  return Inertia::render('Errors/404');
});

// * Notice:
// - Public route should use "Indonesia" language
// - Admin route should use "English" language
// - Route that return JSON should use "English" language
Route::group(['middleware' => ['web']], function () {
  // API
  Route::prefix('internal-api')->middleware('throttle:internal-api')->group(function () {
    Route::post('/doctor/schedule', [FindDoctorController::class, 'getScheduleJson'])->name('patient.findDoctor.getScheduleJson');
    Route::post('/doctor/by-specialist', [FindDoctorController::class, 'doctorBySpecialist'])->name('patient.findDoctor.doctorBySpecialist');
    Route::post('/search/scroll', [SearchController::class, 'searchScroll'])->name('search.scroll');
    Route::post('/cerita-mereka/scroll', [PatientExperiencController::class, 'patientExperienceScroll'])->name('patientExperience.scroll');
  });

  // Beranda
  Route::get('/', [HomepageController::class, 'index'])->name('home.index');
  Route::middleware('throttle:find-doctor')->group(function () {
    Route::post('/find-doctor', [HomepageController::class, 'findDoctor'])->name('home.findDoctor');
    Route::post('/find-clinic', [HomepageController::class, 'findClinic'])->name('home.findClinic');
  });

  // Profil RSUI
  Route::prefix('tentang-rsui')->group(function () {
    Route::get('/', [RSUIProfileController::class, 'index'])->name('about.index');
    Route::middleware('throttle:indikator-mutu')->post('/indikator-mutu', [RSUIProfileController::class, 'findQualityIndicator'])->name('about.qualityIndicator');
  });

  // Pencarian
  Route::get('/pencarian', [SearchController::class, 'index'])->name('search.index');

  // Pasien Pengunjung Group
  Route::prefix('pasien-pengunjung')->group(function () {
    // Cari Dokter
    Route::prefix('cari-dokter')->group(function () {
      Route::get('/', [FindDoctorController::class, 'index'])->name('patient.findDoctor.index');
      Route::get('/{id}', [FindDoctorController::class, 'show'])->name('patient.findDoctor.show');
      Route::get('/{id}/{slug_name}', [FindDoctorController::class, 'show'])->name('patient.findDoctor.show-full');
    });
  });

  // Layanan Group
  Route::prefix('layanan')->group(function () {
    // Poliklinik
    Route::prefix('poli-klinik')->group(function () {
      Route::get('/', [PolyclinicController::class, 'index'])->name('service.polyclinic.index');
      Route::get('/{id}', [PolyclinicController::class, 'show'])->name('service.polyclinic.show');
      Route::get('/{id}/{slug}', [PolyclinicController::class, 'show'])->name('service.polyclinic.show-full');
    });
    Route::get('/sunday-clinic', [SundayClinicController::class, 'index'])->name('service.sundayClinic.index');

    // Medical Check Up
    Route::get('/medical-check-up', [MedicalCheckupController::class, 'index'])->name('service.medicalCheckup.index');
    // Hemodialisis
    Route::get('/hemodialisis', [HemodialysisController::class, 'index'])->name('service.hemodialysis.index');
    // Laboratorium
    Route::get('/laboratorium', [LaboratoriumController::class, 'index'])->name('service.laboratorium.index');
    // Perawatan Intensif
    Route::get('/perawatan-intensif', [IntensiveCareController::class, 'index'])->name('service.intensiveCare.index');
    // Instalasi Gawat Darurat
    Route::get('/gawat-darurat', [EmergencyInstallationController::class, 'index'])->name('service.emergencyInstallation.index');
    // Radiologi
    Route::get('/radiologi', [RadiologyController::class, 'index'])->name('service.radiology.index');
  });

  // Diklitlat Group
  Route::prefix('diklitlat')->group(function () {
    // Pendidikan
    Route::get('/pendidikan', [EducationController::class, 'index'])->name('diklat.education.index');
    // Pelatihan
    Route::prefix('pelatihan')->group(function () {
      Route::get('/', [TrainingController::class, 'index'])->name('diklat.training.index');
      Route::get('/{slug}', [TrainingController::class, 'show'])->name('diklat.training.show');
      Route::post('/scroll', [TrainingController::class, 'scroll'])->name('diklat.training.scroll');
    });
    // Penelitian
    Route::get('/penelitian', [ResearchController::class, 'index'])->name('diklat.research.index');
    // Publikasi
    Route::get('/publikasi', [PublicationController::class, 'index'])->name('diklat.publication.index');
    // Uji Validasi Alat Kesehatan
    Route::prefix('uji-validasi-alkes')->group(function () {
      Route::get('/', [MedDevValidationController::class, 'index'])->name('diklat.medDevValidation.index');
      Route::middleware('throttle:uji-validasi-alkes')->post('/data', [MedDevValidationController::class, 'findMedDevValidation'])->name('diklat.medDevValidation.findMedDevValidation');
    });
  });

  Route::prefix('info-media')->group(function () {
    Route::prefix('promosi')->group(function () {
      Route::get('/', [PromotionController::class, 'index'])->name('info-media.promosi.index');
      Route::get('/{slug}', [PromotionController::class, 'show'])->name('info-media.promosi.show');
      Route::post('/scroll', [PromotionController::class, 'scroll'])->name('info-media.promosi.scroll');
    });
    Route::prefix('kegiatan')->group(function () {
      Route::get('/', [ActivityController::class, 'index'])->name('info-media.kegiatan.index');
      Route::get('/{slug}', [ActivityController::class, 'show'])->name('info-media.kegiatan.show');
      Route::post('/scroll', [ActivityController::class, 'scroll'])->name('info-media.kegiatan.scroll');
    });
    Route::prefix('buletin')->group(function () {
      Route::get('/', [HealthyTalkNewsletterController::class, 'index'])->name('info-media.buletin.index');
      Route::post('/download', [HealthyTalkNewsletterController::class, 'download'])->name('info-media.buletin.download');
    });
    Route::prefix('info-kelainan-penyakit')->group(function () {
      Route::get('/', [DisorderDeseaseController::class, 'index'])->name('info-media.disorderDisease.index');
      Route::post('/filter-by-letter', [DisorderDeseaseController::class, 'filterByLetter'])->name('info-media.disorderDisease.filterByLetter');
      Route::get('/{slug}', [DisorderDeseaseController::class, 'show'])->name('info-media.disorderDisease.show');
      Route::post('/scroll', [DisorderDeseaseController::class, 'scroll'])->name('info-media.disorderDisease.scroll');
    });
    Route::prefix('artikel-populer')->group(function () {
      Route::get('/', [PopularArticleController::class, 'index'])->name('info-media.popularArticle.index');
      Route::get('/{slug}', [PopularArticleController::class, 'show'])->name('info-media.popularArticle.show');
      Route::post('/scroll', [PopularArticleController::class, 'scroll'])->name('info-media.popularArticle.scroll');
    });
    Route::prefix('berita')->group(function () {
      Route::get('/', [NewsController::class, 'index'])->name('info-media.berita.index');
      Route::get('/{slug}', [NewsController::class, 'show'])->name('info-media.berita.show');
      Route::post('/scroll', [NewsController::class, 'scroll'])->name('info-media.berita.scroll');
      Route::post('/download', [NewsController::class, 'download'])->name('info-media.berita.download');
    });
    Route::prefix('edukasi-visual')->group(function () {
      Route::get('/', [VisualEducationController::class, 'index'])->name('info-media.edukasiVisual.index');
      Route::post('/download', [VisualEducationController::class, 'download'])->name('info-media.edukasiVisual.download');
    });
    Route::prefix('video-kesehatan')->group(function () {
      Route::get('/', [HealthVideoController::class, 'index'])->name('info-media.videoKesehatan.index');
    });
    Route::get('/faq', [FaqController::class, 'index'])->name('info-media.faq.index');
  });

  // Others
  Route::get('/syarat-ketentuan', [TermsController::class, 'index'])->name('others.terms.index');
  Route::get('/kebijakan-privasi', [PrivacyPolicyController::class, 'web'])->name('others.privacyPolicy.web');
  Route::get('/kebijakan-privasi-rsui-care', [PrivacyPolicyController::class, 'mobile'])->name('others.privacyPolicy.mobile');
  Route::get('/petunjuk-lokasi', [LocationGuideController::class, 'index'])->name('others.locationGuide.index');
  Route::get('/asuransi', [InsuranceController::class, 'index'])->name('others.insurance.index');
  Route::get('/cerita-mereka', [PatientExperiencController::class, 'index'])->name('others.patientExperience.index');
});

require __DIR__ . '/auth.php';
