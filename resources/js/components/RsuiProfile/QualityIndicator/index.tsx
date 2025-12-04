'use client';

import { NotifyError } from '@/components/Notifications/Notify';
import { MOBILE_BREAKPOINT } from '@/lib/constants';
import { QualityIndicatorProps } from '@/types/page-params';
import { LoadingOverlay } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import homepageStyle from '~/css/Homepage.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

// Added default props to prevent runtime errors
const demoProps: QualityIndicatorProps = {
  category: [
    { id: 1, kategori_nama: 'Kepatuhan Kebersihan Tangan' },
    { id: 2, kategori_nama: 'Kepatuhan Penggunaan APD' },
    { id: 3, kategori_nama: 'Kepatuhan Identifikasi Pasien' },
  ],
  dataCapaian: {
    chart_data_0: '{"data":[72.94,86,80,0,0,0,0,0,0,0,0,0]}',
    chart_data_1: '{"data":[97.65,98,97,0,0,0,0,0,0,0,0,0]}',
    chart_data_2: '{"data":[99.94,99,99,0,0,0,0,0,0,0,0,0]}',
    chart_data_3: '{"data":[100,100,100,0,0,0,0,0,0,0,0,0]}',
    chart_data_4: '{"data":[64,64,67,0,0,0,0,0,0,0,0,0]}',
    chart_data_5: '{"data":[11.6,8,9,0,0,0,0,0,0,0,0,0]}',
    chart_data_6: '{"data":[78.9,90,89,0,0,0,0,0,0,0,0,0]}',
    chart_data_7: '{"data":[98.1,99,98,0,0,0,0,0,0,0,0,0]}',
    chart_data_8: '{"data":[88,87,89,0,0,0,0,0,0,0,0,0]}',
    chart_data_9: '{"data":[82,87,89,0,0,0,0,0,0,0,0,0]}',
    chart_data_10: '{"data":[99.46,99,98,0,0,0,0,0,0,0,0,0]}',
    chart_data_11: '{"data":[87.5,84,71,0,0,0,0,0,0,0,0,0]}',
    chart_data_12: '{"data":[86.6,85,87,0,0,0,0,0,0,0,0,0]}',
  },
  dataTarget: {
    chart_data_0: '{"data":[85,85,85,85,85,85,85,85,85,85,85,85]}',
    chart_data_1: '{"data":[99,99,99,99,99,99,99,99,99,99,99,99]}',
    chart_data_2: '{"data":[99,99,99,99,99,99,99,99,99,99,99,99]}',
    chart_data_3: '{"data":[80,80,80,80,80,80,80,80,80,80,80,80]}',
    chart_data_4: '{"data":[80,80,80,80,80,80,80,80,80,80,80,80]}',
    chart_data_5: '{"data":[5,5,5,5,5,5,5,5,5,5,5,5]}',
    chart_data_6: '{"data":[80,80,80,80,80,80,80,80,80,80,80,80]}',
    chart_data_7: '{"data":[99,99,99,99,99,99,99,99,99,99,99,99]}',
    chart_data_8: '{"data":[80,80,80,80,80,80,80,80,80,80,80,80]}',
    chart_data_9: '{"data":[80,80,80,80,80,80,80,80,80,80,80,80]}',
    chart_data_10: '{"data":[99,99,99,99,99,99,99,99,99,99,99,99]}',
    chart_data_11: '{"data":[80,80,80,80,80,80,80,80,80,80,80,80]}',
    chart_data_12: '{"data":[76.61,76.61,76.61,76.61,76.61,76.61,76.61,76.61,76.61,76.61,76.61,76.61]}',
  },
  qualityIndicatorData: [
    {
      tahun: 2025,
      target:
        'a:12:{s:10:"target_jan";s:2:"85";s:10:"target_feb";s:2:"85";s:10:"target_mar";s:2:"85";s:10:"target_apr";s:2:"85";s:10:"target_may";s:2:"85";s:10:"target_jun";s:2:"85";s:10:"target_jul";s:2:"85";s:10:"target_aug";s:2:"85";s:10:"target_sep";s:2:"85";s:10:"target_oct";s:2:"85";s:10:"target_nov";s:2:"85";s:10:"target_dec";s:2:"85";}',
      capaian:
        'a:12:{s:11:"capaian_jan";s:6:"72.94%";s:11:"capaian_feb";s:2:"86";s:11:"capaian_mar";s:2:"80";s:11:"capaian_apr";s:1:"0";s:11:"capaian_may";s:1:"0";s:11:"capaian_jun";s:1:"0";s:11:"capaian_jul";s:1:"0";s:11:"capaian_aug";s:1:"0";s:11:"capaian_sep";s:1:"0";s:11:"capaian_oct";s:1:"0";s:11:"capaian_nov";s:1:"0";s:11:"capaian_dec";s:1:"0";}',
      kode_imut: '2025-1',
    },
  ],
  selectedYear: '2025',
  yearList: [{ tahun: 2025 }, { tahun: 2024 }, { tahun: 2023 }],
};

export default function QualityIndicator(props: QualityIndicatorProps & { ns: string }) {
  const { t } = useTranslation();
  const t_opt = { ns: props.ns };
  const [data, setData] = useState<QualityIndicatorProps>(props);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(props.selectedYear);
  const matchMobile = useMediaQuery(MOBILE_BREAKPOINT);

  const mutation = useMutation({
    gcTime: 900000, // 15 min cache on frontend
    mutationKey: ['quality-indicator'],
    mutationFn: (year: number) => {
      const req = axios.post(route('about.qualityIndicator', { year }));
      return req;
    },
    onSettled(res, error, variables, context) {
      if (res) {
        const { data: indicatorRes } = res.data;
        setData(indicatorRes.qualityIndicator);
      } else {
        console.error(error);
        NotifyError('Gagal!', 'Terjadi kesalahan saat mengambil data indikator mutu.');
      }
    },
  });

  // Function to parse PHP serialized data
  const parsePHPSerialized = (serializedString: string): Record<string, string> => {
    const result: Record<string, string> = {};
    const matches = serializedString.match(/s:\d+:"([^"]+)";s:\d+:"([^"]+)";/g);

    if (matches) {
      matches.forEach((match) => {
        const keyMatch = match.match(/s:\d+:"([^"]+)";/);
        const valueMatch = match.match(/;s:\d+:"([^"]+)";$/);
        if (keyMatch && valueMatch) {
          result[keyMatch[1]] = valueMatch[1];
        }
      });
    }
    return result;
  };

  const parseJSONData = (jsonString: string): number[] => {
    try {
      const parsed = JSON.parse(jsonString);
      return parsed.data || [];
    } catch {
      return [];
    }
  };

  const getChartData = () => {
    if (!data.dataCapaian || !data.dataTarget || !data.qualityIndicatorData) {
      return { achieved: [], target: [] };
    }

    const categoryKey = `chart_data_${selectedCategoryIndex}` as keyof typeof data.dataCapaian;

    // Try to get data from current year's JSON format first
    if (currentYear === data.selectedYear) {
      const achievedData = parseJSONData(data.dataCapaian[categoryKey]);
      const targetData = parseJSONData(data.dataTarget[categoryKey]);

      if (achievedData.length > 0 && targetData.length > 0) {
        return { achieved: achievedData, target: targetData };
      }
    }

    // Fallback to qualityIndicatorData for historical years
    const yearData = data.qualityIndicatorData.find((item) => item.tahun.toString() === currentYear);
    if (yearData) {
      const targetParsed = parsePHPSerialized(yearData.target);
      const achievedParsed = parsePHPSerialized(yearData.capaian);

      const targetValues = [
        'target_jan',
        'target_feb',
        'target_mar',
        'target_apr',
        'target_may',
        'target_jun',
        'target_jul',
        'target_aug',
        'target_sep',
        'target_oct',
        'target_nov',
        'target_dec',
      ].map((key) => Number.parseFloat(targetParsed[key]?.replace('%', '').replace(',', '.') || '0'));

      const achievedValues = [
        'capaian_jan',
        'capaian_feb',
        'capaian_mar',
        'capaian_apr',
        'capaian_may',
        'capaian_jun',
        'capaian_jul',
        'capaian_aug',
        'capaian_sep',
        'capaian_oct',
        'capaian_nov',
        'capaian_dec',
      ].map((key) => Number.parseFloat(achievedParsed[key]?.replace('%', '').replace(',', '.') || '0'));

      return { achieved: achievedValues, target: targetValues };
    }

    return { achieved: [], target: [] };
  };

  const { achieved, target } = getChartData();
  const monthLabels = t('qualityIndicator.months', { ...t_opt, returnObjects: true }) as string[];

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label: t('qualityIndicator.target', t_opt),
        data: target,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: false,
        datalabels: {
          display: false,
        },
      },
      {
        label: t('qualityIndicator.achieved', t_opt),
        data: achieved,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        fill: false,
        datalabels: {
          display: true,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: matchMobile ? 1.2 : 2,
    plugins: {
      legend: {
        labels: {
          boxWidth: matchMobile ? 12 : 40, // ✅ smaller legend markers
          font: {
            size: matchMobile ? 8 : 12,
          },
        },
      },
      title: {
        display: true,
        text: `${data.category[selectedCategoryIndex]?.kategori_nama || 'Quality Indicator'} - ${currentYear}`,
        font: {
          size: matchMobile ? 12 : 16,
          weight: 'bold' as const,
        },
      },
      datalabels: {
        display: (context: any) => {
          if (!context || !context.parsed || typeof context.parsed.y !== 'number') {
            return false;
          }
          return context.parsed.y > 0;
        },
        align: 'top' as const,
        anchor: 'end' as const,
        offset: 4,
        backgroundColor: (context: any) => (context.datasetIndex === 0 ? '#ef4444' : '#22c55e'),
        borderColor: (context: any) => (context.datasetIndex === 0 ? '#dc2626' : '#16a34a'),
        borderRadius: 6,
        borderWidth: 1,
        color: '#ffffff',
        font: {
          size: matchMobile ? 8 : 11,
          weight: '600' as const,
          family: 'system-ui, -apple-system, sans-serif',
        },
        padding: {
          top: 4,
          bottom: 4,
          left: 6,
          right: 6,
        },
        formatter: (value: any, context: any) => {
          if (value == null || typeof value !== 'number' || value <= 0) {
            return '';
          }
          return value.toFixed(1) + '%';
        },
        textAlign: 'center' as const,
        textStrokeColor: (context: any) => (context.datasetIndex === 0 ? '#dc2626' : '#16a34a'),
        textStrokeWidth: 0,
        clip: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        // max:
        //   achieved.length > 0 && target.length > 0
        //     ? Math.max(...achieved.filter((v) => v > 0), ...target.filter((v) => v > 0)) * 1.2
        //     : 100,
        max: 100,
        title: {
          display: true,
          text: t('qualityIndicator.percentage', t_opt) + ' (%)',
          font: {
            size: matchMobile ? 8 : 11,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 10,
        },
      },
      x: {
        title: {
          display: true,
          text: t('qualityIndicator.month', t_opt),
          font: {
            size: matchMobile ? 8 : 11,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    layout: {
      padding: {
        left: matchMobile ? 10 : 20,
        right: matchMobile ? 10 : 20,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className="py-12">
      <div className="container mx-auto max-xs:px-4">
        <div className={homepageStyle.header}>
          <div>
            <h2 className="text-4xl font-bold text-left mb-8 color-mantine-blue-8">Indikator Mutu</h2>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl-all">
          <div className="mb-6 flex flex-col sm:flex-row gap-4 px-6 pt-6">
            <div className="flex-1">
              <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Year
              </label>
              <select
                id="year-select"
                value={currentYear}
                onChange={(e) => {
                  setCurrentYear(e.target.value);
                  mutation.mutate(Number.parseInt(e.target.value));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {data.yearList
                  ? data.yearList.map((year) => (
                      <option key={year.tahun} value={year.tahun.toString()}>
                        {year.tahun}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            <div className="flex-2">
              <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Quality Indicator
              </label>
              <select
                id="category-select"
                value={selectedCategoryIndex}
                onChange={(e) => setSelectedCategoryIndex(Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {data.category
                  ? data.category.map((cat, index) => (
                      <option key={cat.id} value={index}>
                        {cat.kategori_nama}
                      </option>
                    ))
                  : null}
              </select>
            </div>
          </div>

          <div className="relative">
            <LoadingOverlay visible={mutation.isPending} />

            <Line data={chartData} options={options as any} />

            {achieved.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm px-6 pb-6">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    {t('qualityIndicator.achievement-summary', t_opt)}
                  </h3>
                  <p>
                    {t('qualityIndicator.achievement-summary.average', t_opt)}:{' '}
                    {(achieved.reduce((a, b) => a + b, 0) / achieved.filter((v) => v > 0).length).toFixed(1)}%
                  </p>
                  <p>
                    {t('qualityIndicator.achievement-summary.best-month', t_opt)}:{' '}
                    {monthLabels[achieved.indexOf(Math.max(...achieved))]}
                  </p>
                  <p>
                    {t('qualityIndicator.achievement-summary.lowest', t_opt)}:{' '}
                    {Math.min(...achieved.filter((v) => v > 0))}%
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-700 mb-2">{t('qualityIndicator.target-analysis', t_opt)}</h3>
                  <p>
                    {t('qualityIndicator.target-analysis.average', t_opt)}:{' '}
                    {(target.reduce((a, b) => a + b, 0) / target.filter((v) => v > 0).length).toFixed(1)}%
                  </p>
                  <p>
                    {t('qualityIndicator.target-analysis.months-above', t_opt)}:{' '}
                    {achieved.filter((v, i) => v > target[i] && v > 0).length}
                  </p>
                  <p>
                    {t('qualityIndicator.target-analysis.months-below', t_opt)}:{' '}
                    {achieved.filter((v, i) => v < target[i] && v > 0).length}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-700 mb-2">{t('qualityIndicator.performance-trend', t_opt)}</h3>
                  <p>
                    {t('qualityIndicator.performance-trend.data-points', t_opt)}: {achieved.filter((v) => v > 0).length}{' '}
                    {t('qualityIndicator.month', t_opt)}
                  </p>
                  <p>
                    {t('qualityIndicator.performance-trend.target-met', t_opt)}:{' '}
                    {achieved.filter((v, i) => v >= target[i] && v > 0).length}x
                  </p>
                  <p>
                    {t('qualityIndicator.performance-trend.compliance-rate', t_opt)}:{' '}
                    {(
                      (achieved.filter((v, i) => v >= target[i] && v > 0).length /
                        achieved.filter((v) => v > 0).length) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
