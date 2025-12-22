<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
  protected $table = 'menus';
  protected $fillable = [
    'name',
    'base_price',
    'it_price',
    'deposit',
    'is_available'
  ];

  public function items()
  {
    return $this->hasMany(OrderItem::class);
  }
}
