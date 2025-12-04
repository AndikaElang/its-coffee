import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Card } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/PublicLayout';
import ShowWithOtherLayout from '@/layouts/ShowWithOtherLayout';
import { limitString, stripHTMLTags } from '@/lib/utils';
import { ArticleWithCategoryAndFile, DisorderDiseasesWithCategoryAndFile, paginatedData } from '@/types/models';
import { GenericViewPage } from '@/types/page-params';
import { Carousel } from '@mantine/carousel';
import { Button, Typography } from '@mantine/core';
import dayjs from 'dayjs';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Page(
  props: GenericViewPage<{
    diseases: DisorderDiseasesWithCategoryAndFile;
    relatedArticle: paginatedData<ArticleWithCategoryAndFile>;
  }>,
) {
  const { t } = useTranslation();
  const t_opt = { ns: 'infoMedia' };

  const diseasesData = props.data.diseases;
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const haveMoreThanOneImage = diseasesData.files?.length ? diseasesData.files?.length > 1 : false;

  const carouselPlugins = haveMoreThanOneImage ? [autoplay.current] : [];

  const cardDiseases = (
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
      {diseasesData.files?.map((file, i) => (
        <Carousel.Slide key={file.id + i}>
          <ImageWithLoading
            src={diseasesData.files ? file.file_name : ''}
            alt={diseasesData.judul ? diseasesData.judul : ''}
            imageClassname="object-contain"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );

  const cardDiseasesDescription = (
    <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative h-full w-full">
      <Typography p={'md'}>
        <span className="flex items-center mb-3">
          <span className="flex flex-wrap justify-center gap-2">
            {diseasesData.categories &&
              diseasesData.categories.map((category) => (
                <Button variant="outline" size="xs" radius="xl" color="gray">
                  {category.kategori_name}
                </Button>
              ))}
          </span>
        </span>

        {/* Author */}
        <div className="flex items-start mb-3">
          <p className="text-[#25455E] text-md break-words max-w-full">
            <b>{t('disorder-disease.writer', t_opt)}:</b> {diseasesData.penulis}
          </p>
        </div>

        {/* Reviewer */}
        <div className="flex items-start mb-3">
          <p className="text-[#25455E] text-md break-words max-w-full">
            <b>{t('disorder-disease.reviewed-by', t_opt)}:</b> {diseasesData.ditinjau}
          </p>
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
            {diseasesData.tanggal ? dayjs(new Date(diseasesData.tanggal!)).format('YYYY-MM-DD') : ''}
          </p>
        </div>

        {/* Content */}
        <h3 className="font-semibold text-[#25455E] sm:text-2xl">{diseasesData.judul ?? ''}</h3>
        <p dangerouslySetInnerHTML={{ __html: diseasesData.deskripsi ?? '' }} className="rich-text-typography" />
      </Typography>
    </Card>
  );

  return (
    <>
      <AppMeta
        title={diseasesData.judul}
        description={diseasesData.deskripsi ? stripHTMLTags(diseasesData.deskripsi, 300) : ''}
        ogImage={diseasesData.files ? diseasesData.files[0].file_name : ''}
      />
      <PublicLayout {...props}>
        <ShowWithOtherLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Info & Media' },
                { label: 'Info Kelainan & Penyakit', href: route('info-media.disorderDisease.index') },
                { label: `${limitString(diseasesData.judul ?? '-', 50)}`, href: '#' },
              ]}
            />
          }
          otherText={
            `${t('popular-article', { ns: 'infoMedia' })} ` + t('related', { ns: 'generic' }) + ` ${diseasesData.judul}`
          }
          content={cardDiseases}
          contentDescription={diseasesData.deskripsi && cardDiseasesDescription}
          dataId={diseasesData.judul}
          initialOT={props.data.relatedArticle.data}
          initialOTPaginated={props.data.relatedArticle}
          loadOtherDataURL={route('info-media.disorderDisease.scroll')}
          OTURLSlug="info-media.disorderDisease.show"
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
