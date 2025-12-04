import NormalCard, { GenericDescription } from '@/components/Card/NormalCard';
import { MD_BREAKPOINT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { PolyClinic } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import classes from '~/css/Carousel.module.css';
import homepageStyle from '~/css/Homepage.module.css';

export default function COE(props: PageProps & { ns: string; polyclinics: PolyClinic[] }) {
  const { t } = useTranslation();
  const t_opt = { ns: props.ns };
  const data = props.polyclinics;
  const matchMd = useMediaQuery(MD_BREAKPOINT);

  return (
    <div className="py-12" id="coe" style={{ scrollMarginTop: '120px' }}>
      <div className="container mx-auto max-xs:px-4">
        {/* Header */}
        <div className={homepageStyle.header}>
          <div>
            <h2 className="text-4xl font-bold text-left color-mantine-blue-8 mb-4">{t('coe', t_opt)}</h2>
            <p className="text-left text-gray-600 text-xl">{t('coe.description', t_opt)}</p>
          </div>
        </div>

        {/* Carousel Card */}
        <div className={cn(matchMd && 'overflow-hidden', 'pt-6')}>
          {matchMd ? (
            <Carousel
              withIndicators
              slideSize={{ base: '50%', sm: '40%', md: '30%', lg: '25%' }}
              slideGap={'xl'}
              emblaOptions={{ loop: true, align: 'start' }}
              classNames={classes}
            >
              {data.map((card, i) => (
                <Carousel.Slide key={i} className="pt-4 mb-12">
                  <Link href={route('service.polyclinic.show', card.id)}>
                    <NormalCard
                      key={card.id}
                      title={card.judul}
                      image={card.img_file_name}
                      description={
                        <GenericDescription description={card.deskripsi ?? ''} title={card.judul} isHtml={true} />
                      }
                    />
                  </Link>
                </Carousel.Slide>
              ))}
            </Carousel>
          ) : (
            <div className="grid grid-cols-4 gap-6 mt-4">
              {data.map((card) => (
                <Link href={route('service.polyclinic.show', card.id)}>
                  <NormalCard
                    key={card.id}
                    title={card.judul}
                    image={card.img_file_name}
                    description={
                      <GenericDescription description={card.deskripsi ?? ''} title={card.judul} isHtml={true} />
                    }
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
