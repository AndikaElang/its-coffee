import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Card } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/PublicLayout';
import ShowWithOtherLayout from '@/layouts/ShowWithOtherLayout';
import { limitString, stripHTMLTags } from '@/lib/utils';
import { ArticleWithCategoryAndFile, paginatedData } from '@/types/models';
import { GenericViewPage } from '@/types/page-params';
import { Link } from '@inertiajs/react';
import { Carousel } from '@mantine/carousel';
import { Button, Typography } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Page(
  props: GenericViewPage<{
    article: ArticleWithCategoryAndFile;
    otherArticle: paginatedData<ArticleWithCategoryAndFile>;
  }>,
) {
  const { t } = useTranslation();
  const articleData = props.data.article;
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const haveMoreThanOneImage = articleData.files?.length ? articleData.files?.length > 1 : false;

  const carouselPlugins = haveMoreThanOneImage ? [autoplay.current] : [];

  const cardArticle = (
    <Carousel
      plugins={carouselPlugins}
      onMouseEnter={() => {
        if (haveMoreThanOneImage) autoplay.current.stop();
      }}
      onMouseLeave={() => {
        if (haveMoreThanOneImage) autoplay.current.play();
      }}
      emblaOptions={{ loop: true, align: 'center' }}
      withControls={haveMoreThanOneImage}
    >
      {articleData.files?.map((file, i) => (
        <Carousel.Slide key={file.id + i}>
          <ImageWithLoading
            src={articleData.files ? file.file_name : ''}
            alt={articleData.judul ? articleData.judul : ''}
            imageClassname="object-contain"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );

  const cardArticleDescription = (
    <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative h-full w-full">
      <Typography p={'md'}>
        <span className="flex items-center mb-3">
          <span className="flex flex-wrap justify-center gap-2">
            {articleData.categories &&
              articleData.categories.map((category) => (
                <Link
                  href={route('info-media.popularArticle.index', { page: 1, category: category.kategori_name })}
                  key={category.id}
                >
                  <Button variant="outline" size="xs" radius="xl" color="gray">
                    {category.kategori_name}
                  </Button>
                </Link>
              ))}
          </span>
        </span>
        <div className="flex flex-wrap items-center mb-3 gap-y-1 space-x-3">
          {/* Author */}
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-1 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <p className="text-[#25455E] text-md break-words max-w-full">{articleData.penulis}</p>
          </div>

          {/* Date */}
          <div className="flex items-center align-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#80ad31"
              className="w-5 h-5 mr-1 mt-0 my-auto"
            >
              <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
              <path
                fillRule="evenodd"
                d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-[#25455E] text-md">
              {articleData.tanggal ? dayjs(new Date(articleData.tanggal!)).format('YYYY-MM-DD') : ''}
            </p>
          </div>

          {/* Count */}
          <div className="flex items-center align-middle">
            <IconEye className="w-5 h-5 mr-1 mt-0 my-auto" />
            <p className="text-[#25455E] text-md">{articleData.count ?? 0}</p>
          </div>
        </div>
        <h3 className="font-semibold text-[#25455E] sm:text-2xl">{articleData.judul ?? ''}</h3>
        <p dangerouslySetInnerHTML={{ __html: articleData.deskripsi ?? '' }} className="rich-text-typography" />
      </Typography>
    </Card>
  );

  return (
    <>
      <AppMeta
        title={articleData.judul ? articleData.judul : ''}
        description={articleData.deskripsi ? stripHTMLTags(articleData.deskripsi, 300) : ''}
        ogImage={articleData.files ? articleData.files[0].file_name : ''}
      />
      <PublicLayout {...props}>
        <ShowWithOtherLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Info & Media' },
                { label: 'Artikel Kesehatan', href: route('info-media.popularArticle.index') },
                { label: `${limitString(articleData.judul ?? '-', 50)}`, href: '#' },
              ]}
            />
          }
          otherText={`${t('popular-article', { ns: 'infoMedia' })} ` + t('other', { ns: 'generic' })}
          content={cardArticle}
          contentDescription={articleData.deskripsi && cardArticleDescription}
          dataId={articleData.id}
          initialOT={props.data.otherArticle.data}
          initialOTPaginated={props.data.otherArticle}
          loadOtherDataURL={route('info-media.popularArticle.scroll')}
          OTURLSlug="info-media.popularArticle.show"
          OTSlugKey="slug"
          OTFileNameKey="files"
          OTTitleKey="judul"
          OTDateKey="tanggal"
          OTWithJoin={true}
          OTWithJoinFileNameKey="file_name"
        />
      </PublicLayout>
    </>
  );
}
