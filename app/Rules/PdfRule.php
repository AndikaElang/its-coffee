<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

class PdfRule implements ValidationRule
{
  protected $allowedExtensions = ['pdf'];

  /**
   * Run the validation rule.
   */
  public function validate(string $attribute, mixed $value, Closure $fail): void
  {
    if ($value instanceof UploadedFile) {
      if (!$this->passesFile($value)) {
        $fail('The :attribute must be a pdf file (PDF).');
      }
    } elseif (is_string($value) && filter_var($value, FILTER_VALIDATE_URL)) {
      if (!$this->passesUrl($value)) {
        $fail('The :attribute must be a valid URL pointing to a pdf.');
      }
    } else {
      $fail('The :attribute must be a pdf file or a valid URL pointing to a pdf.');
    }
  }

  protected function passesFile(UploadedFile $file)
  {
    $extension = strtolower($file->getClientOriginalExtension());
    return in_array($extension, $this->allowedExtensions);
  }

  protected function passesUrl($url)
  {
    $url = parse_url($url);
    if (isset($url['path'])) {
      $extension = pathinfo($url['path'], PATHINFO_EXTENSION);
      return in_array(strtolower($extension), $this->allowedExtensions);
    }
    return false;
  }
}
