<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;

use Illuminate\Support\Facades\DB;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements HasMedia, MustVerifyEmail, JWTSubject
{
  use HasFactory, Notifiable, Searchable, InteractsWithMedia, HasRoles;

  protected $connection = 'pgsql';

  public $asYouType = true;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'username',
    'email',
    'password',
    'avatar',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be appended.
   *
   * @return array<string, string>
   */
  protected $appends = ['role'];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  /**
   * Prepare the user instance for indexing in search.
   *
   * @return array
   */
  public function toSearchableArray()
  {
    return [
      'id' => $this->id,
      'username' => $this->username,
      'email' => $this->email,
      'name' => $this->name,
    ];
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('avatars')
      ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg'])
      ->singleFile();
  }

  /**
   * Get the avatar attribute.
   *
   * This accessor function returns the asset URL for the avatar.
   *
   * @param  string|null  $avatar
   * @return string
   */
  public function getAvatarAttribute(): string
  {
    return $this->getFirstMediaUrl('avatars');
  }

  /**
   * Scope a query to only include authors.
   *
   * @param Builder $query
   * @return Builder
   */
  public function scopeAuthors(Builder $query): Builder
  {
    return $query;
  }

  /**
   * Get the identifier that will be stored in the subject claim of the JWT.
   *
   * @return mixed
   */
  public function getJWTIdentifier()
  {
    return $this->getKey();
  }

  /**
   * Return a key value array, containing any custom claims to be added to the JWT.
   *
   * @return array
   */
  public function getJWTCustomClaims()
  {
    return [];
  }

  /**
   * Get the role attribute.
   *
   * This accessor function returns the user role.
   *
   * @param  string|null
   * @return string|null
   */
  public function getRoleAttribute(): ?string
  {
    return optional($this->roles->first())->name;
  }

  public function totalUserPatient()
  {
    return DB::connection('pgsql_pasien')->table('users')->count();
  }
}
