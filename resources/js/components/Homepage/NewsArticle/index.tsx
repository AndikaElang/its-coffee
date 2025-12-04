import CombinedTemplate from '@/components/Card/CombinedTemplate';
import { PageProps } from '@/types';
import { News } from '@/types/models';
import { useTranslation } from 'react-i18next';

// const dataPlaceholder: CombinedTemplateItem[] = [
//   {
//     id: 1,
//     judul: 'Lorep ipsum dolor sit amet, consectetur',
//     image_name: '/assets/media/example/coe1.png',
//     deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//   },
//   {
//     id: 2,
//     judul: 'Lorep ipsum dolor sit amet, consectetur',
//     image_name: '/assets/media/example/coe2.png',
//     deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//   },
//   {
//     id: 3,
//     judul: 'Lorep ipsum dolor sit amet, consectetur',
//     image_name: '/assets/media/example/coe3.png',
//     deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//   },
//   {
//     id: 4,
//     judul: 'Lorep ipsum dolor sit amet, consectetur',
//     image_name: '/assets/media/example/coe4.png',
//     deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//   },
//   {
//     id: 5,
//     judul: 'Lorep ipsum dolor sit amet, consectetur',
//     image_name: '/assets/media/example/coe1.png',
//     deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//   },
//   {
//     id: 6,
//     judul: 'Lorep ipsum dolor sit amet, consectetur',
//     image_name: '/assets/media/example/coe2.png',
//     deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//   },
//   {
//     id: 7,
//     judul: 'Lorep ipsum dolor sit amet, consectetur',
//     image_name: '/assets/media/example/coe3.png',
//     deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//   },
// ];

export default function NewsArticle(props: PageProps & { ns: string; news: News[] }) {
  const { t } = useTranslation();
  const t_opt = { ns: props.ns };
  const data = props.news;

  return (
    <CombinedTemplate
      data={data}
      title={t('berita-artikel', t_opt)}
      subtitle={t('berita-artikel.description', t_opt)}
      viewAllText={t('berita-artikel.view-all', t_opt)}
      viewAllLink={route('info-media.berita.index')}
      containerClassName="container mx-auto max-xs:px-4 py-12"
      isHtml={true}
      showRoute={'info-media.berita.show'}
    />
  );
}
