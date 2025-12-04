import { VerticalCard } from '@/components/Card/VerticalCard';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { Card } from '@/components/ui/card';
import { PageProps } from '@/types';
import { useTranslation } from 'react-i18next';

export type StructuralProps = {
  name: string;
  title: string;
  image: string;
};

export default function StructuralCard(props: PageProps & { ns: string; title: string; data: StructuralProps[] }) {
  const { t } = useTranslation();
  const t_opt = { ns: 'rsuiProfile' };
  const title = props.title;
  const top = props.data[0];
  const bottom = props.data.slice(1);

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-center text-3xl font-bold text-[#25455E] py-16">{title}</p>
      </div>

      <div className="max-w-7xl mx-auto px-0">
        {/* Direktur utama RSUI */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full">
          <VerticalCard
            extraNode={<></>}
            image={top.image}
            title={top.name}
            description={
              <div className="bg-white flex rounded-t-4xl -mt-10 relative z-10 py-6 flex-col">
                <h3 className="font-semibold text-[#25455E] mb-3 text-center mx-auto max-w-[300px] sm:text-lg text-sm">
                  {top.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 text-center mx-auto sm:text-sm text-xs">
                  {t(top.title, t_opt)}
                </p>
              </div>
            }
          />
        </div>

        {/* Direktur */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto items-center justify-center gap-4 sm:gap-8 w-full">
          {bottom.map((director) => (
            <Card className="py-0 *:group cursor-pointer transition-all duration-300 bg-white border-0 shadow-xl-all hover:shadow-blue-800/12 hover:scale-105 overflow-hidden rounded-4xl transform relative h-full">
              <div className="relative">
                {/* Image section with rounded top corners */}
                <div className="relative max-h-[320px] overflow-hidden rounded-t-4xl">
                  <ImageWithLoading src={director.image} alt={director.name} className="w-full h-full object-cover" />
                </div>

                {/* Text section with rounded top corners to create the curved transition */}
                <div className="bg-white rounded-t-4xl -mt-10 relative z-10 py-6 px-2">
                  <h3 className="font-semibold text-[#25455E] mb-3 text-center max-w-[300px] sm:text-lg text-sm">
                    {director.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 text-center sm:text-sm text-xs">
                    {t(director.title, t_opt)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
