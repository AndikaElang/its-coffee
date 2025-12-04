<?php


namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
  /**
   * Custom exception rendering.
   *
   * @return void
   */
  public function register()
  {
    // Handle 404
    $this->renderable(function (NotFoundHttpException $e, $request) {
      if ($request->wantsJson()) {
        return response()->json(['message' => 'Not Found'], 404);
      }

      return Inertia::render('Errors/404')->toResponse($request)->setStatusCode(404);
    });

    // Handle 500 (and others)
    $this->renderable(function (Throwable $e, $request) {
      if (!config('app.debug')) {
        \Log::error('Server Error: ' . $e->getMessage(), ['exception' => $e]);
        if ($request->wantsJson()) {
          return response()->json(['message' => 'Server Error'], 500);
        }

        return Inertia::render('Errors/500')->toResponse($request)->setStatusCode(500);
      }
    });
  }
}
