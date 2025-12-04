<?php

namespace App\Http\Controllers\PatientVisitor;

use App\Http\Controllers\Api\ApiDoctorController;
use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Specialist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Str;

class FindDoctorController extends Controller
{
  protected $dbDoctor;
  protected $dbSpecialist;
  protected $apiDoctor;

  public function __construct(ApiDoctorController $apiDoctor)
  {
    $this->dbDoctor = new Doctor();
    $this->dbSpecialist = new Specialist();
    $this->apiDoctor = $apiDoctor;
  }

  public function index(Request $request): Response
  {
    $data = [];

    $specialists = $this->dbSpecialist
      ->getSpecialist();

    $data['specialists'] = $specialists;

    if (!$request->all()) {
      $doctors = $this->dbDoctor
        ->getRandomDoctors();

      $data['doctors'] = $doctors;
    } elseif ($request->has('spesialis')) { // Yg dikirim id_api
      $validated = $request->validate([
        'spesialis' => ['required', 'integer', 'exists:pgsql_website.spesialis,id_api']
      ]);

      $doctors = $this->dbDoctor
        ->getDoctorsBySpecialist($validated['spesialis']);

      $data['doctors'] = $doctors;
    } else {
      $data['doctors'] = [];
    }

    return Inertia::render('FindDoctor/index', $data);
  }

  public function show($id, $slug_name = null): Response|RedirectResponse
  {
    $doctor = $this->dbDoctor
      ->where('id', $id)
      ->where('status_dokter', true)
      ->with('specialist')
      ->first();

    if (!$doctor) {
      return redirect()->route('patient.findDoctor.index');
    }

    if ($slug_name == null) {
      return redirect()->route('patient.findDoctor.show-full', ['id' => $id, 'slug_name' => Str::slug($doctor['nama_dokter'])]);
    } else {
      if ($slug_name != Str::slug($doctor['nama_dokter'])) {
        return redirect()->route('patient.findDoctor.show', ['id' => $id, 'slug_name' => Str::slug($doctor['nama_dokter'])]);
      }
    }

    $doctor_nip = $doctor['nip'];

    $schedule = Cache::remember('showDoctor' . $id, 60 * 15, function () use ($doctor_nip) {
      $schedule = $this->getSchedule($doctor_nip);
      return $schedule;
    });

    return Inertia::render('FindDoctor/show', [
      'data' => [
        'doctor' => $doctor,
        'schedule' => $schedule
      ]
    ]);
  }

  public function getScheduleJson(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'nip' => ['required', 'string']
      ]);

      $data = $this->getSchedule($validated['nip']);

      return response()->json([
        'success' => true,
        'message' => 'Berhasil fetching jadwal dokter',
        'data' => $data,
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Find Doctor Schedule Api Error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }

  public function doctorBySpecialist(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'spesialis' => ['required', 'integer', 'exists:pgsql_website.spesialis,id_api']
      ]);

      $doctors = $this->dbDoctor
        ->getDoctorsBySpecialist($validated['spesialis']);

      return response()->json([
        'success' => true,
        'message' => 'Success',
        'data' => $doctors,
      ], 200);
    } catch (\Exception $e) {
      \Log::error('Find Doctor By Specialist Api Error', ['error' => $e->getMessage()]);
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }

  public function getSchedule(string $nip): array
  {
    $scheduleRegular = $this->apiDoctor->scheduleByNip($nip, 'Regular Schedule');
    $scheduleHoliday = $this->apiDoctor->scheduleByNip($nip, 'Holiday');
    $scheduleSpecific = $this->apiDoctor->scheduleByNip($nip, 'Specific Daily Schedule');

    $scheduleAnggrek = [
      'Monday' => [],
      'Tuesday' => [],
      'Wednesday' => [],
      'Thursday' => [],
      'Friday' => [],
      'Saturday' => [],
      'Sunday' => []
    ];
    $scheduleExecutive = [
      'Monday' => [],
      'Tuesday' => [],
      'Wednesday' => [],
      'Thursday' => [],
      'Friday' => [],
      'Saturday' => [],
      'Sunday' => []
    ];

    // Build a fast lookup table for holidays
    $holidayLookup = [];
    foreach ($scheduleHoliday as $holiday) {
      $key = $holiday['Date'] . '|' . strtolower($holiday['ClinicName']);
      $holidayLookup[$key] = true;
    }

    foreach ($scheduleRegular as $each) {
      $key = $each['Date'] . '|' . strtolower($each['ClinicName']);

      // skip if this clinic has holiday on this date
      if (!isset($holidayLookup[$key])) {

        if (strpos(strtolower($each['ClinicName']), 'anggrek') !== false) {
          $newIndex = count($scheduleAnggrek[$each['DayName']]);
          $scheduleAnggrek[$each['DayName']][] = $each;

          foreach ($scheduleSpecific as $specific) {
            if ($specific['Date'] == $each['Date'] && $specific['ClinicName'] == $each['ClinicName']) {
              $scheduleAnggrek[$each['DayName']][$newIndex]['Schedule'] = $specific['Schedule'];
            }
          }

        } elseif (strpos(strtolower($each['ClinicName']), 'eksekutif') !== false) {
          $newIndex = count($scheduleExecutive[$each['DayName']]);
          $scheduleExecutive[$each['DayName']][] = $each;

          foreach ($scheduleSpecific as $specific) {
            if ($specific['Date'] == $each['Date'] && $specific['ClinicName'] == $each['ClinicName']) {
              $scheduleExecutive[$each['DayName']][$newIndex]['Schedule'] = $specific['Schedule'];
            }
          }
        }
      }
    }


    foreach ($scheduleSpecific as $specific) {
      $specificDayName = date("l", strtotime($specific['Date']));
      if (strpos(strtolower($specific['ClinicName']), 'anggrek')) {
        $newIndex = count($scheduleAnggrek[$specificDayName]);
        $scheduleAnggrek[$specificDayName][] = $specific;
      } elseif (strpos(strtolower($specific['ClinicName']), 'eksekutif')) {
        $newIndex = count($scheduleExecutive[$specificDayName]);
        $scheduleExecutive[$specificDayName][] = $specific;
      }
    }

    $data = [
      'scheduleAnggrek' => $scheduleAnggrek,
      'scheduleExecutive' => $scheduleExecutive
    ];

    return $data;
  }
}
