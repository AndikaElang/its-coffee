'use client';

import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import AppMeta from '@/components/Meta/AppMeta';
import { NotifyError } from '@/components/Notifications/Notify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { BaseAPIResponse } from '@/types/api';
import { SearchAll, paginatedData } from '@/types/models';
import { ViewSearchPage } from '@/types/page-params';
import { Link, router } from '@inertiajs/react';
import { Center, Divider, Group, Loader } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronRight, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function SectionHeader({ title, showSeeAll = true }: { title: string; showSeeAll?: boolean }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl font-bold text-[#25455E]">{title}</h2>
      {/* Show see all at the end of title row */}
      {/* {showSeeAll && (
        <button className="text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm font-medium">
          Lihat semua
          <ChevronRight className="w-4 h-4" />
        </button>
      )} */}
    </div>
  );
}

function SearchResultItem({ item }: { item: SearchAll }) {
  return (
    <Link
      href={`/${item.url}/${item.slug}`} // adjust to your route
      as="div"
      className="group rounded-lg p-4 mb-2 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-xl font-semibold text-[#25455E] mb-2 transition-colors truncate group-hover:text-[#0072BC] group-hover:underline">
            {item.judul}
          </h3>
          <p
            className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-1"
            dangerouslySetInnerHTML={{ __html: item.deskripsi ?? '' }}
          />
        </div>
        <ChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
      </div>

      <Divider size="md" />
    </Link>
  );
}

function SearchResultSection({
  headerTitle,
  items,
  keyword,
  category,
}: {
  headerTitle: string;
  items: SearchAll[];
  keyword: string;
  category: string;
}) {
  const [dataPagination, setDataPagination] = useState<paginatedData<SearchAll>>();
  const [data, setData] = useState<SearchAll[]>(items);
  const [page, setPage] = useState(1);
  const [infiniteMode, setInfiniteMode] = useState(false); // switch after first load
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const hasMore = (dataPagination?.current_page ?? 0) < (dataPagination?.last_page ?? 0);

  const mutation = useMutation({
    mutationFn: async (page: number) => {
      const req = await axios.post<BaseAPIResponse<paginatedData<SearchAll>>>(route('search.scroll'), {
        category,
        keyword,
        page,
      });
      return req.data;
    },
    onSuccess: (res) => {
      const { success, data, message } = res;

      if (success && data) {
        setDataPagination(data);
        setData((prevData) => [...prevData, ...data.data]);
      } else {
        NotifyError('Gagal mengambil data. Silakan coba lagi.');
        console.error('Error fetching data:', message);
      }
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
      NotifyError('Terjadi kesalahan saat mengambil data. Silakan coba lagi.');
    },
  });

  // Observe bottom sentinel for infinite scroll
  useEffect(() => {
    if (!infiniteMode || !loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!hasMore) return;
        if (entries[0].isIntersecting && hasMore && !mutation.isPending) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, hasMore, mutation.isPending, infiniteMode]);

  // Fetch data when page changes
  useEffect(() => {
    if (page > 1) {
      mutation.mutate(page);
    }
  }, [page]);

  return (
    <section className="mb-12">
      <SectionHeader title={headerTitle} />
      <div className="rounded-lg shadow-xl-all py-3 max-h-[750px] overflow-y-auto">
        <div>
          {data.map((item, index) => (
            <SearchResultItem key={index} item={item} />
          ))}
        </div>

        {/* Initial manual "load more" button */}
        {!infiniteMode && items.length >= 5 && (
          <Center>
            <p
              onClick={() => {
                setInfiniteMode(true);
                setPage((prev) => prev + 1); // load first extra page
              }}
              className="cursor-pointer text-[#0072BC] hover:text-[#25455E] hover:underline transition-colors flex items-center gap-1 mx-auto text-md font-medium"
            >
              Muat lebih banyak {headerTitle.toLocaleLowerCase()}
              <ChevronRight className="w-4 h-4 text-orange-500" />
            </p>
          </Center>
        )}

        {/* Infinite scroll sentinel */}
        {infiniteMode && (
          <div ref={loaderRef} className="h-10 flex items-center justify-center">
            {mutation.isPending && (
              <Group gap={'md'}>
                <Loader size={'sm'} />
                <p>Loading...</p>
              </Group>
            )}
            {!hasMore && !mutation.isPending && <p className="text-gray-500">Semua data sudah dimuat</p>}
          </div>
        )}
      </div>
    </section>
  );
}

export default function SearchResultsPage(props: ViewSearchPage) {
  const datas = props.data;
  const disorderDiseases = datas.disorderDiseases;
  const popularArticles = datas.popularArticles;
  const news = datas.news;
  const visualEducations = datas.visualEducations;
  const activities = datas.activities;
  const promotions = datas.promotions;
  const polyClinics = datas.polyClinics;
  const trainings = datas.trainings;
  const initialKeyword = props.keyword;
  const { t } = useTranslation();
  const t_opt = { ns: 'search' };
  const [keyword, setkeyword] = useState(initialKeyword || '');

  const clearSearch = () => {
    setkeyword('');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.get(route('search.index'), { keyword: keyword.trim() });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <>
      <AppMeta title="Pencarian" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={<CustomBreadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Pencarian' }]} />}
          title={t('search.results', t_opt)}
        >
          {/* Search Bar */}
          <div className="relative mb-12">
            <div className="flex w-full items-center gap-2">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
              <Input
                value={keyword}
                type="text"
                onChange={(e) => setkeyword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('search.keyword', t_opt)}
                className="bg-transparent outline-none text-gray-700 placeholder-gray-500 pl-10 pr-3 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent"
              />
              {keyword && (
                <Button onClick={clearSearch} className="hover:bg-gray-200 transition-colors" variant={'outline'}>
                  <X className="w-4 h-4 text-orange-500" />
                </Button>
              )}
            </div>
          </div>

          {/* Polyclinic Section */}
          {polyClinics.length > 0 && (
            <SearchResultSection
              headerTitle={t('search.headerTitle.polyClinics', t_opt)}
              items={polyClinics}
              keyword={keyword}
              category={polyClinics[0]['kategori']}
            />
          )}

          {/* Disorder & Disease Section */}
          {disorderDiseases.length > 0 && (
            <SearchResultSection
              headerTitle={t('search.headerTitle.disorderDiseas', t_opt)}
              items={disorderDiseases}
              keyword={keyword}
              category={disorderDiseases[0]['kategori']}
            />
          )}

          {/* Popular Article Section */}
          {popularArticles.length > 0 && (
            <SearchResultSection
              headerTitle={t('search.headerTitle.popularArticles', t_opt)}
              items={popularArticles}
              keyword={keyword}
              category={popularArticles[0]['kategori']}
            />
          )}

          {/* News Section */}
          {news.length > 0 && (
            <SearchResultSection
              headerTitle={t('search.headerTitle.news', t_opt)}
              items={news}
              keyword={keyword}
              category={news[0]['kategori']}
            />
          )}

          {/* Visual Education Section */}
          {visualEducations.length > 0 && (
            <SearchResultSection
              headerTitle={t('search.headerTitle.visualEducations', t_opt)}
              items={visualEducations}
              keyword={keyword}
              category={visualEducations[0]['kategori']}
            />
          )}

          {/* Activity Section */}
          {activities.length > 0 && (
            <SearchResultSection
              headerTitle={t('search.headerTitle.activities', t_opt)}
              items={activities}
              keyword={keyword}
              category={activities[0]['kategori']}
            />
          )}

          {/* Promotion Section */}
          {promotions.length > 0 && (
            <SearchResultSection
              headerTitle={t('search.headerTitle.promotions', t_opt)}
              items={promotions}
              keyword={keyword}
              category={promotions[0]['kategori']}
            />
          )}

          {/* Training Section */}
          {trainings.length > 0 && (
            <SearchResultSection
              headerTitle={t('search.headerTitle.trainings', t_opt)}
              items={trainings}
              keyword={keyword}
              category={trainings[0]['kategori']}
            />
          )}
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
