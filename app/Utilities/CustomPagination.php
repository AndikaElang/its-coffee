<?php

namespace App\Utilities;

use Illuminate\Support\Collection;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;

class CustomPagination
{
  public function paginate(Collection $datas, int $perPage = 15, $page = null, $getValues = true)
  {
    $pageName = 'page';
    $page = $page ?: (Paginator::resolveCurrentPage($pageName) ?: 1);
    $datas = $datas instanceof Collection ? $datas : Collection::make($datas);

    return new LengthAwarePaginator(
      $getValues
      ? $datas->forPage($page, $perPage)->values()
      : $datas->forPage($page, $perPage),
      $datas->count(),
      $perPage,
      $page,
      [
        'path' => Paginator::resolveCurrentPath(),
        'pageName' => $pageName,
      ]
    );
  }
}
