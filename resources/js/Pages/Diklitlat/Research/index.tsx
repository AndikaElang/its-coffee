import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { minimalRichStr } from '@/components/i18n/MinimalRichStr';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { useTranslation } from 'react-i18next';

export default function Page(props: any) {
  const { t } = useTranslation();
  const t_opt = { ns: 'diklat' };

  return (
    <>
      <AppMeta title="Penelitian" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[{ label: 'Beranda', href: '/' }, { label: 'Diklitlat' }, { label: 'Penelitian', href: '#' }]}
            />
          }
          title={t('research', t_opt)}
        >
          <ImageWithLoading alt="Hero image" src={'/assets/media/diklat/riset.jpg'} />
          <p className="text-justify whitespace-pre-wrap mt-8">{t('research.content', t_opt)}</p>

          <h2 className="text-2xl font-bold text-left color-mantine-blue-8 mt-12">{t('research.flow.title', t_opt)}</h2>
          <ImageWithLoading alt="Diagram" src={'/assets/media/diklat/diagram-deskripsi.png'} className="mt-2" />

          <div className="mt-8 space-y-4 flex flex-col">
            <h3 className="text-xl font-bold text-left color-mantine-blue-8 mb-2">
              {t('research.flow.1.title', t_opt)}
            </h3>
            <p className="text-justify whitespace-pre-wrap">{t('research.flow.1.content', t_opt)}</p>

            <h3 className="text-xl font-bold text-left color-mantine-blue-8 mb-2">
              {t('research.flow.2.title', t_opt)}
            </h3>
            <p className="text-justify whitespace-pre-wrap">{t('research.flow.2.content', t_opt)}</p>

            <h3 className="text-xl font-bold text-left color-mantine-blue-8 mb-2">
              {t('research.flow.3.title', t_opt)}
            </h3>
            <p className="text-justify whitespace-pre-wrap">{t('research.flow.3.content', t_opt)}</p>

            <h3 className="text-xl font-bold text-left color-mantine-blue-8 mb-2">
              {t('research.flow.4.title', t_opt)}
            </h3>
            <p className="text-justify whitespace-pre-wrap">{t('research.flow.4.content', t_opt)}</p>
          </div>

          <Accordion type="multiple" className="space-y-4 mt-8">
            {[1, 2].map((val, i) => (
              <AccordionItem key={val} value={`faq-${i + 1}`} className="bg-white rounded-lg shadow-xl border-1">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <p className="font-medium">{t(`research.flow.faq.${i + 1}.title`, t_opt)}</p>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <Accordion type="single" collapsible className="space-y-4">
                    {/* gambar */}
                    <AccordionItem value={`faq-${i + 1}-1`} className="bg-white rounded-lg shadow-sm border-1">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        {t(`research.flow.faq.${i + 1}.diagram`, t_opt)}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <ImageWithLoading
                          alt="Diagram"
                          src={`/assets/media/diklat/faq-${i + 1}.png`}
                          className="mt-2"
                        />
                      </AccordionContent>
                    </AccordionItem>
                    {/* alur */}
                    <AccordionItem value={`faq-${i + 1}-2`} className="bg-white rounded-lg shadow-sm border-1">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        {t(`research.flow.faq.${i + 1}.flow`, t_opt)}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 whitespace-pre-wrap">
                        <ol className="list-decimal text-justify space-y-4">
                          {minimalRichStr(t(`research.flow.faq.${i + 1}.flow.content`, t_opt))}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    {/* kontak */}
                    <AccordionItem value={`faq-${i + 1}-3`} className="bg-white rounded-lg shadow-sm border-1">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        {t(`research.flow.faq.${i + 1}.contact`, t_opt)}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 whitespace-pre-wrap">
                        {minimalRichStr(t(`research.flow.faq.${i + 1}.contact.content`, t_opt))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
