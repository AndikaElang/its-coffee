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
      <AppMeta title="Pendidikan" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[{ label: 'Beranda', href: '/' }, { label: 'Diklitlat' }, { label: 'Pendidikan', href: '#' }]}
            />
          }
          title={t('education.title', t_opt)}
        >
          <ImageWithLoading alt="Hero image" src={'/assets/media/diklat/education.jpg'} />
          <p className="text-justify whitespace-pre-wrap mt-8">{t('education.description', t_opt)}</p>

          <h2 className="text-2xl font-bold text-left color-mantine-blue-8 mt-12">
            {t('education.how-to-apply', t_opt)}
          </h2>

          <Accordion type="single" collapsible className="space-y-4 mt-8">
            <AccordionItem value={`1`} className="bg-white rounded-lg shadow-xl border-1">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <p className="font-semibold">{t(`education.faq.1.title`, t_opt)}</p>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <ImageWithLoading alt="Diagram" src={'/assets/media/diklat/flowchart-pendidikan.jpg'} />
              </AccordionContent>
            </AccordionItem>
            {[2, 3, 4].map((val) => (
              <AccordionItem value={`${val}`} className="bg-white rounded-lg shadow-xl border-1">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <p className="font-semibold">{t(`education.faq.${val}.title`, t_opt)}</p>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  {minimalRichStr(t(`education.faq.${val}.content`, t_opt))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
