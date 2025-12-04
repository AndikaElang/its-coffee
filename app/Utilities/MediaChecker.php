<?php

namespace App\Utilities;

class MediaChecker
{
  public static function isDownloadable($url, $type = null): bool
  {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
      CURLOPT_NOBODY => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_TIMEOUT => 10,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_SSL_VERIFYPEER => false,
    ]);
    curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    curl_close($ch);

    // \Log::info('MediaChecker', ['url' => $url, 'http_code' => $code, 'content_type' => $type, 'check_type' => $type]);

    if ($type) {
      return $code === 200 && str_contains(strtolower($type ?? ''), $type);
    } else {
      return $code === 200;
    }
  }
}
