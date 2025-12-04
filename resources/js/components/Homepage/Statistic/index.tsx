'use client';

import { MOBILE_BREAKPOINT } from '@/lib/constants';
import type { PageProps } from '@/types';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Activity, Bed, Eye, Handshake, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Statistic(props: PageProps & { ns: string }) {
  const { t } = useTranslation();
  const t_opt = { ns: props.ns };

  const needBreak = useMediaQuery('(max-width: 1200px)');
  const matchMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const theme = useMantineTheme();

  const stats = [
    {
      icon: Users,
      bg: 'bg-blue-100',
      bgHover: 'group-hover:bg-blue-200',
      iconColor: 'text-blue-600 group-hover:text-blue-700',
      number: '200+',
      label: <>Spesialis</>,
      barGradient: 'from-blue-500 to-yellow-400',
      aria: 'View all specialists and sub-specialists',
    },
    {
      icon: Bed,
      bg: 'bg-green-100',
      bgHover: 'group-hover:bg-green-200',
      iconColor: 'text-green-600 group-hover:text-green-700',
      number: '300+',
      label: 'Jumlah Bed',
      barGradient: 'from-green-500 to-yellow-400',
      aria: 'View hospital facilities and bed availability',
    },
    {
      icon: Activity,
      bg: 'bg-purple-100',
      bgHover: 'group-hover:bg-purple-200',
      iconColor: 'text-purple-600 group-hover:text-purple-700',
      number: '9.4K+',
      label: 'Tindakan',
      barGradient: 'from-purple-500 to-yellow-400',
      aria: 'View available medical procedures and treatments',
    },
    {
      icon: Eye,
      bg: 'bg-orange-100',
      bgHover: 'group-hover:bg-orange-200',
      iconColor: 'text-orange-600 group-hover:text-orange-700',
      number: '138K+',
      label: 'Kunjungan',
      barGradient: 'from-orange-500 to-yellow-400',
      aria: 'View patient visit statistics and testimonials',
    },
    {
      icon: Handshake,
      bg: 'bg-teal-100',
      bgHover: 'group-hover:bg-teal-200',
      iconColor: 'text-teal-600 group-hover:text-teal-700',
      number: '150+',
      label: 'Kerja Sama',
      barGradient: 'from-teal-500 to-yellow-400',
      aria: 'View hospital partnerships and collaborations',
      extraClass: 'col-span-2 lg:col-span-1',
    },
  ];

  return (
    <div className="py-12" style={{ backgroundColor: matchMobile ? 'white' : theme.colors.blue[8] }}>
      <div className="container mx-auto max-xs:px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`
                  group rounded-2xl p-6 shadow-lg
                  hover:shadow-2xl transform hover:scale-102 active:scale-95
                  transition-all duration-300 cursor-pointer
                  border-2 border-transparent hover:border-yellow-300
                  focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50
                  ${stat.extraClass || ''}
                `}
                style={{ backgroundColor: matchMobile ? theme.colors.blue[8] : 'white' }}
                role="button"
                tabIndex={0}
                aria-label={stat.aria}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                  }
                }}
              >
                {needBreak ? (
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${stat.bg} ${stat.bgHover}`}
                      >
                        <Icon
                          className={`w-8 h-8 group-hover:scale-105 transition-all duration-300 ${stat.iconColor}`}
                        />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mobile:text-blue-800 mobile:group-hover:text-blue-900 text-white  transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm mobile:text-gray-600 mobile:group-hover:text-gray-800 text-white transition-colors duration-300 leading-tight">
                      {stat.label}
                    </div>
                    <div
                      className={`w-0 group-hover:w-12 h-1 rounded-full transition-all duration-300 mx-auto bg-gradient-to-r ${stat.barGradient}`}
                    ></div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${stat.bg} ${stat.bgHover}`}
                      >
                        <Icon
                          className={`w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-105 transition-all duration-300 ${stat.iconColor}`}
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-left space-y-1 min-w-0">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-800 group-hover:text-blue-900 transition-colors duration-300">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-tight">
                        {stat.label}
                      </div>
                      <div
                        className={`w-0 group-hover:w-8 sm:group-hover:w-12 h-1 rounded-full transition-all duration-300 bg-gradient-to-r ${stat.barGradient}`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
