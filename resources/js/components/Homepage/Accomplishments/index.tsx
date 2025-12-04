import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { PageProps } from '@/types';
import { Accomplishment } from '@/types/models';
import { Grid } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import homepageStyle from '~/css/Homepage.module.css';

export default function Accomplishments(props: PageProps & { ns: string; accomplishments: Accomplishment[] }) {
  const { t } = useTranslation();
  const t_opt = { ns: 'homepage' };

  return (
    <div className="py-12" id="pencapaian">
      <div className="container mx-auto max-xs:px-4">
        <div className={homepageStyle.header}>
          <div>
            <h2 className="text-4xl font-bold text-left color-mantine-blue-8 mb-4">{t('pencapaian', t_opt)}</h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto sm:px-4">
          <Grid grow>
            {props.accomplishments.map((accomplishment, index) => {
              return (
                <Grid.Col key={index} span={4}>
                  <a
                    key={accomplishment.id}
                    href={accomplishment.link ? accomplishment.link : '/'}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <ImageWithLoading
                      src={accomplishment.logo}
                      alt={accomplishment.nama}
                      imageClassname="object-contain max-sm:h-30 h-30 max-w-[250px] mx-auto"
                      imageFull={false}
                    />
                  </a>
                </Grid.Col>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
}
