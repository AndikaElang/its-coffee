import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Pagination } from '@/components/Pagination';
import { Card } from '@/components/ui/card';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { limitString } from '@/lib/utils';
import { ViewPaginateArticle } from '@/types/page-params';
import { Link } from '@inertiajs/react';
import { Button, Grid, Typography } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export default function Page(props: ViewPaginateArticle) {
  const { t } = useTranslation();
  const t_opt = { ns: 'infoMedia' };
  const data = props.articles.data;
  const categories = props.categories;
  const pageRoute = 'info-media.popularArticle.index';

  const contentMapped = data.map((item) => {
    return (
      <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative mb-6">
        {/* {content} */}
        <div className="relative h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden rounded-t-4xl max-h-[650px]">
            <ImageWithLoading
              src={item.files ? item.files[0].file_name : ''}
              alt={item.judul ?? ''}
              className="w-full h-full object-cover"
              clickable={true}
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-t-4xl -mt-10 relative z-10 py-6 px-2 flex flex-col justify-between flex-1">
            <div className="px-2">
              <span className="flex items-center mb-3">
                <span className="flex flex-wrap justify-center gap-2">
                  {item.categories &&
                    item.categories.map((category) => (
                      <Link href={route(pageRoute, { page: 1, category: category.kategori_name })} key={category.id}>
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
                  <p className="text-[#25455E] text-md break-words max-w-full">{item.penulis}</p>
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
                    {item.tanggal ? dayjs(new Date(item.tanggal!)).format('YYYY-MM-DD') : ''}
                  </p>
                </div>

                {/* Count */}
                <div className="flex items-center align-middle">
                  <IconEye className="w-5 h-5 mr-1 mt-0 my-auto" />
                  <p className="text-[#25455E] text-md">{item.count ?? 0}</p>
                </div>
              </div>

              <h3 className="font-semibold text-[#25455E] mb-3 sm:text-2xl text-justify">{item.judul}</h3>
              <div className="flex mb-3">
                <Typography p={'0'}>
                  <p
                    className="rich-text-typography"
                    dangerouslySetInnerHTML={{ __html: limitString(item.deskripsi ?? '', 2000) ?? '' }}
                  />
                </Typography>
              </div>
            </div>

            {/* Group pinned at bottom */}
            <div className="mt-auto px-2">
              <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center space-y-4 sm:space-y-0">
                <Link href={route('info-media.popularArticle.show', { slug: item.slug })}>
                  <Button size="md" color="#f26522">
                    {t('see-more', { ns: 'generic' })}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  });

  const content = (
    <>
      {data.length === 0 ? (
        <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative mb-6">
          <div className="flex flex-col items-center justify-center py-5">
            <h3 className="font-semibold text-[#25455E] sm:text-2xl text-justify">
              {t('data-not-found', { ns: 'generic' })}
            </h3>
          </div>
        </Card>
      ) : (
        contentMapped
      )}
      <Pagination
        itemsPerPage={3}
        totalItems={props.articles.total}
        currentPage={props.articles.current_page}
        pageRoute={pageRoute}
        params={{ category: props.selectedCategory ?? '' }}
      />
    </>
  );

  const categoriesMapped = categories.map((category, i) => {
    const isActive = props.selectedCategory === category.kategori;
    return (
      <Link
        href={route(pageRoute, { page: 1, category: category.kategori })}
        key={i}
        className={i === categories.length - 1 ? 'mb-4' : ''}
      >
        <div className={`flex mx-2 px-2 py-1 group hover:bg-gray-200 rounded-2xl ${isActive ? 'bg-gray-200' : ''}`}>
          <div className="flex flex-col">
            <span
              className={`text-md font-medium text-gray-700 line-clamp-2 group-hover:underline ${
                isActive ? 'underline' : ''
              }`}
            >
              {category.kategori ? category.kategori : ''} {category.total ? `(${category.total})` : ''}
            </span>
          </div>
        </div>
      </Link>
    );
  });

  const categoriesContent = (
    <Card className="py-0 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform relative space-y-0 gap-2">
      <h3 className="font-semibold text-[#25455E] mb-4 sm:text-lg m-4 text-center">
        {t('category', { ns: 'generic' })}
      </h3>
      {categoriesMapped}
    </Card>
  );

  return (
    <>
      <AppMeta title="Artikel Kesehatan" />
      <PublicLayout {...props}>
        <ContentLayout
          title={t('popular-article', t_opt)}
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Info & Media' },
                { label: 'Artikel Kesehatan', href: '#' },
              ]}
            />
          }
        >
          <div className="max-[776px]:hidden">
            <Grid gutter={'xl'} grow>
              <Grid.Col span={8}>{content}</Grid.Col>
              <Grid.Col span={4}>{categoriesContent}</Grid.Col>
            </Grid>
          </div>
          <div className="hidden max-[776px]:flex flex-col space-y-5">
            {content}
            {categoriesContent}
          </div>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
