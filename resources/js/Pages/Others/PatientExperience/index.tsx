import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { NotifyError } from '@/components/Notifications/Notify';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { BaseAPIResponse } from '@/types/api';
import { PatientExperience, paginatedData } from '@/types/models';
import { GenericViewPage } from '@/types/page-params';
import { Center, Group, Loader } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function PatientExperienceSection({ items }: { items: PatientExperience[] }) {
  const [dataPagination, setDataPagination] = useState<paginatedData<PatientExperience>>();
  const [data, setData] = useState<PatientExperience[]>(items);
  const [page, setPage] = useState(1);
  const [infiniteMode, setInfiniteMode] = useState(false); // switch after first load
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const hasMore = (dataPagination?.current_page ?? 0) < (dataPagination?.last_page ?? 0);

  const mutation = useMutation({
    mutationFn: async (page: number) => {
      const req = await axios.post<BaseAPIResponse<paginatedData<PatientExperience>>>(
        route('patientExperience.scroll'),
        {
          page,
        },
      );
      return req.data;
    },
    onSuccess: (res) => {
      const { success, data, message } = res;

      console.log(res);

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
    <div className="space-y-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <ImageWithLoading
                src={item.file_name || '/placeholder.svg'}
                alt={item.nama ?? ''}
                className="w-40 h-56 object-cover rounded-lg bg-gray-200"
              />
            </div>

            {/* Quote and Info */}
            <div className="flex-1 flex flex-col justify-between">
              <p
                className="text-sm text-gray-700 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: item.deskripsi ?? '' }}
              />

              <div className="text-right">
                <p className="text-[#25455E] font-semibold text-lg">{item.nama ?? ''}</p>
                <p className="text-gray-600 text-sm">{item.profesi ?? ''}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

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
            Muat lebih banyak
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
  );
}

export default function Page(props: GenericViewPage<PatientExperience[]>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'others' };
  const patientExperienceData = props.data;

  return (
    <>
      <AppMeta title="Cerita Mereka" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={<CustomBreadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Cerita Mereka' }]} />}
          title={t('patient-experience', t_opt)}
        >
          <PatientExperienceSection items={patientExperienceData} />
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
