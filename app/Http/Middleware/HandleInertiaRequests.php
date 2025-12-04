<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   */
  public function version(Request $request): string|null
  {
    return parent::version($request);
  }

  /**
   * Check if the given URL belongs to the current domain.
   */
  protected function isUrlFromSameDomain(string $url): bool
  {
    $previousUrlHost = parse_url($url, PHP_URL_HOST);
    $currentUrlHost = parse_url(config('app.url'), PHP_URL_HOST);

    return $previousUrlHost === $currentUrlHost;
  }

  /**
   * Get the validated previous URL.
   */
  protected function getValidPreviousUrl(): ?string
  {
    $previousUrl = url()->previous();

    if (
      // $previousUrl !== route('login') &&
      $previousUrl !== '' &&
      $previousUrl !== url()->current()
      // && $this->isUrlFromSameDomain($previousUrl)
    ) {
      return $previousUrl;
    }

    return null;
  }

  /**
   * Define the props that are shared by default.
   *
   * @return array<string, mixed>
   */
  public function share(Request $request): array
  {
    return [
      ...parent::share($request),
      'auth' => [
        'user' => $request->user(),
        'can' => $request->user()?->loadMissing('roles.permissions')
          ->roles->flatMap(function ($role) {
            return $role->permissions;
          })->map(function ($permission) use ($request) {
            return [$permission['name'] => $request->user()->can($permission['name'])];
          })->collapse()->all(),
      ],
      'ziggy' => fn() => [
        ...(new Ziggy)->toArray(),
        'location' => $request->url(),
        'urlPrevious' => fn() => $this->getValidPreviousUrl(),
      ],
      'flash' => [
        'success' => fn() => $request->session()->get('success'),
        'warning' => fn() => $request->session()->get('warning'),
        'error' => fn() => $request->session()->get('error'),
        'info' => fn() => $request->session()->get('info'),
      ],
      'PUSH_NOTIFICATION_PUBLIC_KEY' => env('PUSH_NOTIFICATION_PUBLIC_KEY'),
    ];
  }
}
