import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PaginatedCardLayout from '@/layouts/PaginatedCardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { Training } from '@/types/models';
import { ViewPaginateGeneric } from '@/types/page-params';
import { Link } from '@inertiajs/react';
import { Group, NumberFormatter } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function Page(props: ViewPaginateGeneric<Training>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'diklat' };
  const data = props.data.data;
  const pageRoute = 'diklat.training.index';

  const btnColorMapped: Record<string, string> = {
    '1': 'bg-orange-500 hover:bg-orange-600',
    '0': 'bg-yellow-500 hover:bg-yellow-600',
  };

  const statusMapped: Record<string, string> = {
    '1': t('see-more', { ns: 'generic' }),
    '0': t('closed', { ns: 'generic' }),
  };

  const dataMapped = data.map((data) => (
    <Link href={route('diklat.training.show', data.slug)} key={data.id} className="h-full">
      <Card className="py-0 cursor-pointer transition-all duration-300 bg-white border-0 shadow-xl-all hover:shadow-blue-800/12 hover:scale-105 overflow-hidden rounded-4xl transform relative h-full">
        <div className="relative h-full flex flex-col">
          {/* Image */}
          <div className="relative max-h-[320px] overflow-hidden rounded-t-4xl">
            <ImageWithLoading
              src={data.thumbnail_pelatihan}
              alt={data.nama_pelatihan}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-t-4xl -mt-10 relative z-10 py-6 px-2 flex flex-col justify-between flex-1">
            <div>
              <h3 className="font-semibold text-[#25455E] mb-3 sm:text-lg line-clamp-2 text-center">
                {data.nama_pelatihan}
              </h3>
              <span className="flex flex-wrap items-center justify-center mb-3 space-x-2">
                <div className="flex">
                  <svg
                    className="w-6 h-6 mr-1"
                    fill={data.total_skp_pelatihan == 0 ? '#c4bf31' : '#31c48d'}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="font-semibold text-[#25455E] truncate max-w-[270px]">
                    {data.total_skp_pelatihan == 0
                      ? 'Total SKP menunggu konfirmasi'
                      : `${data.total_skp_pelatihan} SKP`}
                  </p>
                </div>
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#317bad"
                    className="w-6 h-6 mr-1 shrink-0 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="font-semibold text-[#25455E] truncate max-w-[270px]">{data.penyelenggara_pelatihan}</p>
                </div>
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
                  {data.tanggal_mulai_pelatihan.replaceAll('-', '/')} -{' '}
                  {data.tanggal_selesai_pelatihan.replaceAll('-', '/')}
                </p>
              </span>
            </div>

            {/* Group pinned at bottom */}
            <div className="mt-auto">
              <Group mt="md" mb="xs">
                <div className="min-[1536px]:max-w-[580px] max-[1536px]:flex max-[1536px]:flex-col max-[1536px]:w-full">
                  <h3 className="color-mantine-blue-8 text-center text-md md:text-xl font-semibold ml-1">
                    <NumberFormatter
                      prefix="Rp. "
                      thousandSeparator="."
                      decimalSeparator=","
                      value={data.biaya_pelatihan}
                    />
                  </h3>
                  <Button
                    className={`min-[1536px]:hidden mt-4 w-full ${btnColorMapped[data.status_pelatihan]} text-white px-6 py-2 rounded-lg font-medium transition-colors`}
                    size="sm"
                  >
                    {statusMapped[data.status_pelatihan] ?? t('finished', { ns: 'generic' })}
                  </Button>
                </div>
                <Button
                  className={`max-[1536px]:hidden ms-auto ${btnColorMapped[data.status_pelatihan]} text-white px-6 py-2 rounded-lg font-medium transition-colors`}
                  size="sm"
                >
                  {statusMapped[data.status_pelatihan] ?? t('finished', { ns: 'generic' })}
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
      <AppMeta title="Pelatihan" />
      <PublicLayout {...props}>
        <PaginatedCardLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[{ label: 'Beranda', href: '/' }, { label: 'Diklitlat' }, { label: 'Pelatihan', href: '#' }]}
            />
          }
          title={t('training', t_opt)}
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
