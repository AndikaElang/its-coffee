<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Illuminate\Http\Request;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register(): void
  {
    //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    // mixed case with numbers
    Password::defaults(function () {
      return Password::min(8)->mixedCase()->numbers();
    });

    VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
      return (new MailMessage)
        ->subject('Verifikasi Email')
        ->markdown('vendor.mail.email-verification', ['url' => $url]);
    });

    RateLimiter::for('find-doctor', function (Request $request) {
      return Limit::perMinutes(3, 1000)->by($request->ip());
    });

    RateLimiter::for('internal-api', function (Request $request) {
      return Limit::perMinutes(3, 1000)->by($request->ip());
    });

    RateLimiter::for('indikator-mutu', function (Request $request) {
      return Limit::perMinute(100)->by($request->ip());
    });

    RateLimiter::for('uji-validasi-alkes', function (Request $request) {
      return Limit::perMinute(100)->by($request->ip());
    });
  }
}
