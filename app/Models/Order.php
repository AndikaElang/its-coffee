<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Order extends Model
{
  use Searchable;

  protected $table = 'orders';
  protected $fillable = [
    'order_date',
    'buyer_name',
    'buyer_type',
    'payment_type',
    'is_paid',
    'extra_cup',
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
      'order_date' => $this->order_date,
      'buyer_name' => $this->buyer_name,
      'buyer_type' => $this->buyer_type,
      'name' => '',
    ];
  }

  public function items()
  {
    return $this->hasMany(OrderItem::class);
  }
}
