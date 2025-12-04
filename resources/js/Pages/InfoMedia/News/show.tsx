import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { NotifyError } from '@/components/Notifications/Notify';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/PublicLayout';
import ShowWithOtherLayout from '@/layouts/ShowWithOtherLayout';
import { limitString, stripHTMLTags } from '@/lib/utils';
import { News, paginatedData } from '@/types/models';
import { GenericViewPage } from '@/types/page-params';
import { Typography } from '@mantine/core';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Page(props: GenericViewPage<{ news: News; otherNews: paginatedData<News> }>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'infoMedia' };
  const newsData = props.data.news;

  const [downloading, setDownloading] = useState(false);

  const dl = async () => {
    try {
      setDownloading(true);
      const response = await axios.post(
        route('info-media.berita.download'),
        { id: newsData.id },
        {
          responseType: 'blob', // Important: tells axios to handle binary data
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Create a blob URL from the response
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = newsData.judul || `newsletter-${newsData.id}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloading(false);
    } catch (error) {
      console.error('Error downloading file:', error);
      NotifyError('Gagal mendownload file. Silakan coba lagi.', `${error}`);
    } finally {
      setDownloading(false);
    }
  };

  const content = (
    <ImageWithLoading
      src={newsData.image_name}
      alt={newsData.judul ? newsData.judul : ''}
      imageClassname="object-contain"
      clickable={true}
    />
  );

  const contentDescription = (
    <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative h-full w-full">
      <Typography p={'md'}>
        <h2 className="font-semibold text-[#25455E] mb-3 sm:text-2xl text-justify">
          {newsData.judul ? newsData.judul : ''}
        </h2>
        <div className="flex mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#80ad31" className="w-6 h-6 mr-1">
            <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
            <path
              fill-rule="evenodd"
              d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
              clip-rule="evenodd"
            />
          </svg>
          <p className="text-[#25455E] text-md">{dayjs(new Date(newsData.created_at!)).format('DD-MM-YYYY')}</p>
        </div>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
          <p className="font-semibold mr-2">{t('news.attachment', t_opt)}:</p>
          <Button
            className={`h-6 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition`}
            size="lg"
            onClick={dl}
            disabled={downloading}
          >
            <span>{downloading ? t('downloading', { ns: 'generic' }) : t('download', { ns: 'generic' })}</span>
          </Button>
        </div>
        <p dangerouslySetInnerHTML={{ __html: newsData.deskripsi ?? '' }} className="rich-text-typography" />
      </Typography>
    </Card>
  );

  return (
    <>
      <AppMeta
        title={newsData.judul ? newsData.judul : 'Berita RSUI'}
        description={newsData.deskripsi ? stripHTMLTags(newsData.deskripsi, 300) : ''}
        ogImage={newsData.image_name ? newsData.image_name : ''}
      />
      <PublicLayout {...props}>
        <ShowWithOtherLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Info & Media' },
                { label: 'Berita', href: route('info-media.berita.index') },
                { label: `${limitString(newsData.judul ? newsData.judul : '', 50)}`, href: '#' },
              ]}
            />
          }
          otherText={`${t('news', { ns: 'infoMedia' })} ` + t('other', { ns: 'generic' })}
          content={content}
          contentDescription={newsData.deskripsi && contentDescription}
          dataId={newsData.id}
          initialOT={props.data.otherNews.data}
          initialOTPaginated={props.data.otherNews}
          loadOtherDataURL={route('info-media.berita.scroll')}
          OTURLSlug="info-media.berita.show"
          OTSlugKey="slug"
          OTFileNameKey="image_name"
          OTTitleKey="judul"
          OTDateKey="created_at"
        />
      </PublicLayout>
    </>
  );
}
