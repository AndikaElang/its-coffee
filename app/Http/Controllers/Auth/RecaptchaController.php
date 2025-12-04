<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RecaptchaController extends Controller
{
  /**
   * Validate request containing recaptcha token.
   */
  public function validate(Request $request)
  {
    $request->validate([
      'g_recaptcha_response' => 'required|string',
    ]);

    try {
      $curl = curl_init();
      curl_setopt_array($curl, [
        CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify',
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => [
          'secret' => config('google_captcha.recaptcha_secret_key'),
          'response' => $request->input('g_recaptcha_response'),
        ],
        CURLOPT_RETURNTRANSFER => true,
      ]);

      $response = curl_exec($curl);
      curl_close($curl);

      $response = json_decode($response);

      $message = '';
      if (!$response->success) {
        foreach ($response->{'error-codes'} as $error_code) {
          $message .= config("google_captcha.recaptcha_error_codes.$error_code") . ' ';
        }
      } else {
        $message = 'Recaptcha validation success';
      }

      return response()->json([
        'success' => $response->success,
        'message' => $message,
      ]);
    } catch (\Throwable $th) {
      return response()->json([
        'success' => false,
        'message' => $th->getMessage(),
      ]);
    }
  }
}
