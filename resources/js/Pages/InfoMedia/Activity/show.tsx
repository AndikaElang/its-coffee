import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/PublicLayout';
import ShowWithOtherLayout from '@/layouts/ShowWithOtherLayout';
import { limitString, stripHTMLTags } from '@/lib/utils';
import { Activity, ActivityWithParticipantTarget, paginatedData } from '@/types/models';
import { GenericViewPage } from '@/types/page-params';
import { Badge, Typography } from '@mantine/core';
import { IconBrandWhatsapp, IconCalendar, IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export default function Page(
  props: GenericViewPage<{
    activity: ActivityWithParticipantTarget;
    otherActivity: paginatedData<Activity>;
  }>,
) {
  const { t } = useTranslation();
  const activityData = props.data.activity;

  const googleCalendarformatDateTime = (dateStr?: string, timeStr?: string) => {
    if (!dateStr) return { ymd: '', hm: '' };

    // Extract components
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hour = 0, minute = 0, second = 0] = timeStr ? timeStr.split(':').map(Number) : [];

    // Create date in local time (no timezone shift)
    const d = new Date(year, month - 1, day, hour, minute, second);

    const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    const hm = `${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`;

    return { ymd, hm };
  };

  const start = googleCalendarformatDateTime(activityData?.tgl_awal ?? undefined, activityData?.jam_awal ?? undefined);
  const end = googleCalendarformatDateTime(activityData?.tgl_akhir ?? undefined, activityData?.jam_akhir ?? undefined);

  const contentBtn = (
    <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center space-y-4 sm:space-y-0 mt-6">
      <a href={activityData.url_daftar ? activityData.url_daftar : '#'} target="_blank" rel="noopener noreferrer">
        <Button className="bg-[#0072bc] hover:bg-[#105d8f] text-white px-6 py-7 rounded-lg">
          <IconPlus /> Daftar
        </Button>
      </a>
      <a href={activityData.url_whatsapp ? activityData.url_whatsapp : '#'} target="_blank" rel="noopener noreferrer">
        <Button className="bg-[#0072bc] hover:bg-[#105d8f] text-white px-6 py-7 rounded-lg">
          <IconBrandWhatsapp /> Whatsapp
        </Button>
      </a>
      <a
        href={`https://calendar.google.com/calendar/r/eventedit?text=${activityData?.judul ?? ''}&dates=${start.ymd}T${start.hm}/${end.ymd}T${end.hm}&details=Judul:+${activityData?.judul ?? ''}+<br>+Selengkapnya+silahkan+kunjungi+tautan+berikut+:+https://rs.ui.ac.id/umum/kegiatan&location=`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="bg-[#0072bc] hover:bg-[#105d8f] text-white px-6 py-7 rounded-lg">
          <IconCalendar /> Kalendar
        </Button>
      </a>
    </div>
  );

  const badgeMapped = (
    <span className="flex flex-wrap justify-center gap-2">
      {activityData.participant_targets.map((target) => (
        <Badge key={target.id}>{target.target_peserta_name}</Badge>
      ))}
    </span>
  );

  const content = (
    <div className="relative h-full flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-4xl max-h-[650px]">
        <ImageWithLoading
          src={activityData.file_name}
          alt={activityData.judul}
          className="object-cover h-[850px]"
          clickable={true}
        />
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-4xl -mt-10 relative z-10 py-6 px-2 flex flex-col justify-between flex-1">
        <div className="px-2">
          <div className="mb-3 text-xl">
            <h3 className="font-semibold text-[#25455E] mb-2 sm:text-2xl text-justify">{activityData.judul}</h3>

            <div className="flex flex-wrap items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f26522" className="w-5 h-5 shrink-0">
                <path
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>

              <span className="flex flex-wrap gap-2">{badgeMapped}</span>
            </div>
          </div>

          <div className="flex mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#80ad31" className="w-6 h-6 mr-1">
              <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
              <path
                fill-rule="evenodd"
                d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
                clip-rule="evenodd"
              />
            </svg>
            <p className="text-[#25455E] text-md">
              {activityData.tgl_awal ? activityData.tgl_awal.replaceAll('-', '/') : ''} -{' '}
              {activityData.tgl_akhir ? activityData.tgl_akhir.replaceAll('-', '/') : ''}
            </p>
          </div>
          <div className="flex mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-2 shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="text-[#25455E] text-md">
              {activityData.jam_awal ? activityData.jam_awal : ''} -{' '}
              {activityData.jam_akhir ? activityData.jam_akhir : ''}
            </p>
          </div>
          <p className="text-[#25455E]">{activityData.htm}</p>
        </div>

        {/* Group pinned at bottom */}
        <div className="mt-auto px-2 py-4">{contentBtn}</div>
      </div>
    </div>
  );

  const contentDescription = (
    <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative h-full w-full">
      <Typography p={'md'}>
        <p dangerouslySetInnerHTML={{ __html: activityData.deskripsi ?? '' }} className="rich-text-typography" />
      </Typography>
    </Card>
  );

  return (
    <>
      <AppMeta
        title={activityData.judul}
        description={activityData.deskripsi ? stripHTMLTags(activityData.deskripsi, 300) : ''}
        ogImage={activityData.file_name ? activityData.file_name : ''}
      />
      <PublicLayout {...props}>
        <ShowWithOtherLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Info & Media' },
                { label: 'Kegiatan', href: route('info-media.kegiatan.index') },
                { label: `${limitString(activityData.judul, 50)}`, href: '#' },
              ]}
            />
          }
          otherText={`${t('activity', { ns: 'infoMedia' })} ` + t('other', { ns: 'generic' })}
          content={content}
          contentDescription={activityData.deskripsi && contentDescription}
          dataId={activityData.id}
          initialOT={props.data.otherActivity.data}
          initialOTPaginated={props.data.otherActivity}
          loadOtherDataURL={route('info-media.kegiatan.scroll')}
          OTURLSlug="info-media.kegiatan.show"
          OTSlugKey="slug"
          OTFileNameKey="file_name"
          OTTitleKey="judul"
          OTDateKey="tgl_awal"
        />
      </PublicLayout>
    </>
  );
}
