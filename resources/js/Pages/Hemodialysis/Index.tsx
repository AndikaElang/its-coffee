import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Page(props: any) {
  const { t } = useTranslation();
  const t_opt = { ns: 'healthService' };

  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const images = [
    '/assets/media/layanan-kesehatan/hemodialisis-index-1.jpg',
    '/assets/media/layanan-kesehatan/hemodialisis-index-2.jpg',
    '/assets/media/layanan-kesehatan/hemodialisis-index-3.jpg',
    '/assets/media/layanan-kesehatan/hemodialisis-index-4.jpg',
    '/assets/media/layanan-kesehatan/hemodialisis-index-5.jpg',
    '/assets/media/layanan-kesehatan/hemodialisis-index-6.jpg',
  ];

  return (
    <>
      <AppMeta title="Hemodialisis" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Layanan Kesehatan' },
                { label: 'Hemodialisis', href: '#' },
              ]}
            />
          }
          title={t('hemodialysis.title', t_opt)}
        >
          <ImageWithLoading alt="Hero image" src={'/assets/media/layanan-kesehatan/hemodialisis-index.jpg'} />
          <p className="text-justify whitespace-pre-wrap mt-8">{t('hemodialysis.description', t_opt)}</p>

          <div className="w-full mx-auto mt-8">
            <Carousel
              withIndicators
              height={400}
              slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
              slideGap="md"
              plugins={[autoplay.current]}
              className="rounded-xl shadow-lg"
              emblaOptions={{
                loop: true,
              }}
            >
              {images.map((src, index) => (
                <Carousel.Slide key={index}>
                  <div className="relative w-full h-[400px]">
                    <ImageWithLoading
                      src={src}
                      alt={`Medical Check Up ${index + 1}`}
                      className="w-full h-full"
                      clickable={true}
                    />
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
