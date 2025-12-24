<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Expense extends Model
{
  use Searchable;

  protected $table = 'expenses';
  protected $fillable = [
    'type',
    'description',
    'amount'
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
      'type' => $this->type,
      'description' => $this->description,
    ];
  }
}
