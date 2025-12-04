import { BuletinCard } from '@/components/Card/BuletinCard';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import AppMeta from '@/components/Meta/AppMeta';
import PaginatedCardLayout from '@/layouts/PaginatedCardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { HealthyTalkNewsletter } from '@/types/models';
import { ViewPaginateGeneric } from '@/types/page-params';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export default function Page(props: ViewPaginateGeneric<HealthyTalkNewsletter>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'infoMedia' };
  const data = props.data.data;
  const pageRoute = 'info-media.buletin.index';

  const dataMapped = data.map((data) => {
    return (
      <BuletinCard
        id={data.id}
        title={data.judul ?? ''}
        image={data.image_name ?? ''}
        totalDownload={data.count ?? 0}
        date={dayjs(new Date(data.created_at!)).format('DD-MM-YYYY')}
        description={data.deskripsi}
        key={data.id}
      />
    );
  });

  return (
    <>
      <AppMeta title="Buletin Bicara Sehat" />
      <PublicLayout {...props}>
        <PaginatedCardLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Info & Media' },
                { label: 'Buletin Bicara sehat', href: '#' },
              ]}
            />
          }
          title={t('buletin', t_opt)}
          data={dataMapped}
          currentPage={props.data.current_page}
          pageRoute={pageRoute}
          total={props.data.total}
          gridCols={{ xs: 1, sm: 2 }}
          perPage={4}
        />
      </PublicLayout>
    </>
  );
}
