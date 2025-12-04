import CombinedTemplate from '@/components/Card/CombinedTemplate';
import { PageProps } from '@/types';
import { EnvironmentSustainabilityArticle } from '@/types/models';
import { useTranslation } from 'react-i18next';

export default function EnvSustainArticle(
  props: PageProps & { ns: string; articles: EnvironmentSustainabilityArticle[] },
) {
  const { t } = useTranslation();
  const t_opt = { ns: props.ns };
  const data = props.articles;

  return (
    <CombinedTemplate
      data={data}
      title={t('keberlanjutan-linkungan', t_opt)}
      isHtml={true}
      viewAllText={t('keberlanjutan-linkungan.view-all', t_opt)}
      viewAllLink="#"
    />
  );
}
