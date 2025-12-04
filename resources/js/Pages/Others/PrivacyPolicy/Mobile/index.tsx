import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { minimalRichStr } from '@/components/i18n/MinimalRichStr';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { Typography } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function Page(props: any) {
  const { t } = useTranslation();
  const t_opt = { ns: 'others' };

  return (
    <>
      <AppMeta title="Kebijakan Privasi - RSUI Mobile" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Kebijakan Privasi - RSUI Mobile', href: '#' },
              ]}
            />
          }
          title={t('privacy-rsui-mobile.title', t_opt)}
        >
          <ImageWithLoading
            alt="Hero image"
            src={'/assets/media/logo-full.png'}
            className="flex justify-center"
            imageClassname="lg:h-[600px] lg:w-[1000px]"
          />
          <Typography p={'md'}>
            <p className="text-justify whitespace-pre-wrap">
              {minimalRichStr(t('privacy-rsui-mobile.description', t_opt))}
            </p>

            {Array.from({ length: 8 }, (_, i) => i + 1).map((val) => (
              <div key={val} className="mt-8">
                <h2 className="text-[#25455E]">
                  {val}. {t(`privacy-rsui-mobile.sub.${val}.title`, t_opt)}
                </h2>
                <p className="text-justify whitespace-pre-wrap">
                  {minimalRichStr(t(`privacy-rsui-mobile.sub.${val}.content`, t_opt))}
                </p>
              </div>
            ))}
          </Typography>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
