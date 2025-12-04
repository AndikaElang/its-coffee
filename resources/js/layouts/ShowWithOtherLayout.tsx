import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { NotifyError } from '@/components/Notifications/Notify';
import { Card } from '@/components/ui/card';
import { BaseAPIResponse } from '@/types/api';
import { paginatedData } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Center, Group, Loader, ScrollArea } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ContentLayout from './ContentLayout';

export default function ShowWithOtherLayout<T extends Record<string, any>>({
  breadCrumb,
  title,
  otherText,
  otherLoadMoreText,
  otherAllLoadedText,
  content,
  contentDescription,
  dataId,
  loadOtherDataURL,
  initialOT,
  initialOTPaginated,
  OTURLSlug,
  OTSlugKey,
  OTFileNameKey,
  OTTitleKey,
  OTDateKey,
  OTWithJoin,
  OTWithJoinFileNameKey,
}: {
  breadCrumb: React.ReactNode;
  title?: string;
  otherText?: string;
  otherLoadMoreText?: string;
  otherAllLoadedText?: string;
  content: React.ReactNode;
  contentDescription?: React.ReactNode;
  dataId: string | number;
  loadOtherDataURL: string;
  initialOT: T[];
  initialOTPaginated: paginatedData<T>;
  OTURLSlug: string;
  OTSlugKey: string;
  OTFileNameKey: string;
  OTTitleKey: string;
  OTDateKey: string;
  OTWithJoin?: boolean;
  OTWithJoinFileNameKey?: string;
}) {
  const { t } = useTranslation();

  // Read please.
  // No idea why but the infinite scroll method does not work. Plkease fix ASAP if needed.

  // OT -> Other
  const [dataOTPagination, setDataOTPagination] = useState<paginatedData<T>>(initialOTPaginated);
  const [dataOT, setDataOT] = useState<T[]>(initialOT);
  const [pageOT, setPageOT] = useState(1);
  const [infiniteModeOT, setInfiniteModeOT] = useState(false); // switch after first load
  const loaderScrollOTRef = useRef<HTMLDivElement | null>(null);
  const hasMoreOT = (dataOTPagination?.current_page ?? 0) < (dataOTPagination?.last_page ?? 0);

  const mutationOT = useMutation({
    mutationFn: async (page: number) => {
      const req = await axios.post<BaseAPIResponse<paginatedData<T>>>(loadOtherDataURL, {
        id: dataId,
        page,
      });
      return req.data;
    },
    onSuccess: (res) => {
      const { success, data, message } = res;

      if (success && data) {
        setDataOTPagination(data);
        setDataOT((prevData) => [...prevData, ...data.data]);
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
    if (!infiniteModeOT || !loaderScrollOTRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!hasMoreOT) return;
        if (entries[0].isIntersecting && hasMoreOT && !mutationOT.isPending) {
          setPageOT((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(loaderScrollOTRef.current);

    return () => {
      if (loaderScrollOTRef.current) observer.unobserve(loaderScrollOTRef.current);
    };
  }, [loaderScrollOTRef, hasMoreOT, mutationOT.isPending, infiniteModeOT]);

  // Fetch data when page changes
  useEffect(() => {
    if (pageOT > 1) {
      mutationOT.mutate(pageOT);
    }
  }, [pageOT]);

  const otherActivityMapped = dataOT.map((data, i) => {
    const isLast = i === dataOT.length - 1;
    const shouldAddMargin = dataOT.length <= 5 && isLast;

    return (
      <Link href={route(OTURLSlug, data[OTSlugKey])} key={i}>
        <div className={`flex p-2 gap-2 m-4 my-0 group hover:bg-gray-200 rounded-2xl ${shouldAddMargin ? 'mb-6' : ''}`}>
          {OTWithJoin && OTWithJoinFileNameKey ? (
            <ImageWithLoading
              src={data[OTFileNameKey][0][OTWithJoinFileNameKey] ? data[OTFileNameKey][0][OTWithJoinFileNameKey] : ''}
              alt={data[OTTitleKey] ?? ''}
              className="max-w-[100px] max-h-[125px] w-full rounded-md overflow-hidden shadow-md"
            />
          ) : (
            <ImageWithLoading
              src={data[OTFileNameKey] ?? ''}
              alt={data[OTTitleKey] ?? ''}
              className="max-w-[100px] max-h-[125px] w-full rounded-md overflow-hidden shadow-md"
            />
          )}

          <div className="flex flex-col">
            <span className="text-md font-medium text-gray-700 mb-3 line-clamp-2 group-hover:underline">
              {data[OTTitleKey] ?? ''}
            </span>
            <span className="text-sm text-gray-500">
              {data[OTDateKey] ? dayjs(new Date(data[OTDateKey])).format('YYYY/MM/DD') : ''}
            </span>
          </div>
        </div>
      </Link>
    );
  });

  const cardOtherActivity = (
    <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative">
      <ScrollArea h={infiniteModeOT ? '850px' : undefined}>
        <h3 className="font-semibold text-[#25455E] mb-4 sm:text-lg m-4 text-center">
          {otherText ?? t('other', { ns: 'generic' })}
        </h3>
        {dataOT.length > 0 ? (
          otherActivityMapped
        ) : (
          <h3 className="mb-4 sm:text-lg m-4 text-center">{t('no-record', { ns: 'generic' })}</h3>
        )}

        {/* manual "load more" button */}
        {initialOT.length >= 5 && hasMoreOT && !mutationOT.isPending && (
          <Center>
            <p
              onClick={() => {
                setInfiniteModeOT(true);
                setPageOT((prev) => prev + 1); // load first extra page
              }}
              className="cursor-pointer text-[#0072BC] hover:text-[#25455E] hover:underline transition-colors flex items-center gap-1 mx-auto text-md font-medium my-4"
            >
              {otherLoadMoreText ?? t('load-more', { ns: 'generic' })}{' '}
              <ChevronRight className="w-4 h-4 text-orange-500" />
            </p>
          </Center>
        )}

        {/* Infinite scroll sentinel */}
        {infiniteModeOT && (
          <Center ref={loaderScrollOTRef}>
            {mutationOT.isPending && (
              <Group gap={'md'}>
                <Loader size={'sm'} />
                <p>Loading...</p>
              </Group>
            )}
            {!hasMoreOT && !mutationOT.isPending && (
              <p className="text-gray-500 my-4">{otherAllLoadedText ?? t('all-loaded', { ns: 'generic' })}</p>
            )}
          </Center>
        )}
      </ScrollArea>
    </Card>
  );

  return (
    <ContentLayout title={title} breadCrumb={breadCrumb}>
      <div className="max-[1024px]:hidden">
        <div className="flex flex-row items-start gap-6">
          <div className="flex-1 min-w-0">
            <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative">
              {content}
            </Card>

            {contentDescription && <div className="mt-3">{contentDescription}</div>}
          </div>

          <div className="w-[450px] flex-shrink-0 top-0">{cardOtherActivity}</div>
        </div>
      </div>
      <div className="hidden max-[1024px]:flex flex-col space-y-5">
        {content}
        {contentDescription}
        {cardOtherActivity}
      </div>
    </ContentLayout>
  );
}
