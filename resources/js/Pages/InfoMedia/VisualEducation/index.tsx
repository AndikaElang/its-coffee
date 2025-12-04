import { VisualEducationCard } from '@/components/Card/VisualEducationCard';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import AppMeta from '@/components/Meta/AppMeta';
import PaginatedCardLayout from '@/layouts/PaginatedCardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { ViewPaginateVisualEducation } from '@/types/page-params';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export default function Page(props: ViewPaginateVisualEducation) {
  const { t } = useTranslation();
  const t_opt = { ns: 'infoMedia' };
  const data = props.visualEducations.data;
  const pageRoute = 'info-media.edukasiVisual.index';

  const dataMapped = data.map((data) => {
    return (
      <VisualEducationCard
        id={data.id}
        title={data.judul ?? ''}
        image={data.file_name ?? ''}
        description={data.deskripsi}
        totalDownload={data.count ?? 0}
        date={dayjs(new Date(data.tanggal!)).format('DD-MM-YYYY')}
        category_id={data.kategori_id ?? 0}
        category_name={data.nama_kategori ?? ''}
        key={data.id}
      />
    );
  });

  return (
    <>
      <AppMeta title="Edukasi Visual" />
      <PublicLayout {...props}>
        <PaginatedCardLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Info & Media' },
                { label: 'Edukasi Visual', href: '#' },
              ]}
            />
          }
          title={t('visual-education', t_opt)}
          data={dataMapped}
          currentPage={props.visualEducations.current_page}
          pageRoute={pageRoute}
          total={props.visualEducations.total}
          gridCols={{ xs: 1, sm: 2 }}
          perPage={4}
          params={{ category: props.selectedCategory ?? '' }}
        />
      </PublicLayout>
    </>
  );
}
