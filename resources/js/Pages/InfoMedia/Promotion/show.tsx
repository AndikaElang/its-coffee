import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Card } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/PublicLayout';
import ShowWithOtherLayout from '@/layouts/ShowWithOtherLayout';
import { limitString, stripHTMLTags } from '@/lib/utils';
import { Promotion, paginatedData } from '@/types/models';
import { GenericViewPage } from '@/types/page-params';
import { Carousel } from '@mantine/carousel';
import { Typography } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Page(
  props: GenericViewPage<{ promotion: Promotion; otherPromotion: paginatedData<Promotion> }>,
) {
  const { t } = useTranslation();
  const promotionData = props.data.promotion;
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const haveMoreThanOneImage = promotionData.files?.length ? promotionData.files?.length > 1 : false;

  const carouselPlugins = haveMoreThanOneImage ? [autoplay.current] : [];

  const cardPromotion = (
    <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative max-h-[850px]">
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
        {promotionData.files?.map((file, i) => (
          <Carousel.Slide key={file.id + i}>
            <ImageWithLoading
              src={promotionData.files ? file.file_name : ''}
              alt={promotionData.judul ? promotionData.judul : ''}
              imageClassname="object-contain h-[850px]"
              clickable={true}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Card>
  );

  const cardPromotionDescription = (
    <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative h-full w-full">
      <Typography p={'md'}>
        <h3 className="font-semibold text-[#25455E] sm:text-2xl">{promotionData.judul ?? ''}</h3>
        <p dangerouslySetInnerHTML={{ __html: promotionData.deskripsi ?? '' }} className="rich-text-typography" />
      </Typography>
    </Card>
  );

  return (
    <>
      <AppMeta
        title={promotionData.judul ? promotionData.judul : ''}
        description={promotionData.deskripsi ? stripHTMLTags(promotionData.deskripsi, 300) : ''}
        ogImage={promotionData.files ? promotionData.files[0].file_name : ''}
      />
      <PublicLayout {...props}>
        <ShowWithOtherLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Info & Media' },
                { label: 'Promosi', href: route('info-media.promosi.index') },
                { label: `${limitString(promotionData.judul ?? '-', 50)}`, href: '#' },
              ]}
            />
          }
          otherText={`${t('promotion', { ns: 'infoMedia' })} ` + t('other', { ns: 'generic' })}
          content={cardPromotion}
          contentDescription={promotionData.deskripsi && cardPromotionDescription}
          dataId={promotionData.id}
          initialOT={props.data.otherPromotion.data}
          initialOTPaginated={props.data.otherPromotion}
          loadOtherDataURL={route('info-media.promosi.scroll')}
          OTURLSlug="info-media.promosi.show"
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
