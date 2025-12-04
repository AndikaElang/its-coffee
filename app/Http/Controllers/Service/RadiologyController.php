<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RadiologyController extends Controller
{
  public function index(): Response
  {
    return Inertia::render('Radiology/Index');
  }
}
