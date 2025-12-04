<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Utilities\Curl;
use App\Utilities\HomBaseURL;
use Illuminate\Http\Request;

class ApiDoctorController extends Controller
{
  protected $curl;
  protected $token;
  protected $hom_baseurl;
  public function __construct(Curl $curl, ApiTokenController $token, HomBaseURL $homBaseUrl)
  {
    $this->curl = $curl;
    $this->token = $token;
    $this->hom_baseurl = $homBaseUrl;
  }

  /**
   * Display schedule doctor by nip.
   */
  public function scheduleByNip($nip, $schedule_status)
  {
    $fromDate = date('Y-m-d', strtotime('+1 days'));
    $toDate = date('Y-m-d', strtotime('+6 days', strtotime($fromDate)));

    // String URL
    $strURL = $this->hom_baseurl->getHomBaseUrl(true) . '/api/v1/references/basic/doctor/schedule/all';

    // Get ApiKey
    $apiKey = $this->token->authLogin();

    // data post
    $dataPost = [
      'fromDate' => $fromDate,
      'toDate' => $toDate,
      'clinicId' => null,
      'clinicName' => null,
      'doctorId' => null,
      'doctorName' => null,
      'employeeIdNumber' => $nip,
      'idCardNumber' => null,
      'onlyHasSchedule' => true,
      'day' => null,
      'scheduleStatus' => $schedule_status,
    ];

    $schedule = $this->curl->post($strURL, $dataPost, $apiKey);

    // default
    $data = [];

    foreach ($schedule['results'] as $val) {
      $data[] = [
        'DoctorId' => (!empty($val['DoctorId'])) ? $val['DoctorId'] : '',
        'DoctorName' => (!empty($val['DoctorName'])) ? $val['DoctorName'] : '',
        'Specialties' => (!empty($val['Specialties'])) ? $val['Specialties'] : '',
        'EmployeeIDNumber' => (!empty($val['EmployeeIDNumber'])) ? $val['EmployeeIDNumber'] : '',
        'IDCardNumber' => (!empty($val['IDCardNumber'])) ? $val['IDCardNumber'] : '',
        'Date' => (!empty($val['Date'])) ? $val['Date'] : '',
        'Day' => (!empty($val['Day'])) ? $val['Day'] : '',
        'DayName' => (!empty($val['DayName'])) ? $val['DayName'] : '',
        'ScheduleStatus' => (!empty($val['ScheduleStatus'])) ? $val['ScheduleStatus'] : '',
        'Schedule' => (!empty($val['Schedule'])) ? $val['Schedule'] : '',
        'Duration' => (!empty($val['Duration'])) ? $val['Duration'] : '',
        'ClinicId' => (!empty($val['ClinicId'])) ? $val['ClinicId'] : '',
        'ClinicName' => (!empty($val['ClinicName'])) ? $val['ClinicName'] : '',
        'PriorAgreement' => (!empty($val['PriorAgreement'])) ? $val['PriorAgreement'] : ''
      ];
    }

    return $data;
  }

  public function scheduleBySpesialisId($id_spesialis)
  {
    $apiKey = $this->token->authLogin();

    $strURL = $strURL = $this->hom_baseurl->getHomBaseUrl(true) . '/api/v1/public/doctor/list/schedule';

    // data post
    $dataPost = [
      "DoctorId" => null,
      "ClinicId" => null,
      "Idspesialis" => $id_spesialis,
      "Tanggal" => null,
      "Withspesificschedule" => true,
      "Filterholiday" => true,
      "PageNumber" => 1,
      "PageSize" => 7
    ];

    $schedule = $this->curl->post($strURL, $dataPost, $apiKey);

    // default
    $data = [];

    // day mapping
    $dayMappingNumber = [
      'Senin' => '1',
      'Selasa' => '2',
      'Rabu' => '3',
      'Kamis' => '4',
      'Jumat' => '5',
      'Sabtu' => '6',
      'Minggu' => '7'
    ];

    $dayMappingLang = [
      'Senin' => 'Monday',
      'Selasa' => 'Tuesday',
      'Rabu' => 'Wednesday',
      'Kamis' => 'Thursday',
      'Jumat' => 'Friday',
      'Sabtu' => 'Saturday',
      'Minggu' => 'Sunday'
    ];

    // handle data response
    foreach ($schedule['results'] as $val) {
      foreach ($val['jadwal'] as $each) {
        foreach ($each as $day => $dayValue) {
          foreach ($dayValue as $dv) {
            $data[] = [
              'DoctorId' => $val['id'],
              'DoctorName' => $val['nama'],
              'EmployeeIDNumber' => $val['nip'],
              'Date' => $dv['tanggal'],
              'Day' => $dayMappingNumber[$day],
              'DayName' => $dayMappingLang[$day],
              'ScheduleStatus' => $dv['status'],
              'Schedule' => $dv['jam'],
              'ClinicId' => $dv['id_klinik'],
              'ClinicName' => $dv['nama_klinik'],
              'PriorAgreement' => $dv['PriorAgreement'],
            ];
          }
        }
      }
    }

    return $data;
  }
}
