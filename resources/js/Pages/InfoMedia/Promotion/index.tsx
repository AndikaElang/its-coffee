import NormalCard, { GenericDescription } from '@/components/Card/NormalCard';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import AppMeta from '@/components/Meta/AppMeta';
import PaginatedCardLayout from '@/layouts/PaginatedCardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { Promotion } from '@/types/models';
import { ViewPaginateGeneric } from '@/types/page-params';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Page(props: ViewPaginateGeneric<Promotion>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'infoMedia' };
  const data = props.data.data;
  const pageRoute = 'info-media.promosi.index';

  const dataMapped = data.map((data) => {
    return (
      <Link href={route('info-media.promosi.show', data.slug)}>
        <NormalCard
          title={data.judul ?? ''}
          image={data.files ? data.files[0].file_name : ''}
          description={<GenericDescription description={data.deskripsi ?? ''} title={data.judul ?? ''} isHtml={true} />}
          useOnCarousel={false}
        />
      </Link>
    );
  });

  return (
    <>
      <AppMeta title="Promosi" />
      <PublicLayout {...props}>
        <PaginatedCardLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[{ label: 'Beranda', href: '/' }, { label: 'Info & Media' }, { label: 'Promosi', href: '#' }]}
            />
          }
          title={t('promotion', t_opt)}
          data={dataMapped}
          currentPage={props.data.current_page}
          pageRoute={pageRoute}
          total={props.data.total}
          perPage={8}
        />
      </PublicLayout>
    </>
  );
}
