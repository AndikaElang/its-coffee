import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Card, CardContent } from '@/components/ui/card';
import PaginatedCardLayout from '@/layouts/PaginatedCardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { Insurance } from '@/types/models';
import { ViewPaginateGeneric } from '@/types/page-params';
import { useTranslation } from 'react-i18next';

export default function Page(props: ViewPaginateGeneric<Insurance>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'others' };
  const data = props.data.data;
  const initialKeyword = props.keyword;
  const pageRoute = 'others.insurance.index';

  const dataMapped = data.map((item) => (
    <Card className="hover:shadow-lg hover:scale-102 transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
        {/* Logo Container */}
        <div className="w-30 h-30 flex items-center justify-center bg-muted rounded-lg p-2">
          <ImageWithLoading
            src={item.logo || '/placeholder.svg'}
            alt={`${item.nama} logo`}
            className="w-full h-full object-contain"
            clickable={true}
          />
        </div>

        {/* Company Name */}
        <a href={item.link ?? '#'} target="__blank" rel="noreferrer noopener">
          <h3 className="text-xl font-semibold text-foreground line-clamp-2 color-mantine-blue-8 hover:underline cursor-pointer">
            {item.nama}
          </h3>
        </a>
      </CardContent>
    </Card>
  ));

  return (
    <>
      <AppMeta title="Asuransi" />
      <PublicLayout {...props}>
        <PaginatedCardLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Asuransi', href: '#' },
              ]}
            />
          }
          title={t('insurance', t_opt)}
          data={dataMapped}
          currentPage={props.data.current_page}
          pageRoute={pageRoute}
          total={props.data.total}
          perPage={8}
          withSearch={true}
          searchKeyword={initialKeyword}
        />
      </PublicLayout>
    </>
  );
}
