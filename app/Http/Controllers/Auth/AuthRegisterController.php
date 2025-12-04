<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\userRegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AuthRegisterController extends Controller
{
  /**
   * Display the registration view.
   */
  public function create(): Response
  {
    $siteKey = config('google_captcha.recaptcha_site_key');
    $bypassRecaptcha = config('google_captcha.bypass_recaptcha');
    return Inertia::render(
      'Auth/Register',
      [
        'recaptchaSiteKey' => $siteKey,
        'bypassRecaptcha' => $bypassRecaptcha,
      ],
    );
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(userRegisterRequest $request): RedirectResponse
  {
    $validatedData = $request->validated();

    $user = User::create([
      'name' => $validatedData['name'],
      'email' => $validatedData['email'],
      'password' => Hash::make($validatedData['password']),
    ]);
    $user->assignRole('User');

    event(new Registered($user));
    Auth::login($user);

    return redirect(route('dashboard', absolute: false));
  }
}
