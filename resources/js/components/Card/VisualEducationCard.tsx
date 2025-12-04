import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Flex, Button as MantineButton, Stack } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ImageWithLoading } from '../Image/ImageWithLoading';
import { NotifyError } from '../Notifications/Notify';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';

export const VisualEducationCard = ({
  id,
  title,
  image,
  description,
  totalDownload,
  date,
  category_id,
  category_name,
  isHtml = true,
  className = '',
}: {
  id: string | number;
  title: string;
  image: string;
  description: React.ReactNode;
  totalDownload: number;
  date: string;
  category_id: number;
  category_name: string;
  isHtml?: boolean;
  className?: string;
}) => {
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState(false);

  const dl = async () => {
    try {
      setDownloading(true);

      const response = await axios.post(
        route('info-media.edukasiVisual.download'),
        { id: id },
        {
          responseType: 'blob', // important for binary/image data
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Determine MIME type dynamically (optional but safer)
      const contentType = response.headers['content-type'] || 'image/jpeg';

      // Create a blob from the image data
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;

      // Optional: detect file extension from MIME type
      const extension = contentType === 'image/png' ? 'png' : contentType === 'image/webp' ? 'webp' : 'jpg';

      link.download = title || `image-${id}.${extension}`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      NotifyError('Gagal mendownload gambar. Silakan coba lagi.', `${error}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Card
      className={cn(
        className,
        'relative group p-0 cursor-pointer bg-[#f8f8f8] hover:shadow-blue-800/12 hover:scale-102 transition-all duration-300 rounded-4xl transform',
      )}
    >
      <CardHeader className="p-4 pb-0">
        <ImageWithLoading
          src={image}
          alt={title}
          className="h-[400px] object-cover border-0 shadow-xl-all rounded-4xl overflow-hidden"
          clickable
        />
      </CardHeader>

      <CardContent>
        <h3 className="text-lg font-semibold text-[#25455E] mb-3 leading-tight">{title}</h3>{' '}
        <Link href={route('info-media.edukasiVisual.index', { page: 1, category: category_id })} key={category_id}>
          <MantineButton variant="outline" size="xs" radius="xl" color="gray" className="mb-3">
            {category_name}
          </MantineButton>
        </Link>
        {isHtml ? (
          <p
            className="text-sm text-gray-600 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: description ?? '' }}
          />
        ) : (
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
        )}
        <Flex justify={'space-between'}>
          <Stack gap={4} mb={'md'}>
            <Button
              className={`bg-orange-500 hover:bg-orange-600 px-4 text-white rounded-lg transition-colors`}
              size="lg"
              onClick={dl}
              disabled={downloading}
            >
              <span className="text-xl font-bold">
                {downloading ? t('downloading', { ns: 'generic' }) : t('download', { ns: 'generic' })}
              </span>
            </Button>
            <p className="text-xs">
              Total {t('download', { ns: 'generic' })}:{' '}
              <span className="font-semibold text-[#25455E]">{totalDownload}</span>
            </p>
          </Stack>
          <p className="text-gray-600 leading-relaxed">
            <span className="font-semibold text-[#25455E]">{date}</span>
          </p>
        </Flex>
      </CardContent>
    </Card>
  );
};
