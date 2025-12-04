<?php

namespace App\Utilities;

use Illuminate\Support\Facades\App;

class HomBaseURL
{
  public function getHomBaseUrl($forceProduction = false)
  {
    if ($forceProduction) {
      return config('baseurl.hom_prod');
    }

    if (App::environment('local')) {
      return config('baseurl.hom_dev');
    } else {
      return config('baseurl.hom_prod');
    }
  }
}
