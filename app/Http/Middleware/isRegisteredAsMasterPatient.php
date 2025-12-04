<?php

namespace App\Http\Middleware;

use App\Models\Patient;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class isRegisteredAsMasterPatient
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    $isRegistered = Patient::where('id_user', Auth::id())->first();

    if (!$isRegistered) {
      return redirect()->route('patient.profile.create');
    }

    return $next($request);
  }
}
