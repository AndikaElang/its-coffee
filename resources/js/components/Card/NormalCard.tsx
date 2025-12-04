import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import Arrow from './Arrow';

export default function NormalCard({
  title,
  image,
  description,
  extraNode = <Arrow />,
  useOnCarousel = true,
}: {
  title: string;
  image: string;
  description: React.ReactNode;
  extraNode?: React.ReactNode;
  useOnCarousel?: boolean;
}) {
  return (
    <Card
      className={cn(
        'py-0 *:group cursor-pointer transition-all duration-300 bg-white border-0 shadow-xl-all hover:shadow-blue-800/12 hover:scale-105 overflow-hidden rounded-4xl transform relative h-full',
        useOnCarousel && 'max-sm:w-[250px]',
      )}
    >
      <div className="relative">
        {/* Image section with rounded top corners */}
        <div className="relative max-h-[320px] overflow-hidden rounded-t-4xl h-270">
          <ImageWithLoading src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Text section with rounded top corners to create the curved transition */}
        {description}
      </div>
      {extraNode}
    </Card>
  );
}

export function GenericDescription({
  title,
  description,
  isHtml,
}: {
  title: string;
  description: string;
  isHtml: boolean;
}) {
  return (
    <div className="bg-white rounded-t-4xl -mt-10 relative z-10 pt-4 px-5 pb-6 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-4 before:rounded-t-4xl before:shadow-[0_-8px_16px_-8px_rgba(0,0,0,0.08)] before:pointer-events-none">
      <h3 className="text-xl font-semibold text-[#25455E] mb-1 md:mb-3 line-clamp-2">{title}</h3>
      {isHtml ? (
        <p
          className="text-xs text-gray-600 leading-relaxed mb-3 md:mb-4 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: description ?? '' }}
        />
      ) : (
        <p className="text-xs text-gray-600 leading-relaxed mb-3 md:mb-4 line-clamp-2">{description}</p>
      )}
    </div>
  );
}
