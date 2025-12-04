import NormalCard, { GenericDescription } from '@/components/Card/NormalCard';
import { TABLET_BREAKPOINT } from '@/lib/constants';
import { PageProps } from '@/types';
import { SpecialOffer } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Carousel } from '@mantine/carousel';
import { Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import classes from '~/css/Carousel.module.css';
import homepageStyle from '~/css/Homepage.module.css';

export default function Promotion(props: PageProps & { ns: string; specialOffers: SpecialOffer[] }) {
  const { t } = useTranslation();
  const t_opt = { ns: props.ns };
  const data = props.specialOffers;
  const matchTablet = useMediaQuery(TABLET_BREAKPOINT);

  return (
    <div className="pt-12">
      <div className="container mx-auto max-xs:px-4">
        <div className={homepageStyle.header}>
          <div>
            <h2 className="text-4xl font-bold text-left color-mantine-blue-8 mb-4">{t('promo', t_opt)}</h2>
            <p className="text-left text-gray-600 text-xl">{t('promo.description', t_opt)}</p>
          </div>
          <Link href={route('info-media.promosi.index')} className={`${homepageStyle['header-link']} mt-4 sm:mt-0`}>
            <Group gap="xs" align="center" wrap="nowrap">
              {t('promo.view-all', t_opt)} <MoveRight size={20} />
            </Group>
          </Link>
        </div>

        <div className="mx-auto overflow-hidden">
          <Carousel
            withIndicators
            slideSize={{ base: '50%', sm: '40%', md: '30%', lg: '25%' }}
            slideGap={'xl'}
            emblaOptions={{ loop: true, align: 'start' }}
            classNames={classes}
          >
            {data.map((card, i) => (
              <Carousel.Slide key={i} className="pt-12 pb-12">
                <Link href={card.link ?? '#'}>
                  <NormalCard
                    key={card.id}
                    title={card.judul ? card.judul : ''}
                    image={card.file_name ? card.file_name : ''}
                    description={
                      <GenericDescription description={card.deskripsi ?? ''} title={card.judul ?? ''} isHtml={true} />
                    }
                  />
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
