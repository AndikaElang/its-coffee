import { Link } from '@inertiajs/react';
import { Box, MantineStyleProps } from '@mantine/core';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
  mt?: MantineStyleProps['mt'];
  mb?: MantineStyleProps['mb'];
}

export default function CustomBreadcrumb({ items, mt = 'lg', mb = 'md' }: BreadcrumbProps) {
  return (
    <Box mt={mt} mb={mb}>
      <nav aria-label="Breadcrumb">
        <div
          className="flex flex-wrap gap-1 items-center text-sm text-gray-500
                        overflow-x-auto max-w-full whitespace-nowrap"
        >
          {items.map((item, index) => (
            <div key={index} className="flex items-center min-w-0">
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-700 cursor-pointer truncate max-w-[140px] sm:max-w-full"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-700 truncate max-w-[140px] sm:max-w-full">{item.label}</span>
              )}

              {index < items.length - 1 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </nav>
    </Box>
  );
}
