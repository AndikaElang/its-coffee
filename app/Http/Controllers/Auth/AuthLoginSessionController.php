<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\PushNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthLoginSessionController extends Controller
{
  /**
   * Display the login view.
   */
  public function create(): Response
  {
    $siteKey = config('google_captcha.recaptcha_site_key');
    $bypassRecaptcha = config('google_captcha.bypass_recaptcha');
    return Inertia::render('Auth/Login', [
      'canResetPassword' => Route::has('password.request'),
      'status' => session('status'),
      'recaptchaSiteKey' => $siteKey,
      'bypassRecaptcha' => $bypassRecaptcha,
    ]);
  }

  /**
   * Handle an incoming authentication request.
   */
  public function store(LoginRequest $request): RedirectResponse
  {
    $request->authenticate();

    $request->session()->regenerate();

    return redirect()->intended(route('dashboard', absolute: false));
  }

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request): RedirectResponse
  {
    // remove session id from push notification table
    $currentSessionId = session()->getId();
    $pushNotification = new PushNotification();
    $pushNotification->where('session_id', '=', $currentSessionId)->delete();

    Auth::guard('web')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect()->route('login');
  }
}
