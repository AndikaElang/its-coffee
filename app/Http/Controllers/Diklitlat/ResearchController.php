<?php

namespace App\Http\Controllers\Diklitlat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResearchController extends Controller
{
  public function index()
  {
    return Inertia::render('Diklitlat/Research/index');
  }
}
