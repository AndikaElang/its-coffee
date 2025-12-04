<?php

use App\Http\Controllers\Auth\AuthLoginSessionController;
use App\Http\Controllers\Auth\AuthRegisterController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RecaptchaController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

// Route::middleware('guest')->group(function () {
//   Route::get('login', [AuthLoginSessionController::class, 'create'])->name('login');
//   Route::post('login', [AuthLoginSessionController::class, 'store'])->middleware('throttle:25,1');

//   Route::get('register', [AuthRegisterController::class, 'create'])->name('register');
//   Route::post('register', [AuthRegisterController::class, 'store'])->middleware('throttle:25,1');

//   Route::post('validate-recaptcha', [RecaptchaController::class, 'validate'])->name('recaptcha.validate');

//   Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
//   Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
//     ->name('password.email')
//     ->middleware('throttle:25,1');

//   Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
//   Route::post('reset-password', [NewPasswordController::class, 'store'])
//     ->name('password.store')
//     ->middleware('throttle:25,1');
// });

// Route::middleware('auth')->group(function () {
//   Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');

//   Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
//     ->middleware(['signed', 'throttle:25,1'])
//     ->name('verification.verify');

//   Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
//     ->middleware('throttle:25,1')
//     ->name('verification.send');

//   Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');

//   Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

//   Route::put('password', [PasswordController::class, 'update'])->name('password.update');

//   Route::post('logout', [AuthLoginSessionController::class, 'destroy'])->name('logout');
// });
