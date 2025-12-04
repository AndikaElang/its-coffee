<?php

namespace App\Utilities;

class PriceFormatter
{
  public static function formatPrice($value)
  {
    // Handle null or empty
    if (is_null($value) || strtolower(trim($value)) === 'null' || trim($value) === '') {
      return 'Gratis';
    }

    // Handle text-based "Gratis"
    if (strtolower(trim($value)) === 'gratis') {
      return 'Gratis';
    }

    // Handle complex text like "Mahasiswa: Rp 75.000,- | Umum: Rp 100.000,-"
    if (preg_match('/[A-Za-z]/', $value) && str_contains($value, ':')) {
      return $value; // leave it as-is
    }

    // Handle numbers with or without dots
    $cleanValue = preg_replace('/[^0-9]/', '', $value);

    if ($cleanValue == 0) {
      return 'Gratis';
    }

    // Format number to Indonesian currency
    return 'Rp ' . number_format((int) $cleanValue, 0, ',', '.');
  }
}
