<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Utilities\HomBaseURL;

class ApiTokenController extends Controller
{
  protected $hom_baseurl;

  public function __construct(HomBaseURL $homBaseUrl)
  {
    $this->hom_baseurl = $homBaseUrl;
  }

  public function authLogin()
  {
    $data_post = [
      'username' => 'InternalAPIUser01',
      'password' => '123456',
    ];

    $curl = curl_init();

    $str_url = $this->hom_baseurl->getHomBaseUrl(true) . '/api/v1/auth/login';

    curl_setopt_array($curl, [
      CURLOPT_URL => $str_url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_SSL_VERIFYPEER => false,
      CURLOPT_SSL_VERIFYHOST => false,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => json_encode($data_post),
      CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
      ],
    ]);

    $response = curl_exec($curl);
    $decode = json_decode($response, true);

    curl_close($curl);

    $token = (!empty($decode['results'][0]['tokenKey'])) ? $decode['results'][0]['tokenKey'] : '';

    return $token;
  }
}
