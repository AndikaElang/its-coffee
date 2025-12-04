import SkeletonCard from '@/components/Card/SkeletonCard';
import { Pagination } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useIsRouterStart from '@/hooks/use-is-router-start';
import { router } from '@inertiajs/react';
import { SimpleGrid, StyleProp } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ContentLayout from './ContentLayout';

export default function Page({
  breadCrumb,
  title,
  data,
  currentPage,
  pageRoute,
  perPage,
  total,
  params,
  gridCols = { base: 1, md: 2, lg: 3, xl: 4 },
  withSearch = false,
  searchKeyword = '',
}: {
  breadCrumb: React.ReactNode;
  title: string;
  data: React.ReactNode;
  perPage: number;
  total: number;
  currentPage: number;
  pageRoute: string;
  params?: Record<string, any>;
  gridCols?: StyleProp<number>;
  withSearch?: boolean;
  searchKeyword?: string;
}) {
  const { t } = useTranslation();
  const isLoading = useIsRouterStart();
  const skeletonCount = total > perPage ? perPage : total;
  const skeletonData = Array.from({ length: skeletonCount }, () => <SkeletonCard key={Math.random()} />);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
    easing: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2), // easeInOutQuint
  });

  const [keyword, setkeyword] = useState(searchKeyword);

  const clearSearch = () => {
    setkeyword('');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.get(route(pageRoute), { s: keyword.trim() });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <ContentLayout title={title} breadCrumb={breadCrumb}>
      {withSearch && (
        // Search Bar
        <div className="relative mb-12">
          <div className="flex w-full items-center gap-2">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
            <Input
              value={keyword}
              type="text"
              onChange={(e) => setkeyword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t('search.keyword', { ns: 'search' })}
              className="bg-transparent outline-none text-gray-700 placeholder-gray-500 pl-10 pr-3 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent"
            />
            {searchKeyword && (
              <Button onClick={clearSearch} className="hover:bg-gray-200 transition-colors" variant={'outline'}>
                <X className="w-4 h-4 text-orange-500" />
              </Button>
            )}
          </div>
        </div>
      )}

      <SimpleGrid cols={gridCols} spacing={'xl'} mb={'xl'} ref={targetRef}>
        {isLoading ? skeletonData : data}
      </SimpleGrid>

      <Pagination
        itemsPerPage={perPage}
        totalItems={total}
        currentPage={currentPage}
        pageRoute={pageRoute}
        onPageChange={() => scrollIntoView()}
        params={params}
      />
    </ContentLayout>
  );
}
