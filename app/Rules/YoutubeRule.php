<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class YoutubeRule implements ValidationRule
{
  /**
   * Run the validation rule.
   */
  public function validate(string $attribute, mixed $value, Closure $fail): void
  {
    if (!is_string($value) || !filter_var($value, FILTER_VALIDATE_URL)) {
      $fail('The :attribute must be a valid URL.');
      return;
    }

    if (!$this->isValidYoutubeEmbedUrl($value)) {
      $fail('The :attribute must be a valid YouTube embed URL.');
    }
  }

  protected function isValidYoutubeEmbedUrl(string $url): bool
  {
    $pattern = '/^https?:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/';
    return preg_match($pattern, $url) === 1;
  }
}
