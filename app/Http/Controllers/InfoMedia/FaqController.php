<?php

namespace App\Http\Controllers\InfoMedia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
  public function index(): Response
  {
    return Inertia::render('InfoMedia/Faq/index');
  }
}
