<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MedicalCheckupController extends Controller
{
  public function index(): Response
  {
    return Inertia::render('MedicalCheckUp/Index');
  }
}
