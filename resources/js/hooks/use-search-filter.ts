import { router } from '@inertiajs/react';
import { useDebouncedCallback } from '@mantine/hooks';
import { DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';

type SearchFilerProps<T> = {
  isFetching: boolean;
  search: string;
  setSearch: (e: string) => void;
  doSearch: (q?: string) => void;
  onSearch: (e: string) => void;
  onPageChange: (e: number) => void;
  onRecordsPerPage: (e: number) => void;
  onQueryTable: (queryKey: string, queryValue: string | null) => void;
  sortStatus: DataTableSortStatus<T>;
  onSortStatus: (e: DataTableSortStatus<T>) => void;
};

export default function useSearchFilter<T>(
  endpoint: string,
  defaultColumnSort = 'updated_at',
  context?: string, // Add context parameter
): SearchFilerProps<T> {
  const prefix = context ? `${context}_` : ''; // Create prefix

  const [search, setSearch] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<T>>({
    columnAccessor: defaultColumnSort,
    direction: 'desc',
  });

  router.on('start', () => setIsFetching(() => true));
  router.on('finish', () => setIsFetching(() => false));

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setSearch(queryParams.get(`${prefix}search`) ?? ''); // Use prefixed param

    // Set sort status based on query params
    const sort = queryParams.get(`${prefix}sort`); // Use prefixed param
    if (sort) {
      const direction = sort.startsWith('-') ? 'desc' : 'asc';
      const columnAccessor = sort.replace('-', '');
      setSortStatus({ columnAccessor, direction });
    } else {
      // default sort
      setSortStatus({ columnAccessor: defaultColumnSort, direction: 'desc' });
    }
  }, [prefix]);

  const onQueryTable = (queryKey: string, queryValue: string | null) => {
    const queryParams = new URLSearchParams(window.location.search);
    const prefixedKey = `${prefix}${queryKey}`; // Prefix the query key

    if (queryValue === null) queryParams.delete(prefixedKey);
    else queryParams.set(prefixedKey, queryValue.toString());

    if (queryKey === 'per_page') queryParams.set(`${prefix}page`, '1'); // Prefix page reset

    const payload = Object.fromEntries(queryParams);
    router.get(route(endpoint), payload, { preserveState: true, preserveScroll: true });
  };

  const onSortStatus = ({ columnAccessor, direction }: DataTableSortStatus<T>) => {
    onQueryTable('sort', direction === 'asc' ? String(columnAccessor) : `-${String(columnAccessor)}`);
    setSortStatus(() => ({ columnAccessor, direction }));
  };

  const doSearch = (q?: string) => {
    setSearch(() => q ?? search);
    onQueryTable('search', q ?? search);
  };

  const debouncedCallback = useDebouncedCallback(({ search }) => {
    doSearch();
  }, 500);

  const onSearch = (search: string) => {
    setSearch(() => search);
    debouncedCallback({ search });
  };

  const onPageChange = (page: number) => {
    onQueryTable('page', page.toString());
  };

  const onRecordsPerPage = (page: number) => {
    onQueryTable('per_page', page.toString());
  };

  return {
    isFetching,
    search,
    setSearch,
    doSearch,
    onSearch,
    sortStatus,
    onSortStatus,
    onPageChange,
    onRecordsPerPage,
    onQueryTable,
  };
}
