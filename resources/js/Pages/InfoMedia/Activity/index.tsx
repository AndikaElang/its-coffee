import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PaginatedCardLayout from '@/layouts/PaginatedCardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { ActivityWithParticipantTarget } from '@/types/models';
import { ViewPaginateGeneric } from '@/types/page-params';
import { Link } from '@inertiajs/react';
import { Badge, Group } from '@mantine/core';
import { IconTag } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export default function Page(props: ViewPaginateGeneric<ActivityWithParticipantTarget>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'infoMedia' };
  const data = props.data.data;
  const pageRoute = 'info-media.kegiatan.index';

  const dataMapped = data.map((data) => (
    <Link href={route('info-media.kegiatan.show', data.slug)} key={data.id} className="h-full">
      <Card className="py-0 *:group cursor-pointer transition-all duration-300 bg-white border-0 shadow-xl-all hover:shadow-blue-800/12 hover:scale-105 overflow-hidden rounded-4xl transform relative h-full">
        <div className="relative h-full flex flex-col">
          {/* Image */}
          <div className="relative max-h-[320px] overflow-hidden rounded-t-4xl h-270">
            <ImageWithLoading src={data.file_name} alt={data.judul} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="bg-white rounded-t-4xl -mt-10 relative z-10 py-6 px-2 flex flex-col justify-between flex-1">
            <div>
              <h3 className="font-semibold text-[#25455E] mb-3 sm:text-lg line-clamp-2 text-center">{data.judul}</h3>
              <span className="flex flex-wrap justify-center mb-3 gap-2">
                {data.participant_targets.map((target) => (
                  <Badge key={target.id}>{target.target_peserta_name}</Badge>
                ))}
              </span>

              <span className="flex items-center justify-center mb-4 sm:text-sm text-xs text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#80ad31" className="w-6 h-6 mr-1">
                  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                  <path
                    fill-rule="evenodd"
                    d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p className="text-gray-600 leading-relaxed sm:text-sm text-xs text-center">
                  {data.tgl_awal ? data.tgl_awal.replaceAll('-', '/') : ''} -{' '}
                  {data.tgl_akhir ? data.tgl_akhir.replaceAll('-', '/') : ''}
                </p>
              </span>
              <span className="flex items-center justify-center mb-4 sm:text-sm text-xs text-center">
                <IconTag className="w-6 h-6 mr-1" color="#757c80" />
                <p className="text-gray-600 leading-relaxed sm:text-sm text-xs text-center">{data.htm}</p>
              </span>
            </div>

            {/* Group pinned at bottom */}
            <div className="mt-auto">
              <Group mt="md" mb="xs">
                <div className="min-[1536px]:max-w-[580px] max-[1536px]:flex max-[1536px]:flex-col max-[1536px]:w-full">
                  <Button
                    className={`min-[1536px]:hidden mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors`}
                    size="sm"
                  >
                    {t('see-more', { ns: 'generic' })}
                  </Button>
                </div>
                <Button
                  className={`max-[1536px]:hidden ms-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors`}
                  size="sm"
                >
                  {t('see-more', { ns: 'generic' })}
                </Button>
              </Group>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  ));

  return (
    <>
      <AppMeta title="Kegiatan" />
      <PublicLayout {...props}>
        <PaginatedCardLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[{ label: 'Beranda', href: '/' }, { label: 'Info & Media' }, { label: 'Kegiatan', href: '#' }]}
            />
          }
          title={t('activity', t_opt)}
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
