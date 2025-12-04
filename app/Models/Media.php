<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
  // protected $connection = 'pgsql';
  // point Eloquent at the existing table
  protected $table = 'media';

  // allow mass‐assignment if needed
  protected $guarded = [];

  // if you’re storing any JSON in custom_properties
  protected $casts = [
    'custom_properties' => 'array',
  ];

  /**
   * Build the public URL for this file.
   */
  public function getUrlAttribute(): string
  {
    // assume your files are stored under "{model_id}/{file_name}"
    $path = "{$this->id}/{$this->file_name}";

    // pick the right disk (e.g. 'public', 's3', 'minio', etc)
    return Storage::disk($this->disk)->url($path);
  }
}
