'use client';

import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BaseAPIResponse, doctorScheduleResponse } from '@/types/api';
import { Doctor } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Collapse, Group, LoadingOverlay, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NotifyError } from '../Notifications/Notify';
import { ScheduleTable } from './schedule-table';

interface DoctorData extends Doctor {
  schedule?: doctorScheduleResponse;
}

interface DoctorCardProps {
  doctor: DoctorData;
  canLoadMore?: boolean;
}

export function DoctorCard({ doctor, canLoadMore }: DoctorCardProps) {
  const [opened, { toggle }] = useDisclosure(canLoadMore ? false : true);
  const [data, setData] = useState(doctor);
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { t } = useTranslation();

  const loadMore = async () => {
    if (!canLoadMore || fetching) return;

    toggle(); // toggle the UI

    // if already fetched, do not fetch again
    if (fetched) return;
    setFetching(true);

    try {
      const req = await axios.post<BaseAPIResponse<doctorScheduleResponse>>(
        route('patient.findDoctor.getScheduleJson'),
        {
          nip: doctor.nip,
        },
      );
      if (req.data.success) {
        setData((prev) => ({ ...prev, schedule: req.data.data! }));
      } else {
        NotifyError('Error', 'Gagal memuat jadwal dokter');
      }
      setFetched(true);
    } catch (error) {
      console.error(error);
      NotifyError('Error', 'Terjadi kesalahan saat memuat jadwal dokter');
    } finally {
      setFetching(false);
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden p-0">
      <div className="flex flex-col lg:flex-row">
        {/* Doctor Info Section */}
        {/* <div className="flex items-center max-lg:py-4 lg:w-90 xl:w-100 bg-gray-50"> */}
        <div className="flex items-center max-lg:pt-4 w-60 max-[1024px]:mx-auto">
          <div className="relative w-full">
            <ImageWithLoading
              src={data.path_foto_dokter || '/placeholder.svg'}
              alt={`Foto ${data.nama_dokter}`}
              className="mx-4 my-2 p-0"
              imageClassname="rounded-md min-h-[250px]"
            />
          </div>
        </div>

        {/* Schedule Section */}
        <div className="flex-1 p-0 overflow-x-auto">
          <Group mt={'md'} mb={'xs'}>
            <div className="min-[1070px]:max-w-[580px] max-[1070px]:flex max-[1070px]:flex-col max-[1070px]:w-full max-[1070px]:mx-4">
              <h3 className="max-[1024px]:mx-auto max-[1024px]:text-center text-2xl font-semibold text-gray-900 leading-tight line-clamp-3">
                {data.nama_dokter}
              </h3>
              <p className="max-[1024px]:mx-auto max-[1024px]:text-center text-lg text-muted-foreground mt-1 line-clamp-2">
                {data.headline_dokter ?? '-'}
              </p>
              <Link href={route('patient.findDoctor.show', { id: data.id })} className="min-[1070px]:hidden">
                <Button
                  className={`mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors`}
                  size="sm"
                >
                  {t('see-more', { ns: 'generic' })}
                </Button>
              </Link>
            </div>
            <Link
              href={route('patient.findDoctor.show', { id: data.id })}
              className="max-[1070px]:hidden ms-auto me-[22px] inline-flex"
            >
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full"
                size="sm"
              >
                {t('see-more', { ns: 'generic' })}
              </Button>
            </Link>
          </Group>

          <div className="flex">
            <h3
              onClick={loadMore}
              className={cn(
                canLoadMore && 'cursor-pointer select-none',
                `color-mantine-blue-8 font-semibold text-lg flex mb-1 max-[1024px]:mx-auto max-[1024px]:my-2`,
              )}
            >
              Jadwal dan Daftar
              {canLoadMore && (
                <ThemeIcon variant="transparent" ms={4} my={'auto'} size={'sm'} style={{ color: '#F26522' }}>
                  {opened ? <ChevronUp /> : <ChevronDown />}
                </ThemeIcon>
              )}
            </h3>
          </div>

          <Collapse in={opened} transitionDuration={300} keepMounted pos={'relative'}>
            <LoadingOverlay visible={fetching} />
            {fetching && <p className="text-center min-h-20">Loading...</p>}
            {data.schedule && <ScheduleTable schedule={data.schedule} />}
          </Collapse>
        </div>
      </div>
    </Card>
  );
}
