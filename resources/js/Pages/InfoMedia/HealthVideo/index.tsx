import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import AppMeta from '@/components/Meta/AppMeta';
import { Card } from '@/components/ui/card';
import PaginatedCardLayout from '@/layouts/PaginatedCardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { ArticleNewsVideo } from '@/types/models';
import { ViewPaginateGeneric } from '@/types/page-params';
import { Anchor } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export default function Page(props: ViewPaginateGeneric<ArticleNewsVideo>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'infoMedia' };
  const data = props.data.data;
  const pageRoute = 'info-media.videoKesehatan.index';

  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;

    // Pattern untuk berbagai format YouTube URL
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtube\.com\/v\/)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const getYouTubeThumbnail = (url: string): string => {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      // Gunakan hqdefault sebagai fallback jika maxresdefault tidak tersedia
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return '/assets/media/example/video-placeholder.jpg';
  };

  const dataMapped = data.map((item) => (
    <Card
      key={item.id || item.judul}
      className="group py-0 cursor-pointer transition-all duration-300 bg-white border-0 shadow-xl hover:shadow-blue-800/12 hover:scale-102 overflow-hidden rounded-3xl transform relative h-full"
    >
      <div className="relative h-full flex flex-col">
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
          <img src={getYouTubeThumbnail(item.link ?? '')} alt={item.judul} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
            Video
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Anchor
              href={item.link ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3 group block"
            >
              <img
                src={getYouTubeThumbnail(item.link ?? '')}
                alt={item.judul}
                className="w-full h-full object-cover transition-transform"
              />
              <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                Video
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 rounded-full p-3 shadow-lg">
                  <IconPlayerPlay size={40} className="text-white" fill="currentColor" />
                </div>
              </div>
            </Anchor>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-t-4xl -mt-10 relative z-10 py-6 px-2 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-[#25455E] mb-3 leading-tight">{item.judul}</h3>
          <p
            className="text-sm text-gray-600 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: item.deskripsi ?? '' }}
          />
        </div>
      </div>
    </Card>
  ));

  return (
    <>
      <AppMeta title="Video Kesehatan" />
      <PublicLayout {...props}>
        <PaginatedCardLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Info & Media' },
                { label: 'Video kesehatan', href: '#' },
              ]}
            />
          }
          title={t('Video Kesehatan', t_opt)}
          data={dataMapped}
          currentPage={props.data.current_page}
          pageRoute={pageRoute}
          total={props.data.total}
          perPage={4}
          gridCols={{ base: 1, md: 2, lg: 2, xl: 2 }}
        />
      </PublicLayout>
    </>
  );
}
