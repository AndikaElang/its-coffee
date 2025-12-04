import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { minimalRichStr } from '@/components/i18n/MinimalRichStr';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { Carousel } from '@mantine/carousel';
import { IconBrandWhatsapp, IconMailFilled, IconPhonePlus } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Page(props: any) {
  const { t } = useTranslation();
  const t_opt = { ns: 'healthService' };
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const images = [
    '/assets/media/layanan-kesehatan/mcu-index-1.jpg',
    '/assets/media/layanan-kesehatan/mcu-index-2.jpg',
    '/assets/media/layanan-kesehatan/mcu-index-3.jpg',
    '/assets/media/layanan-kesehatan/mcu-index-4.jpg',
    '/assets/media/layanan-kesehatan/mcu-index-5.jpg',
    '/assets/media/layanan-kesehatan/mcu-index-6.jpg',
  ];

  return (
    <>
      <AppMeta title="Medical Check Up" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Layanan Kesehatan' },
                { label: 'Medical Check Up', href: '#' },
              ]}
            />
          }
          title={t('mcu.title', t_opt)}
        >
          <ImageWithLoading alt="Hero image" src={'/assets/media/layanan-kesehatan/mcu-index.jpg'} />
          <p className="text-justify whitespace-pre-wrap mt-8">{t('mcu.description', t_opt)}</p>

          <h2 className="text-2xl font-bold text-left text-[#25455E] mt-12">
            {t('mcu.latest-medical-technology', t_opt)}
          </h2>
          <p className="text-justify whitespace-pre-wrap mt-8">
            {t('mcu.latest-medical-technology.1.description', t_opt)}
          </p>
          <Accordion type="single" collapsible className="space-y-4 mt-8">
            {[1, 2, 3].map((val) => (
              <AccordionItem value={`${val}`} className="bg-white rounded-lg shadow-xl border-1">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <p className="font-semibold">{t(`mcu.faq.${val}.title`, t_opt)}</p>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  {minimalRichStr(t(`mcu.faq.${val}.content`, t_opt))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-justify whitespace-pre-wrap mt-8">
            {t('mcu.latest-medical-technology.2.description', t_opt)}
          </p>

          <h2 className="text-2xl font-bold text-left text-[#25455E] mt-12">{t('mcu.one-stop-service', t_opt)}</h2>
          <p className="text-justify whitespace-pre-wrap mt-8">{t('mcu.one-stop-service.description', t_opt)}</p>

          <div className="flex justify-center space-x-4 mt-8">
            <a href="http://bit.ly/MCURSUI" target="_blank" rel="noreferrer">
              <Button className="px-6 py-2 text-white rounded-lg bg-[#0072bc] hover:bg-[#105d8f] transition">
                {t('mcu.package', t_opt)}
              </Button>
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-6 py-2 text-white rounded-lg bg-[#0072bc] hover:bg-[#105d8f] transition">
                  {t('mcu.contact', t_opt)}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{t('mcu.contact', t_opt)}</DialogTitle>
                  {/* <DialogDescription>{t('mcu.contact_description', t_opt)}</DialogDescription> */}
                </DialogHeader>
                <div className="mt-4 space-y-2">
                  <p className="flex items-center space-x-2">
                    <IconMailFilled color="#0072bc" />
                    <span>
                      {t('mcu.contact.email', t_opt)}: <strong>MCU@rs.ui.ac.id</strong>
                    </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <IconPhonePlus color="#0072bc" />
                    <span>
                      {t('mcu.contact.telephone', t_opt)}: <strong>(021) 50829292</strong>
                    </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <IconBrandWhatsapp color="#0072bc" />
                    <span>
                      {t('mcu.contact.whatsapp', t_opt)}:
                      <a
                        href="https://wa.me/628119113913"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#0072bc]"
                      >
                        <strong> (Click Disini)</strong>
                      </a>
                    </span>
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

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
