import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from '@mantine/core';

export default function SkeletonCard() {
  return (
    <Card
      className={cn(
        'py-0 *:group cursor-pointer transition-all duration-300 bg-white border-0 shadow-xl-all hover:shadow-blue-800/12 hover:scale-105 overflow-hidden rounded-4xl transform relative h-full',
      )}
    >
      <div className="relative">
        {/* Image section with rounded top corners */}
        <div className="relative max-h-[320px] overflow-hidden rounded-t-4xl h-270">
          <Skeleton height={320} className="w-full h-full object-cover" />
        </div>

        {/* Text section with rounded top corners to create the curved transition */}
        <Skeleton height={8} />
        <Skeleton height={8} />
        <Skeleton height={8} />
      </div>
    </Card>
  );
}
