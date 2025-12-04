import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { NotifyError } from '@/components/Notifications/Notify';
import { minimalRichStr } from '@/components/i18n/MinimalRichStr';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { BaseAPIResponse } from '@/types/api';
import { GenericViewPage, MedDevData } from '@/types/page-params';
import { FloatingIndicator, LoadingOverlay, Tabs } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { toInteger } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import classes from './MedDevValidation.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Page(props: GenericViewPage<MedDevData>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'diklat' };

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const [data, setData] = useState<MedDevData>(props.data);
  const [currentYear, setCurrentYear] = useState(`${props.data.yearNow}`);

  const mutation = useMutation({
    gcTime: 900000, // 15 min cache on frontend
    mutationKey: ['med-dev-validation'],
    mutationFn: (year: string) => {
      const req = axios.post<BaseAPIResponse<MedDevData>>(
        route('diklat.medDevValidation.findMedDevValidation', { year: toInteger(year) }),
      );
      return req;
    },
    onSettled(res, error, variables, context) {
      if (res) {
        const { data: medDevData } = res.data;
        console.log(res.data, medDevData);
        setData(medDevData!);
      } else {
        console.error(error);
        NotifyError('Gagal!', 'Terjadi kesalahan saat mengambil data validasi alat kesehatan.');
      }
    },
  });

  const changeYear = (year: string | null) => {
    if (!year) return;
    if (year === currentYear) return;
    setCurrentYear(year);
    mutation.mutate(year);
  };

  const chartRef = useRef<ChartJS<'bar'>>(null);

  // Sort data by nilai (value) in descending order for better visualization
  const sortedData = [...data.medDevData].sort((a, b) => b.nilai - a.nilai);

  const chartData = {
    labels: sortedData.map((item) => item.jenis_pengujian),
    datasets: [
      {
        label: 'Number of Tests',
        data: sortedData.map((item) => item.nilai),
        backgroundColor: '#0072BC',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#0a0a0a',
        bodyColor: '#0a0a0a',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${t('alkes.test', t_opt)}: ${context.parsed.x}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#737373',
        },
        grid: {
          color: '#e5e5e5',
        },
        border: {
          color: '#e5e5e5',
        },
      },
      y: {
        ticks: {
          color: '#0a0a0a',
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
        border: {
          color: '#e5e5e5',
        },
      },
    },
  };

  useEffect(() => {
    // Cleanup function for chart
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const totalTests = data.medDevData.reduce((sum, item) => sum + item.nilai, 0);

  return (
    <>
      <AppMeta title="Uji Validasi Alat Kesehatan" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Diklitlat' },
                { label: 'Uji Validasi Alat Kesehatan', href: '#' },
              ]}
            />
          }
          title={t('alkes.title', t_opt)}
        >
          <ImageWithLoading alt="Hero image" src={'/assets/media/diklat/alkes.jpg'} />
          <p className="text-justify whitespace-pre-wrap mt-8">{t('alkes.description', t_opt)}</p>

          <h2 className="text-2xl font-bold text-left color-mantine-blue-8 mt-12">{t('alkes.how-to-apply', t_opt)}</h2>

          <Accordion type="single" collapsible className="space-y-4 mt-8">
            <AccordionItem value={`1`} className="bg-white rounded-lg shadow-xl border-1">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <p className="font-semibold">{t(`alkes.diagram`, t_opt)}</p>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <ImageWithLoading alt="Diagram" src={'/assets/media/diklat/diagram-alkes.png'} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value={`2`} className="bg-white rounded-lg shadow-xl border-1">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <p className="font-semibold">{t(`alkes.flow.title`, t_opt)}</p>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-justify whitespace-pre-wrap">{minimalRichStr(t('alkes.flow.content', t_opt))}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h2 className="text-2xl font-bold text-left color-mantine-blue-8 mt-12">{t('alkes.history', t_opt)}</h2>

          <Tabs
            variant="none"
            value={`${currentYear}`}
            onChange={(year) => changeYear(year)}
            mt={'md'}
            p="sm"
            bg={'#F5F5F5'}
            key={`med-dev-validation-${currentYear}`}
          >
            <Tabs.List ref={setRootRef} className={classes.list}>
              {data.year.map((year) => (
                <Tabs.Tab
                  key={year.tahun_group}
                  value={`${year.tahun_group}`}
                  ref={setControlRef(`${year.tahun_group}`)}
                  className={classes.tab}
                >
                  {year.tahun_group}
                </Tabs.Tab>
              ))}

              <FloatingIndicator
                target={currentYear ? controlsRefs[currentYear] : null}
                parent={rootRef}
                className={classes.indicator}
              />
            </Tabs.List>
            <Tabs.Panel value={`${currentYear}`} mt={'md'}>
              <div className="flex flex-col gap-6">
                <Card className="w-full relative">
                  <LoadingOverlay visible={mutation.isPending} />
                  <CardHeader>
                    <CardTitle>{t('alkes.test.overview', t_opt)}</CardTitle>
                    <CardDescription>
                      {t('alkes.test.overview.description', {
                        ...t_opt,
                        replace: { x: totalTests, y: data.medDevData.length },
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[800px]">
                      <Bar ref={chartRef} data={chartData} options={options} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="w-full relative">
                  <LoadingOverlay visible={mutation.isPending} />
                  <CardHeader>
                    <CardTitle>{t('alkes.test.detail', t_opt)}</CardTitle>
                    <CardDescription>{t('alkes.test.detail.description', t_opt)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">{t('alkes.test.detail.sequence', t_opt)}</TableHead>
                          <TableHead>{t('alkes.test.detail.type', t_opt)}</TableHead>
                          <TableHead className="text-right w-[150px]">{t('alkes.test.detail.total', t_opt)}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.medDevData.map((item) => (
                          <TableRow key={item.sequence}>
                            <TableCell className="font-medium">{item.sequence}</TableCell>
                            <TableCell>{item.jenis_pengujian}</TableCell>
                            <TableCell className="text-right font-semibold">{item.nilai}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </Tabs.Panel>
          </Tabs>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
