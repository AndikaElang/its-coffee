<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PrivacyPolicyController extends Controller
{
  public function web(): Response
  {
    return Inertia::render('Others/PrivacyPolicy/Web/index');
  }

  public function mobile(): Response
  {
    return Inertia::render('Others/PrivacyPolicy/Mobile/index');
  }
}
