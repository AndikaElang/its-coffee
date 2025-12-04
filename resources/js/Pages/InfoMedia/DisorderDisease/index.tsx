import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import AlphabetFilter from '@/components/DisorderDisease/AlphabetFilter';
import ConditionsList from '@/components/DisorderDisease/ConditionList';
import AppMeta from '@/components/Meta/AppMeta';
import { NotifyError } from '@/components/Notifications/Notify';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { DisorderDisease } from '@/types/models';
import { router } from '@inertiajs/react';
import { Center, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Page(props: PageProps<{ data: DisorderDisease[]; letter: string }>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'infoMedia' };

  const [selected, setSelected] = useState<string>(props.letter);
  const [loading, setLoading] = useState(false);

  function handleSelect(letter: string) {
    setSelected(letter);

    router.get(
      route('info-media.disorderDisease.index'),
      { letter },
      {
        replace: true,
        preserveScroll: true,
        preserveState: true,
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
        onError: () => NotifyError('Terjadi kesalahan saat memuat data.'),
      },
    );
  }

  useEffect(() => {
    setSelected(props.letter);
  }, [props.letter]);

  return (
    <>
      <AppMeta title="Info Kelainan dan Penyakit" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Info & Media' },
                { label: 'Info Kelainan dan Penyakit', href: '#' },
              ]}
            />
          }
          title={t('disorder-disease', t_opt)}
        >
          <p className="mb-6 text-muted-foreground">{t('disorder-disease.description', t_opt)}</p>

          {/* Alphabet Selector */}
          <AlphabetFilter selected={selected} onSelect={handleSelect} />

          <section className="mt-10 relative">
            {loading ? (
              <Center h={300}>
                <Loader size={30} />
              </Center>
            ) : (
              <ConditionsList items={props.data} selected={selected} />
            )}
          </section>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
