<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IntensiveCareController extends Controller
{
  public function index(): Response
  {
    return Inertia::render('IntensiveCare/Index');
  }
}
