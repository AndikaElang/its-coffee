'use client';

import { Button } from '@/components/ui/button';
import useIsRouterStart from '@/hooks/use-is-router-start';
import { Link } from '@inertiajs/react';
import { Box, Loader } from '@mantine/core';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PaginationProps {
  pageRoute?: string;
  totalItems: number;
  itemsPerPage: number;
  currentPage?: number;
  keyword?: string;
  params?: Record<string, any>;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  pageRoute = '',
  totalItems,
  itemsPerPage,
  currentPage = 1,
  keyword = '',
  params,
  onPageChange = () => {},
}: PaginationProps) {
  const isLoading = useIsRouterStart();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [loadingFor, setLoadingFor] = useState('');

  useEffect(() => {
    if (!isLoading) {
      // reset loading for after loading is done
      setLoadingFor('');
    }
  }, [isLoading]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show a subset of pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle
        pages.push(1);
        pages.push('ellipsis');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      <Link
        href={
          currentPage === 1
            ? '#'
            : route(pageRoute, {
                _query: {
                  ...(keyword && { keyword: keyword }),
                  page: currentPage - 1,
                  per_page: itemsPerPage,
                  ...params,
                },
              })
        }
        onClick={() => setLoadingFor('<')}
      >
        <Button variant="outline" size="icon" disabled={currentPage === 1 || loadingFor === '<'}>
          {loadingFor === '<' ? (
            <Loader size={'sm'} />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </>
          )}
        </Button>
      </Link>

      {pageNumbers.map((page, index) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2">
            ...
          </span>
        ) : (
          <Box pos={'relative'} key={`page-${page}`}>
            <Link
              href={route(pageRoute, {
                _query: {
                  ...(keyword && { keyword: keyword }),
                  page: page,
                  per_page: itemsPerPage,
                  ...params,
                },
              })}
              onClick={() => setLoadingFor(page as string)}
            >
              <Button
                key={`page-${page}`}
                variant={currentPage === page ? 'default' : 'outline'}
                size="icon"
                className="w-9 h-9"
                disabled={loadingFor === (page as string)}
              >
                {loadingFor === page ? <Loader size={'sm'} /> : page}
              </Button>
            </Link>
          </Box>
        ),
      )}

      <Link
        href={
          currentPage === totalPages
            ? '#'
            : route(pageRoute, {
                _query: {
                  ...(keyword && { keyword: keyword }),
                  page: currentPage + 1,
                  per_page: itemsPerPage,
                  ...params,
                },
              })
        }
        onClick={() => setLoadingFor('>')}
      >
        <Button variant="outline" size="icon" disabled={currentPage === totalPages || loadingFor === '>'}>
          {loadingFor === '>' ? (
            <Loader size={'sm'} />
          ) : (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </>
          )}
        </Button>
      </Link>
    </div>
  );
}
