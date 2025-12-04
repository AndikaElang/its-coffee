<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Doctor extends Model implements HasMedia
{
  use InteractsWithMedia, Searchable;
  protected $connection = 'pgsql_website';
  protected $table = 'dokter';
  protected $fillable = [
    'status_dokter',
    'nip',
    'nama_dokter',
    'path_foto_dokter',
    'spesialis_id',
    'pendidikan_dokter',
    'penghargaan_dokter',
    'keanggotaan_dokter',
    'penelitian_dokter',
    'kompetensi_dokter',
    'headline_dokter',
  ];

  /**
   * Prepare instance for indexing in search.
   *
   * @return array
   */
  public function toSearchableArray()
  {
    return [
      'id' => $this->id,
      'nama_dokter' => $this->nama_dokter,
      'nip' => $this->nip,
      'nama_spesialisasi' => '',
    ];
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('path_foto_dokter')
      ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg'])
      ->singleFile();
  }

  /**
   * Get the media attribute.
   *
   * This accessor function returns the asset URL for the media
   */
  public function getPathFotoDokterAttribute(): string
  {
    return $this->getFirstMediaUrl('path_foto_dokter');
  }

  public function specialist(): object
  {
    return $this->belongsTo(Specialist::class, 'spesialis_id');
  }

  public function getRandomDoctors($limit = 6): object
  {
    return $this->inRandomOrder()
      ->where('status_dokter', true)
      ->with('specialist')
      ->limit($limit)
      ->get();
  }

  public function getDoctorsBySpecialist($id): object
  {
    return $this->inRandomOrder()
      ->select('dokter.*', 'spesialis.nama_spesialisasi')
      ->join('spesialis', 'spesialis.id', '=', 'dokter.spesialis_id')
      ->where('id_api', $id)
      ->where('status_dokter', true)
      ->with('specialist')
      ->get();
  }
}
