<?php

namespace App\Services;

use Carbon\Carbon;

class ParticipantNumberGenerator
{
  /**
   * Generate a single YYMM-RAND6 code, mixing in a microsecond-based salt.
   */
  public static function generate(): string
  {
    // 1. Prefix is year/month, two digits each:
    $prefix = Carbon::now()->format('ym');  // e.g. "2505" for May 2025

    // 2. Use the current microsecond timestamp as a seed:
    $micro = intval((microtime(true) - floor(microtime(true))) * 1_000_000);

    // 3. Generate 3 letters: pick from A–Z, deterministic on seed & random:
    $letters = '';
    for ($i = 0; $i < 3; $i++) {
      // mix random_int with micro to shift entropy
      $idx = (random_int(0, 25) + ($micro >> ($i * 2))) % 26;
      $letters .= chr(65 + $idx);
    }

    // 4. Generate 3 digits similarly:
    $digits = '';
    for ($i = 0; $i < 3; $i++) {
      $idx = (random_int(0, 9) + ($micro >> ($i * 3))) % 10;
      $digits .= (string) $idx;
    }

    return "{$prefix}-{$letters}{$digits}";
  }
}
