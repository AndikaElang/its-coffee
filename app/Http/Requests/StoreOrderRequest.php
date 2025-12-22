<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOrderRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'order_date' => ['required', Rule::date()->format('Y-m-d')],
      'buyer_type' => ['required', Rule::in(['NON-IT', 'IT'])],
      'buyer_name' => ['required', 'string'],
      'menu_id' => ['required', 'numeric'],
      'qty' => ['required', 'integer'],
      'price' => ['required', 'numeric'],
      'discount' => ['nullable', 'numeric'],
      'extra_cup' => ['required', 'boolean'],
      'payment_type' => ['required', Rule::in(['Cash', 'QRIS', 'Transfer'])],
      'is_paid' => ['required', 'boolean']
    ];
  }
}
