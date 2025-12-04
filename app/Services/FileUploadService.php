<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FileUploadService
{
  /**
   * Handle avatar upload and deletion.
   *
   * @param Request $request
   * @return void
   */
  public function uploadAvatar(Request $request, User $user): void
  {
    if ($request->hasFile('avatar')) {
      $randomPrefix = Str::random(32);
      $originalFileName = $request->file('avatar')->getClientOriginalName();
      $newFileName = $randomPrefix . '_' . $originalFileName;

      $user->addMediaFromRequest('avatar')->usingFileName($newFileName)->toMediaCollection('avatars');
    } elseif (blank($user->avatar)) {
      optional($user->getFirstMedia('avatars'))->delete();
    }
  }

  /**
   * Handle Media upload and deletion.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Illuminate\Database\Eloquent\Model  $model
   * @param  string  $field
   * @return void
   */
  public function uploadGenericFromReq(Request $request, Model $model, $field): void
  {
    $input = $request->input($field);

    // Skip processing if the input is a string (e.g. existing URL or path)
    if (is_string($input)) {
      return;
    }

    // normalize to array
    if ($request->hasFile($field)) {
      // delete if previous file exist
      $this->deleteGeneric($model, $field);

      // modify file name
      $randomPrefix = Str::random(32);
      $originalFileName = $request->file($field)->getClientOriginalName();
      $newFileName = $randomPrefix . '_' . $originalFileName;

      // add the new file
      $model->addMediaFromRequest($field)->usingFileName($newFileName)->toMediaCollection($field);
    } elseif (empty($request->query($field))) {
      optional($model->getFirstMedia($field))->delete();
    }
  }

  /**
   * Handle Media upload and deletion.
   *
   * @param  \Illuminate\Database\Eloquent\Model  $model
   * @param  string  $field
   * @return void
   */
  public function uploadGenericFile($input, Model $model, $field): void
  {
    // Skip processing if the input is a string (e.g. existing URL or path)
    if (is_string($input)) {
      return;
    }

    // normalize to array
    if (is_file($input)) {
      // delete if previous file exist
      $this->deleteGeneric($model, $field);

      // modify file name
      $randomPrefix = Str::random(32);
      $originalFileName = $input->getClientOriginalName();
      $newFileName = $randomPrefix . '_' . $originalFileName;

      // add the new file
      $model->addMedia($input)->usingFileName($newFileName)->toMediaCollection($field);
    } elseif (empty($input)) {
      optional($model->getFirstMedia($field))->delete();
    }
  }


  public function uploadFromURL($input, Model $model, $field): void
  {
    if (is_string($input)) {
      $this->deleteGeneric($model, $field);
      $model->addMediaFromUrl($input)->toMediaCollection($field);
    }
  }

  public function deleteGeneric(Model $model, $field): void
  {
    // check if previously set
    if ($model->hasMedia($field)) {
      // delete the previous file
      optional($model->getFirstMedia($field))->delete();
    }
  }
}
