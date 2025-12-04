import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import AppMeta from '@/components/Meta/AppMeta';
import { minimalRichStr } from '@/components/i18n/MinimalRichStr';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { useTranslation } from 'react-i18next';

export default function Page(props: any) {
  const { t } = useTranslation();
  const t_opt = { ns: 'infoMedia' };

  return (
    <>
      <AppMeta title="FAQ" />
      <PublicLayout {...props}>
        <ContentLayout
          title="FAQ"
          breadCrumb={
            <CustomBreadcrumb
              items={[{ label: 'Beranda', href: '/' }, { label: 'Info & Media' }, { label: 'FAQ', href: '#' }]}
            />
          }
        >
          <Accordion type="single" collapsible className="space-y-4 mt-8">
            <AccordionItem value="1" className="bg-white rounded-lg shadow-xl border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <p className="font-bold">{t(`faq.1.title`, t_opt)}</p>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6 space-y-4">
                <div>{minimalRichStr(t(`faq.1.content`, t_opt))}</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="2" className="bg-white rounded-lg shadow-xl border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <p className="font-bold">{t(`faq.2.title`, t_opt)}</p>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <Accordion type="single" collapsible className="ml-4 border-l pl-4 space-y-3">
                  {Array.from({ length: 21 }, (_, i) => i + 1).map((val) => (
                    <AccordionItem value={`2-${val}`} className="bg-gray-50 rounded-lg border">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <p className="font-semibold">{t(`faq.2.sub.${val}.title`, t_opt)}</p>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        {minimalRichStr(t(`faq.2.sub.${val}.content`, t_opt))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="3" className="bg-white rounded-lg shadow-xl border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <p className="font-bold">{t(`faq.3.title`, t_opt)}</p>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <Accordion type="single" collapsible className="ml-4 border-l pl-4 space-y-3">
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((val) => (
                    <AccordionItem value={`3-${val}`} className="bg-gray-50 rounded-lg border">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <p className="font-semibold">{t(`faq.3.sub.${val}.title`, t_opt)}</p>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        {minimalRichStr(t(`faq.3.sub.${val}.content`, t_opt))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
