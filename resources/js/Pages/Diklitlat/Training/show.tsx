import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/PublicLayout';
import ShowWithOtherLayout from '@/layouts/ShowWithOtherLayout';
import { limitString, stripHTMLTags } from '@/lib/utils';
import { Training, paginatedData } from '@/types/models';
import { GenericViewPage } from '@/types/page-params';
import { Badge, NumberFormatter, Typography } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function Page(props: GenericViewPage<{ training: Training; otherTraining: paginatedData<Training> }>) {
  const { t } = useTranslation();
  const trainingData = props.data.training;
  const badgeMap: Record<string, string> = {
    '1': 'Full Online',
    '2': 'Full Offline',
  };

  const btnColorMapped: Record<string, string> = {
    '1': 'bg-[#0072bc] hover:bg-[#105d8f]',
    '0': 'bg-yellow-500 hover:bg-yellow-600',
  };

  const statusMapped: Record<string, string> = {
    '1': 'Daftar Sekarang',
    '0': 'Ditutup',
  };

  const cardTrainingBtn = (
    <Button
      className={`${btnColorMapped[trainingData.status_pelatihan] ?? ''} text-white px-6 py-7 rounded-lg w-full`}
      disabled={trainingData.status_pelatihan == '1' ? false : true}
    >
      {statusMapped[trainingData.status_pelatihan] ?? 'Selesai'}
    </Button>
  );

  const cardTraining = (
    <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative h-full">
      <div className="relative h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden rounded-t-4xl max-h-[650px]">
          <ImageWithLoading
            src={trainingData.thumbnail_pelatihan}
            alt={trainingData.nama_pelatihan}
            className="w-full h-full object-cover"
            clickable={true}
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-t-4xl -mt-10 relative z-10 py-6 px-2 flex flex-col justify-between flex-1">
          <div className="px-2">
            <span className="flex flex-wrap mb-3 space-x-4 text-xl">
              <h3 className="font-semibold text-[#25455E] mb-3 sm:text-2xl text-justify">
                {trainingData.nama_pelatihan}
              </h3>
              <Badge variant="outline" color="gray" radius="sm" size="xl">
                {badgeMap[trainingData.tipe_pelatihan] ?? 'Hybrid'}
              </Badge>
              <p className="text-[#25455E]">
                <NumberFormatter
                  prefix="Rp. "
                  thousandSeparator="."
                  decimalSeparator=","
                  value={trainingData.biaya_pelatihan}
                />
              </p>
              <div className="flex mb-3 items-center">
                <svg
                  className="w-8 h-8 mr-1"
                  fill={trainingData.total_skp_pelatihan == 0 ? '#c4bf31' : '#31c48d'}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="font-semibold text-[#25455E] truncate max-w-[330px]">
                  {trainingData.total_skp_pelatihan == 0
                    ? 'Total SKP menunggu konfirmasi'
                    : `${trainingData.total_skp_pelatihan} SKP`}
                </p>
              </div>
            </span>
            <div className="flex mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#317bad"
                className="w-5 h-5 mr-1 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-[#25455E] text-md">{trainingData.penyelenggara_pelatihan}</p>
            </div>
            <div className="flex mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#f26522"
                className="w-5 h-5 mr-1 shrink-0"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                  clip-rule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>
              <p className="text-[#25455E] text-md">Kuota {trainingData.kuota_peserta_pelatihan} peserta</p>
            </div>
            <div className="flex mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#80ad31" className="w-6 h-6 mr-1">
                <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                <path
                  fill-rule="evenodd"
                  d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <p className="text-[#25455E] text-md">
                {trainingData.tanggal_mulai_pelatihan.replaceAll('-', '/')} -{' '}
                {trainingData.tanggal_selesai_pelatihan.replaceAll('-', '/')}
              </p>
            </div>
          </div>

          {/* Group pinned at bottom */}
          <div className="mt-auto px-2 py-4">
            {trainingData.status_pelatihan == '1' ? (
              <a href={trainingData.link_gform_pelatihan} target="_blank">
                {cardTrainingBtn}
              </a>
            ) : (
              cardTrainingBtn
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  const cardTrainingDescription = (
    <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative h-full w-full">
      <Typography p={'md'}>
        <p
          dangerouslySetInnerHTML={{ __html: trainingData.deskripsi_pelatihan ?? '' }}
          className="rich-text-typography"
        />
      </Typography>
    </Card>
  );

  return (
    <>
      <AppMeta
        title={trainingData.nama_pelatihan}
        description={stripHTMLTags(trainingData.deskripsi_pelatihan, 300)}
        ogImage={trainingData.thumbnail_pelatihan}
      />
      <PublicLayout {...props}>
        <ShowWithOtherLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Diklitlat' },
                { label: 'Pelatihan', href: route('diklat.training.index') },
                { label: `${limitString(trainingData.nama_pelatihan, 50)}`, href: '#' },
              ]}
            />
          }
          otherText={'Pelatihan ' + t('other', { ns: 'generic' })}
          content={cardTraining}
          contentDescription={trainingData.deskripsi_pelatihan && cardTrainingDescription}
          dataId={trainingData.id}
          initialOT={props.data.otherTraining.data}
          initialOTPaginated={props.data.otherTraining}
          loadOtherDataURL={route('diklat.training.scroll')}
          OTURLSlug="diklat.training.show"
          OTSlugKey="slug"
          OTFileNameKey="thumbnail_pelatihan"
          OTTitleKey="nama_pelatihan"
          OTDateKey="tanggal_mulai_pelatihan"
        />
      </PublicLayout>
    </>
  );
}
