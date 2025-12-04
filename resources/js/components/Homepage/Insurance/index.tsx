'use client';

import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Insurance } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Group } from '@mantine/core';
import { MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import homepageStyle from '~/css/Homepage.module.css';

import styles from './Insurance.module.css';

export default function InsuranceMarquee(props: PageProps & { ns: string; insurances: Insurance[] }) {
  const { t } = useTranslation();
  const t_opt = { ns: props.ns };
  const midpoint = Math.ceil(props.insurances.length / 2);

  const topItems = props.insurances.slice(0, midpoint);
  const bottomItems = props.insurances.slice(midpoint);

  const LogoItem = ({ company, index, prefix }: { company: any; index: number; prefix: string }) => (
    <a key={company.id} href={company.link ? company.link : '/'} target="_blank" rel="noreferrer noopener">
      <div key={`${prefix}-${index}`} className={styles.logoItem}>
        <ImageWithLoading
          src={company.logo || '/placeholder.svg'}
          alt={`${company.name} logo`}
          className={styles.logoImage + ' w-[120px] h-[60px]'}
        />
      </div>
    </a>
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header Section */}
        <div className="container mx-auto max-xs:px-4">
          <div className={cn(homepageStyle.header, 'mb-8')}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold color-mantine-blue-8">{t('asuransi', t_opt)}</h2>
            </div>
            <Link href={route('others.insurance.index')} className={`${homepageStyle['header-link']} mt-4 sm:mt-0`}>
              <Group gap="xs" align="center" wrap="nowrap">
                {t('asuransi.lihat-semua', t_opt)} <MoveRight size={20} />
              </Group>
            </Link>
          </div>
        </div>

        {/* Marquee Container */}
        <div className={styles.marqueeContainer}>
          {/* First Row - Right to Left */}
          <div className={`${styles.marqueeRow} ${styles.animate}`}>
            {/* Triple the logos for seamless loop */}
            {[...Array(3)].map((_, setIndex) =>
              topItems.map((company, index) => (
                <LogoItem
                  key={`row1-set${setIndex}-${index}`}
                  company={company}
                  index={index}
                  prefix={`row1-set${setIndex}`}
                />
              )),
            )}
          </div>

          {/* Second Row - Right to Left (slightly different speed) */}
          <div className={`${styles.marqueeRow} ${styles.animate} ${styles.rowOffset}`}>
            {/* Triple the logos for seamless loop */}
            {[...Array(3)].map((_, setIndex) =>
              bottomItems.map((company, index) => (
                <LogoItem
                  key={`row2-set${setIndex}-${index}`}
                  company={company}
                  index={index}
                  prefix={`row2-set${setIndex}`}
                />
              )),
            )}
          </div>

          {/* Gradient overlays for smooth fade effect */}
          <div className={styles.gradientLeft}></div>
          <div className={styles.gradientRight}></div>
        </div>
      </div>
    </div>
  );
}
