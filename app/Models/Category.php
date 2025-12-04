<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  protected $connection = 'pgsql_website';
  protected $table = 'kategoris';

  public function getAllCategories(): object
  {
    return $this->orderBy('kategori', 'asc')->get();
  }

  public function findCategoryById($id): object
  {
    return $this->where('id', $id)->first();
  }
}
