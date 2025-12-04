import { GenericDescription as GenericDescriptionHorizontal, HorizontalCard } from '@/components/Card/HorizontalCard';
import NormalCard, {
  GenericDescription,
  GenericDescription as GenericDescriptionNormal,
} from '@/components/Card/NormalCard';
import { GenericDescription as GenericDescriptionVertical, VerticalCard } from '@/components/Card/VerticalCard';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Carousel } from '@mantine/carousel';
import { Grid, Group, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';
import { MoveRight } from 'lucide-react';
import React from 'react';
import classes from '~/css/Carousel.module.css';
import homepageStyle from '~/css/Homepage.module.css';

export interface CombinedTemplateItem {
  id: number | string;
  judul: string | null;
  image_name: string | null;
  deskripsi: string | null;
  subtitle?: string;
  created_at: string;
  slug: string | null;
  [key: string]: any; // Allow additional properties
}

export interface CombinedTemplateProps {
  data: CombinedTemplateItem[];
  title?: string;
  subtitle?: string;
  viewAllText?: string;
  viewAllLink?: string;
  className?: string;
  containerClassName?: string;
  isHtml?: boolean;
  showSubtitle?: boolean;
  defaultSubtitle?: string;
  showRoute?: string;
  carouselProps?: {
    slideSize?: { xs?: string; sm?: string; md?: string; lg?: string };
    slideGap?: string;
    withIndicators?: boolean;
    emblaOptions?: any;
  };
  onItemClick?: (item: CombinedTemplateItem) => void;
}

export default function CombinedTemplate({
  data,
  title,
  subtitle,
  viewAllText,
  viewAllLink = '#',
  className = '',
  containerClassName = 'container mx-auto max-xs:px-4 pt-12',
  isHtml = true,
  showSubtitle = true,
  defaultSubtitle = 'Tgl xx-xx-xxxx',
  showRoute,
  carouselProps = {
    slideSize: { xs: '30%', sm: '40%', md: '30%', lg: '25%' },
    slideGap: 'xl',
    withIndicators: true,
    emblaOptions: { loop: true, align: 'start' },
  },
  onItemClick,
}: CombinedTemplateProps) {
  const firstData = data[0];
  const remainingData = data.slice(1);
  const matchNeedsBreakDesktop = useMediaQuery('(max-width: 1300px)');
  const matchMustBeBroken = useMediaQuery('(max-width: 992px)');
  const isDataOdd = data.length % 2 === 1;

  const handleItemClick = (item: CombinedTemplateItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const renderNormalCard = (card: CombinedTemplateItem) => (
    <div onClick={() => handleItemClick(card)} className={onItemClick ? 'cursor-pointer' : ''}>
      <NormalCard
        key={card.id}
        title={card.judul ? card.judul : ''}
        image={card.image_name ? card.image_name : ''}
        description={
          <GenericDescriptionNormal
            description={card.deskripsi ? card.deskripsi : ''}
            title={card.judul ? card.judul : ''}
            isHtml={isHtml}
          />
        }
      />
    </div>
  );

  const renderHorizontalCard = (card: CombinedTemplateItem, additionalClassName = '') => (
    <div onClick={() => handleItemClick(card)} className={cn(onItemClick ? 'cursor-pointer' : '', additionalClassName)}>
      {showRoute ? (
        <Link href={route(showRoute, { slug: card.slug })}>
          <HorizontalCard
            key={card.id}
            title={card.judul ? card.judul : ''}
            image={card.image_name ? card.image_name : ''}
            description={
              <GenericDescriptionHorizontal
                description={card.deskripsi ? card.deskripsi : ''}
                title={card.judul ? card.judul : ''}
                subtitle={
                  showSubtitle ? dayjs(new Date(card.created_at!)).format('MMM D, YYYY') || defaultSubtitle : ''
                }
                isHtml={isHtml}
              />
            }
          />
        </Link>
      ) : (
        <HorizontalCard
          key={card.id}
          title={card.judul ? card.judul : ''}
          image={card.image_name ? card.image_name : ''}
          description={
            <GenericDescriptionHorizontal
              description={card.deskripsi ? card.deskripsi : ''}
              title={card.judul ? card.judul : ''}
              subtitle={showSubtitle ? dayjs(new Date(card.created_at!)).format('MMM D, YYYY') || defaultSubtitle : ''}
              isHtml={isHtml}
            />
          }
        />
      )}
    </div>
  );

  const renderVerticalCard = (card: CombinedTemplateItem) => (
    <div onClick={() => handleItemClick(card)} className={onItemClick ? 'cursor-pointer' : ''}>
      {showRoute ? (
        <Link href={route(showRoute, { slug: card.slug })}>
          <VerticalCard
            description={
              <GenericDescriptionVertical
                description={card.deskripsi ? card.deskripsi : ''}
                title={card.judul ? card.judul : ''}
                subtitle={
                  showSubtitle ? dayjs(new Date(card.created_at!)).format('MMM D, YYYY') || defaultSubtitle : ''
                }
                isHtml={isHtml}
              />
            }
            image={card.image_name ? card.image_name : ''}
            title={card.judul ? card.judul : ''}
          />
        </Link>
      ) : (
        <VerticalCard
          description={
            <GenericDescriptionVertical
              description={card.deskripsi ? card.deskripsi : ''}
              title={card.judul ? card.judul : ''}
              subtitle={showSubtitle ? dayjs(new Date(card.created_at!)).format('MMM D, YYYY') || defaultSubtitle : ''}
              isHtml={isHtml}
            />
          }
          image={card.image_name ? card.image_name : ''}
          title={card.judul ? card.judul : ''}
        />
      )}
    </div>
  );

  const layoutTwoGrid = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 gap-4">
        {data.map((card, i) => {
          return (
            <React.Fragment key={i}>
              {renderHorizontalCard(card, isDataOdd && i === data.length - 1 ? 'col-span-2' : '')}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`${containerClassName} ${className}`}>
      {/* Header Section */}
      {(title || subtitle || viewAllText) && (
        <div className={homepageStyle.header}>
          {(title || subtitle) && (
            <div>
              {title && <h2 className="text-4xl font-bold text-left mb-4 color-mantine-blue-8">{title}</h2>}
              {subtitle && (
                <p className={cn('text-left text-gray-600 text-xl', matchMustBeBroken ? '' : 'mb-8 ')}>{subtitle}</p>
              )}
            </div>
          )}
          {viewAllText && (
            <Link href={viewAllLink} className={`${homepageStyle['header-link']} mt-4 sm:mt-0`}>
              <Group gap="xs" align="center" wrap="nowrap">
                {viewAllText} <MoveRight size={20} />
              </Group>
            </Link>
          )}
        </div>
      )}

      <div className={cn('container mx-auto', matchMustBeBroken ? 'overflow-hidden' : 'overflow-visible')}>
        {matchMustBeBroken ? (
          <Carousel
            withIndicators
            slideSize={{ base: '50%', sm: '40%', md: '30%', lg: '25%' }}
            slideGap={'xl'}
            emblaOptions={{ loop: true, align: 'start' }}
            classNames={classes}
          >
            {data.map((card, i) => (
              <Carousel.Slide key={i} className="pt-4 mb-12">
                {showRoute ? (
                  <Link href={route(showRoute, { slug: card.slug })}>
                    <NormalCard
                      key={card.id}
                      title={card.judul ? card.judul : ''}
                      image={card.image_name ? card.image_name : ''}
                      description={
                        <GenericDescription description={card.deskripsi ?? ''} title={card.judul ?? ''} isHtml={true} />
                      }
                    />
                  </Link>
                ) : (
                  <NormalCard
                    key={card.id}
                    title={card.judul ? card.judul : ''}
                    image={card.image_name ? card.image_name : ''}
                    description={
                      <GenericDescription description={card.deskripsi ?? ''} title={card.judul ?? ''} isHtml={true} />
                    }
                  />
                )}
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : matchNeedsBreakDesktop ? (
          <>{layoutTwoGrid()}</>
        ) : remainingData.length < 5 ? (
          <>{layoutTwoGrid()}</>
        ) : (
          <Grid>
            <Grid.Col span={3}>{firstData && renderVerticalCard(firstData)}</Grid.Col>
            <Grid.Col span={9}>
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                {remainingData.map((card, i) => (
                  <React.Fragment key={i}>{renderHorizontalCard(card)}</React.Fragment>
                ))}
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        )}
      </div>
    </div>
  );
}
