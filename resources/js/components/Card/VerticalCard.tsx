import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import Arrow from './Arrow';

export const VerticalCard = ({
  title,
  image,
  description,
  extraNode = <Arrow />,
  className = '',
}: {
  title: string;
  image: string;
  description: React.ReactNode;
  extraNode?: React.ReactNode;
  className?: string;
}) => (
  <Card
    className={cn(
      className,
      'relative group p-0 cursor-pointer  hover:shadow-blue-800/12 hover:scale-102 transition-all duration-300 bg-white border-0 shadow-xl-all overflow-hidden rounded-4xl transform',
    )}
  >
    <div className="relative">
      {/* Large image section */}
      <div className="relative  overflow-hidden rounded-t-4xl h-110 max-sm:max-h-[320px] max-h-[360px]">
        <ImageWithLoading src={image} alt={title} className="w-full h-full object-cover" />
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
  <div className="bg-white rounded-t-4xl -mt-10 relative z-10 pt-6 px-6 pb-6">
    <p className="text-xs text-gray-400 mb-2 line-clamp-1">{subtitle}</p>
    <h3 className="text-lg font-semibold text-[#25455E] mb-3 leading-tight line-clamp-2">{title}</h3>
    {isHtml ? (
      <p
        className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: description ?? '' }}
      />
    ) : (
      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{description}</p>
    )}
  </div>
);
