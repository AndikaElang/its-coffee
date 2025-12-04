<?php

namespace App\Utilities;

class Curl
{
  /**
   * Display the specified resource [GET]
   *
   * @return response
   */
  public function get($url = '', $token = '')
  {
    $curl = curl_init();

    curl_setopt_array($curl, [
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_SSL_VERIFYPEER => false,
      CURLOPT_SSL_VERIFYHOST => false,
      CURLOPT_CUSTOMREQUEST => 'GET',
      CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'token: ' . $token,
      ],
    ]);

    $response = curl_exec($curl);
    $decode = json_decode($response, true);

    curl_close($curl);

    return $decode;
  }

  /**
   * Display the specified resource [POST]
   *
   * @return response
   */
  public function post($url = '', $data_post = [], $token = '')
  {
    $curl = curl_init();

    curl_setopt_array($curl, [
      CURLOPT_URL => $url,
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
        'token: ' . $token,
      ],
    ]);

    $response = curl_exec($curl);
    $decode = json_decode($response, true);

    curl_close($curl);

    return $decode;
  }

  /**
   * Display the specified resource [POST]
   *
   * @return response
   */
  public function post_file($url = '', $data_post = [], $token = '')
  {
    $curl = curl_init();

    curl_setopt_array($curl, [
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_SSL_VERIFYHOST => false,
      CURLOPT_SSL_VERIFYPEER => false,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $data_post,
      CURLOPT_HTTPHEADER => [
        'token: ' . $token,
      ],
    ]);

    $response = curl_exec($curl);
    $decode = json_decode($response, true);

    curl_close($curl);

    return $decode;
  }
}
