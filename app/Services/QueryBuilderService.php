<?php

namespace App\Services;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class QueryBuilderService
{
  protected $search;
  protected $per_page;
  protected $query;
  protected $userId;

  public function __construct(Request $request)
  {
    // Initialize search, per_page, query, and userId from the request
    $this->search = $request->query('search');
    $this->per_page = $request->query('per_page', 15); // Default to 15 items per page
    $this->query = $request->query();
    $this->userId = $request->user()?->id;
  }

  /**
   * Build and execute a query based on the provided model and options.
   *
   * @param Request $request
   * @param Model $model
   * @param array $options
   * @return QueryBuilder
   */
  public function buildQuery(Model $model, ?array $options): QueryBuilder
  {
    // Extract allowed sorts, conditions, and eager loaders from options
    $allowedSorts = $options['allowedSorts'] ?? [];
    $conditions = $options['conditions'] ?? [];
    $allowedFields = $options['allowedFields'] ?? [];
    $allowedIncludes = $options['allowedIncludes'] ?? [];
    $allowedFilters = $options['allowedFilters'] ?? [];
    $eagerLoaders = $options['eagerLoaders'] ?? [];
    $searchJoins = $options['searchJoins'] ?? []; // Multiple joins can be defined here

    // Initialize the query builder
    $baseQuery = $model::query();

    // Apply joins for search if needed - can handle multiple joins
    if (!empty($searchJoins) && $this->search) {
      foreach ($searchJoins as $join) {
        $joinType = $join['type'] ?? 'join'; // Default to inner join, but allow left, right joins

        if ($joinType === 'left') {
          $baseQuery->leftJoin(
            $join['table'],
            $join['first'],
            $join['operator'] ?? '=',
            $join['second']
          );
        } else if ($joinType === 'right') {
          $baseQuery->rightJoin(
            $join['table'],
            $join['first'],
            $join['operator'] ?? '=',
            $join['second']
          );
        } else {
          $baseQuery->join(
            $join['table'],
            $join['first'],
            $join['operator'] ?? '=',
            $join['second']
          );
        }

        // You can also add where clauses for the joined table if needed
        if (isset($join['where'])) {
          $baseQuery->where($join['where']);
        }
      }
    }

    // Perform search with the modified query if search term is provided
    if ($this->search) {
      // If using a custom search with joins
      $baseQuery->where(function ($query) use ($model, $searchJoins, $options) {
        // Search in main table fields
        $searchFields = $options['searchFields'] ?? ["*"];

        foreach ($searchFields as $field) {
          $query->orWhere($model->getTable() . '.' . $field, 'ILIKE', "%{$this->search}%");
        }

        // Search in all joined table fields
        if (!empty($searchJoins)) {
          foreach ($searchJoins as $join) {
            if (isset($join['searchFields'])) {
              foreach ($join['searchFields'] as $field) {
                $query->orWhere($join['table'] . '.' . $field, 'ILIKE', "%{$this->search}%");
              }
            }
          }
        }
      });

      // Get IDs from the search result to use in the main query
      $searchIds = $baseQuery->select($model->getTable() . '.id')->distinct()->pluck('id');
    } else {
      $searchIds = [];
    }

    // Initialize the query builder for the model with all the filters
    $queryBuilder = QueryBuilder::for($model::class)
      ->allowedSorts($allowedSorts)
      ->allowedFields($allowedFields)
      ->allowedIncludes($allowedIncludes)
      ->allowedFilters($allowedFilters)
      ->when($this->search, fn($query) => $query->whereIn($model->getTable() . '.id', $searchIds))
      ->when(filled($conditions), function (Builder $query) use ($conditions) {
        collect($conditions)->each(function ($condition) use ($query) {
          if (method_exists($query, $condition['method'])) {
            $query->{$condition['method']}(...$condition['parameters']);
          } else {
            throw new \InvalidArgumentException("Method {$condition['method']} not found.");
          }
        });
      });

    // Apply eager loading if any eager loaders are provided
    if (filled($eagerLoaders)) {
      collect($eagerLoaders)->each(function ($loader) use ($queryBuilder) {
        return $queryBuilder->with($loader);
      });
    }

    return $queryBuilder;
  }


  /**
   * Paginate a query based on the provided query builder.
   *
   * @param QueryBuilder $queryBuilder
   * @return LengthAwarePaginator
   */
  public function paginateQuery(QueryBuilder $queryBuilder, $per_page = 0): LengthAwarePaginator
  {
    return $queryBuilder->paginate($per_page ?? $this->per_page)->appends($this->query);
  }

  /**
   * Query a model with pagination based on the provided options.
   *
   * @param Request $request
   * @param Model $model
   * @param array $options
   * @return LengthAwarePaginator
   */
  public function queryWithPagination(Model $model, ?array $options): LengthAwarePaginator
  {
    // Build the query
    $queryBuilder = $this->buildQuery($model, $options);

    // Paginate the query
    return $queryBuilder->paginate($this->per_page)->appends($this->query);
  }
}
