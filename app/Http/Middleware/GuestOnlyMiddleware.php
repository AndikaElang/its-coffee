<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class GuestOnlyMiddleware
{
  /**
   * The callback that should be used to generate the authentication redirect path.
   *
   * @var callable|null
   */
  protected static $redirectToCallback;

  /**
   * Handle an incoming request.
   *
   */
  public function handle(Request $request, Closure $next)
  {
    // Get the guards
    // What is $guards? check this url https://laravel.com/docs/11.x/authentication#introduction
    $guards = empty($guards) ? [null] : $guards;

    // Loop through the guards
    foreach ($guards as $guard) {
      // Check if the user is authenticated
      if (Auth::guard($guard)->check()) {
        // If authenticated, redirect to the redirectTo method
        return redirect($this->redirectTo($request));
      }
    }

    return $next($request);
  }

  protected function redirectTo(Request $request): ?string
  {
    return static::$redirectToCallback
      ? call_user_func(static::$redirectToCallback, $request)
      : $this->defaultRedirectUri();
  }

  protected function defaultRedirectUri(): string
  {
    // Check if route with name 'dashboard' exists
    if (Route::has('dashboard')) {
      // if exists, return the route with name 'dashboard'
      return route('dashboard');
    }

    // if all fails, return '/'
    return '/';
  }
}
