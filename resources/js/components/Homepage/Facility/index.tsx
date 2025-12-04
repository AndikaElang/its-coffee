'use client';

import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import { t } from 'i18next';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Facility(props: PageProps & { ns: string }) {
  const t_opt = { ns: props.ns };
  const facilitiesData = {
    title: 'Fasilitas dan Layanan',
    facilities: [
      {
        id: 'hemodialisis',
        name: 'Hemodialisis',
        subtitle: null,
        content: {
          title: t('layanan-kesehatan.hemodialisis', t_opt),
          description: t('layanan-kesehatan.hemodialisis.content', t_opt),
          link: route('service.hemodialysis.index'),
          linkText: t('see-more', { ns: 'generic' }),
        },
        images: [
          {
            src: '/assets/media/layanan-kesehatan/hemodialisis-1.jpg',
            alt: 'Ruang Hemodialisis',
          },
          {
            src: '/assets/media/layanan-kesehatan/hemodialisis-2.jpg',
            alt: 'Ruang Hemodialisis',
          },
        ],
        isDefault: true,
      },
      {
        id: 'intensive-care',
        name: 'Intensive Care (ICU, PICU, NICU)',
        // subtitle: '(ICU, PICU, NICU)',
        content: {
          title: t('layanan-kesehatan.intensive-care', t_opt),
          description: t('layanan-kesehatan.intensive-care.content', t_opt),
          link: route('service.intensiveCare.index'),
          linkText: t('see-more', { ns: 'generic' }),
        },
        images: [
          {
            src: '/assets/media/layanan-kesehatan/icu-1.jpg',
            alt: 'Ruang Intensive Care',
          },
          {
            src: '/assets/media/layanan-kesehatan/icu-2.jpg',
            alt: 'Ruang Intensive Care',
          },
        ],
        isDefault: false,
      },
      {
        id: 'medical-checkup',
        name: 'Medical Check Up',
        subtitle: null,
        content: {
          title: t('layanan-kesehatan.mcu', t_opt),
          description: t('layanan-kesehatan.mcu.content', t_opt),
          link: route('service.medicalCheckup.index'),
          linkText: t('see-more', { ns: 'generic' }),
        },
        images: [
          {
            src: '/assets/media/layanan-kesehatan/mcu-1.jpg',
            alt: 'Ruang Medical Check Up',
          },
          {
            src: '/assets/media/layanan-kesehatan/mcu-2.jpg',
            alt: 'Ruang Medical Check Up',
          },
        ],
        isDefault: false,
      },
      {
        id: 'laboratorium',
        name: 'Laboratorium',
        subtitle: null,
        content: {
          title: t('layanan-kesehatan.laboratorium', t_opt),
          description: t('layanan-kesehatan.laboratorium.content', t_opt),
          link: route('service.laboratorium.index'),
          linkText: t('see-more', { ns: 'generic' }),
        },
        images: [
          {
            src: '/assets/media/layanan-kesehatan/laboratorium-1.jpg',
            alt: 'Ruang Laboratorium',
          },
          {
            src: '/assets/media/layanan-kesehatan/laboratorium-2.jpg',
            alt: 'Ruang Laboratorium',
          },
        ],
        isDefault: false,
      },
      {
        id: 'radiologi',
        name: 'Radiologi',
        subtitle: null,
        content: {
          title: t('layanan-kesehatan.radiologi', t_opt),
          description: t('layanan-kesehatan.radiologi.content', t_opt),
          link: route('service.radiology.index'),
          linkText: t('see-more', { ns: 'generic' }),
        },
        images: [
          {
            src: '/assets/media/layanan-kesehatan/radiologi-1.jpg',
            alt: 'Ruang Radiologi',
          },
          {
            src: '/assets/media/layanan-kesehatan/radiologi-2.jpg',
            alt: 'Ruang Radiologi',
          },
        ],
        isDefault: false,
      },
    ],
  };

  const defaultFacility = facilitiesData.facilities.find((f) => f.isDefault) || facilitiesData.facilities[0];
  const [activeTab, setActiveTab] = useState(defaultFacility.id);

  const activeContent = facilitiesData.facilities.find((f) => f.id === activeTab)?.content;
  const activeImages = facilitiesData.facilities.find((f) => f.id === activeTab)?.images || [];

  return (
    <div className="bg-gray-100 py-12" id="fasilitas-layanan" style={{ scrollMarginTop: '120px' }}>
      <div className="container mx-auto max-xs:px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold color-mantine-blue-8">{facilitiesData.title}</h2>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex gap-8">
          {/* Left Sidebar */}
          <div className="w-46 flex-shrink-0">
            <nav>
              {facilitiesData.facilities.map((facility) => (
                <button
                  key={facility.id}
                  onClick={() => setActiveTab(facility.id)}
                  className={cn(
                    'w-full text-left px-4 py-3 transition-colors duration-200 relative',
                    'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    activeTab === facility.id
                      ? 'bg-white color-mantine-blue-8 border-r-4 border-orange-500'
                      : 'text-[#25455E] hover:text-[#3B6F97] bg-transparent border-r-4 border-gray-200',
                  )}
                >
                  <div className="font-medium">{facility.name}</div>
                  {/* {facility.subtitle && <div className="text-sm text-gray-500 mt-1">{facility.subtitle}</div>} */}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeContent && (
              <>
                <h2 className="text-2xl font-bold text-[#25455E] mb-6">{activeContent.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{activeContent.description}</p>
                <Link
                  href={activeContent.link}
                  className="inline-flex items-center text-[#25455E] hover:text-[#3B6F97] font-medium"
                >
                  {activeContent.linkText}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </>
            )}
          </div>
          {/* Right Images - Dynamic based on active facility */}
          {activeImages.length > 0 && (
            <div className="flex-shrink-0 space-y-4 lg:w-100">
              {activeImages.map((image, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <ImageWithLoading src={image.src} alt={image.alt} className="md:w-70 lg:w-full h-42 object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Accordion Layout */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="space-y-4">
            {facilitiesData.facilities.map((facility) => (
              <AccordionItem key={facility.id} value={facility.id} className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{facility.name}</div>
                    {/* {facility.subtitle && <div className="text-sm text-gray-500 mt-1">{facility.subtitle}</div>} */}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">{facility.content.description}</p>
                    <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                      {facility.content.linkText}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>

                    {facility.images.length > 0 && (
                      <div className="space-y-3 mt-4">
                        {facility.images.map((image, index) => (
                          <img
                            key={index}
                            src={image.src || '/placeholder.svg'}
                            alt={image.alt}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
