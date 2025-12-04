import { PageProps } from '@/types';
import { useTranslation } from 'react-i18next';

export default function Description(props: PageProps & { ns: string }) {
  const { t } = useTranslation();
  const t_opt = { ns: 'homepage' };

  return (
    <div className="bg-white py-6">
      <p className="text-sm color-mantine-blue-8 md:text-lg leading-relaxed text-justify md:text-center px-3">
        {t('description', t_opt)}
      </p>
    </div>
  );
}
