<?php

namespace App\Utilities;

use Illuminate\Support\Facades\App;

class MediaBaseURL
{
  public function getMediaBaseUrl($forceProduction = false)
  {
    if ($forceProduction) {
      return config('baseurl.media_prod');
    }

    if (App::environment('local')) {
      return config('baseurl.media_dev');
    } else {
      return config('baseurl.media_prod');
    }
  }
}
