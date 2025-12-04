import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import Arrow from './Arrow';

export const HorizontalCard = ({
  title,
  image,
  description,
  extraNode = <Arrow />,
  className,
}: {
  title: string;
  image: string;
  description: React.ReactNode;
  extraNode?: React.ReactNode;
  className?: string;
}) => (
  <Card
    className={cn(
      'relative group p-0 cursor-pointer hover:shadow-blue-800/12 hover:scale-102 transition-all duration-300 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform',
      className,
    )}
  >
    <div className="flex relative h-42 p-0">
      {/* Large image section */}
      <div className="relative w-32 m-3 flex-shrink-0 overflow-hidden rounded-4xl">
        <ImageWithLoading src={image} alt={title} className="w-full h-full" />
      </div>

      {/* Text section */}
      {description}
    </div>
    {extraNode}
  </Card>
);

export const GenericDescription = ({
  title,
  subtitle,
  description,
  isHtml,
}: {
  title: string;
  subtitle: string;
  description: string;
  isHtml: boolean;
}) => (
  <div className="flex-1 py-4 flex flex-col justify-between">
    <div>
      <p className="text-xs text-gray-400 mb-1 line-clamp-1">{subtitle}</p>
      <h3 className="text-lg font-semibold text-[#25455E] mb-2 leading-tight line-clamp-1 3 pe-4">{title}</h3>
      {isHtml ? (
        <p
          className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 pe-4"
          dangerouslySetInnerHTML={{ __html: description ?? '' }}
        />
      ) : (
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 pe-4">{description}</p>
      )}
    </div>
  </div>
);
