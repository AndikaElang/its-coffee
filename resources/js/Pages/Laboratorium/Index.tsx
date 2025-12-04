import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { minimalRichStr } from '@/components/i18n/MinimalRichStr';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
    '/assets/media/layanan-kesehatan/laboratorium-index-1.jpg',
    '/assets/media/layanan-kesehatan/laboratorium-index-2.jpg',
    '/assets/media/layanan-kesehatan/laboratorium-index-3.jpg',
    '/assets/media/layanan-kesehatan/laboratorium-index-4.jpg',
    '/assets/media/layanan-kesehatan/laboratorium-index-5.jpg',
    '/assets/media/layanan-kesehatan/laboratorium-index-6.jpg',
  ];

  return (
    <>
      <AppMeta title="Laboratorium" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Layanan Kesehatan' },
                { label: 'Laboratorium', href: '#' },
              ]}
            />
          }
          title={t('laboratory.title', t_opt)}
        >
          <ImageWithLoading alt="Hero image" src={'/assets/media/layanan-kesehatan/laboratorium-index.jpg'} />
          <p className="text-justify whitespace-pre-wrap mt-8">{minimalRichStr(t('laboratory.description', t_opt))}</p>

          <Accordion type="single" collapsible className="space-y-4 mt-8">
            {[1, 2, 3, 4, 5, 6].map((val) => (
              <AccordionItem value={`${val}`} className="bg-white rounded-lg shadow-xl border-1">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <p className="font-semibold">{t(`laboratory.faq.${val}.title`, t_opt)}</p>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  {minimalRichStr(t(`laboratory.faq.${val}.content`, t_opt))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="w-full mx-auto mt-8">
            <Carousel
              withIndicators
              height={400}
              slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
              slideGap="md"
              plugins={[autoplay.current]}
              className="rounded-xl shadow-lg"
            >
              {images.map((src, index) => (
                <Carousel.Slide key={index}>
                  <ImageWithLoading
                    src={src}
                    alt={`Medical Check Up ${index + 1}`}
                    className="w-full h-full"
                    clickable={true}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
