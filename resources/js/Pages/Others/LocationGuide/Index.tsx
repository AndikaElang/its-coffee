import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { cn } from '@/lib/utils';
import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Page(props: any) {
  const { t } = useTranslation();
  const t_opt = { ns: 'others' };
  const directionData = {
    title: 'Petunjuk Lokasi',
    sections: [
      {
        id: 'arah-rsui',
        name: 'Arah ke RSUI',
        content: {
          src: '/assets/media/petunjuk-lokasi/rsui-map-new.jpg',
          alt: 'rsui-map',
        },
      },
      {
        id: 'kendaraan-pribadi',
        name: 'Menggunakan Kendaraan Pribadi',
        content: [
          {
            subId: 'jkt-via-tol',
            subName: 'Jakarta Via Tol',
            checkPoint: [
              {
                cpId: 1,
                cpName: 'Gunakan Tol Jagorawi',
                cpDesc: '',
              },
              {
                cpId: 2,
                cpName: 'Keluar di Tol TP Simatupang',
                cpDesc: '',
              },
              {
                cpId: 3,
                cpName: 'Menuju ke Jl Raya Lenteng Agung',
                cpDesc: '',
              },
              {
                cpId: 4,
                cpName: 'Melewati sisi utara Jl Margonda Depok ke arah Gerbang Utama Universitas Indonesia',
                cpDesc: '',
              },
              {
                cpId: 5,
                cpName: 'Kampus Universitas Indonesia Depok',
                cpDesc:
                  'Ikuti petunjuk jalan di dalam kampus Universitas Indonesia (UI) sampai ke Rumah Sakit Universitas Indonesia',
              },
              {
                cpId: 6,
                cpName: 'Rumah Sakit Universitas Indonesia',
                cpDesc: 'Jl. Prof Bahder Djohan, Kampus UI, Depok',
              },
            ],
          },
          {
            subId: 'bogor-via-tol',
            subName: 'Bogor Via Tol',
            checkPoint: [
              {
                cpId: 1,
                cpName: 'Gunakan Tol Jagorawi ke Jl. Raya Bogor/Jl. Raya Jakarta-Bogor di Depok',
                cpDesc: '',
              },
              {
                cpId: 2,
                cpName: 'Melewati jalan keluar Jl. Raya Bogor dari Jl. Tol Cinere - Jagorawi',
                cpDesc: '',
              },
              {
                cpId: 3,
                cpName:
                  'Melewati Jl. Ir H. Juanda dan Jl. Margonda Raya ke Jl. Lingkar/Jl. Prof. DR. R Slamet Iman Santoso di Pondok Cina',
                cpDesc: '',
              },
              {
                cpId: 4,
                cpName: 'Menuju Pintu masuk Gerbang Utama Universitas Indonesia',
                cpDesc: '',
              },
              {
                cpId: 5,
                cpName: 'Kampus Universitas Indonesia Depok',
                cpDesc:
                  'Ikuti petunjuk jalan di dalam kampus Universitas Indonesia (UI) sampai ke Rumah Sakit Universitas Indonesia',
              },
              {
                cpId: 6,
                cpName: 'Rumah Sakit Universitas Indonesia',
                cpDesc: 'Jl. Prof Bahder Djohan, Kampus UI, Depok',
              },
            ],
          },
        ],
      },
      {
        id: 'krl',
        name: 'Menggunakan Kereta Rel Listrik (KRL)',
        content: [
          {
            subId: 'krl-bogor',
            subName: 'KRL dari Bogor',
            checkPoint: [
              {
                cpId: 1,
                cpName: 'Stasiun Bogor',
                cpDesc:
                  'Naik Kereta Menuju Jakarta Kota, kereta menuju Angke, atau naik kereta menuju Jatinegara via Duri.',
              },
              {
                cpId: 2,
                cpName: 'Stasiun Pondok Cina',
                cpDesc: 'Turun di stasiun Pondok Cina. Jalan kaki sekitar 800 m (7 menit).',
              },
              {
                cpId: 3,
                cpName: 'Rumah Sakit Universitas Indonesia',
                cpDesc: 'Jl. Prof Bahder Djohan, Kampus UI, Depok.',
              },
            ],
          },
          {
            subId: 'krl-nambo',
            subName: 'KRL dari Nambo',
            checkPoint: [
              {
                cpId: 1,
                cpName: 'Stasiun Nambo',
                cpDesc:
                  'Naik Kereta Menuju Jakarta Kota, kereta menuju Tanah Abang, atau naik kereta menuju Jatinegara via Duri.',
              },
              {
                cpId: 2,
                cpName: 'Stasiun Pondok Cina',
                cpDesc: 'Turun di stasiun Pondok Cina. Jalan kaki sekitar 800 m (7 menit).',
              },
              {
                cpId: 3,
                cpName: 'Rumah Sakit Universitas Indonesia',
                cpDesc: 'Jl. Prof Bahder Djohan, Kampus UI, Depok.',
              },
            ],
          },
          {
            subId: 'krl-manggarai',
            subName: 'KRL dari Manggarai',
            checkPoint: [
              {
                cpId: 1,
                cpName: 'Stasiun Manggarai',
                cpDesc: 'Naik Kereta Menuju Bogor/Depok.',
              },
              {
                cpId: 2,
                cpName: 'Stasiun Pondok Cina',
                cpDesc: 'Turun di stasiun Pondok Cina. Jalan kaki sekitar 800 m (7 menit).',
              },
              {
                cpId: 3,
                cpName: 'Rumah Sakit Universitas Indonesia',
                cpDesc: 'Jl. Prof Bahder Djohan, Kampus UI, Depok.',
              },
            ],
          },
          {
            subId: 'krl-angke',
            subName: 'KRL dari Angke',
            checkPoint: [
              {
                cpId: 1,
                cpName: 'Stasiun Angke',
                cpDesc: 'Naik Kereta Menuju Bogor/Depok.',
              },
              {
                cpId: 2,
                cpName: 'Stasiun Pondok Cina',
                cpDesc: 'Turun di stasiun Pondok Cina. Jalan kaki sekitar 800 m (7 menit).',
              },
              {
                cpId: 3,
                cpName: 'Rumah Sakit Universitas Indonesia',
                cpDesc: 'Jl. Prof Bahder Djohan, Kampus UI, Depok.',
              },
            ],
          },
          {
            subId: 'krl-jakot',
            subName: 'KRL dari Jakarta Kota',
            checkPoint: [
              {
                cpId: 1,
                cpName: 'Stasiun Jakarta Kota',
                cpDesc: 'Naik Kereta Menuju Bogor/Depok.',
              },
              {
                cpId: 2,
                cpName: 'Stasiun Pondok Cina',
                cpDesc: 'Turun di stasiun Pondok Cina. Jalan kaki sekitar 800 m (7 menit).',
              },
              {
                cpId: 3,
                cpName: 'Rumah Sakit Universitas Indonesia',
                cpDesc: 'Jl. Prof Bahder Djohan, Kampus UI, Depok.',
              },
            ],
          },
          {
            subId: 'krl-bekasi',
            subName: 'KRL dari Bekasi',
            checkPoint: [
              {
                cpId: 1,
                cpName: 'Stasiun Bekasi',
                cpDesc: 'Naik Kereta Menuju Manggarai.',
              },
              {
                cpId: 2,
                cpName: 'Transit di Stasiun Manggarai',
                cpDesc: 'Naik Kereta Menuju Bogor/Depok.',
              },
              {
                cpId: 3,
                cpName: 'Stasiun Pondok Cina',
                cpDesc: 'Turun di stasiun Pondok Cina. Jalan kaki sekitar 800 m (7 menit).',
              },
              {
                cpId: 4,
                cpName: 'Rumah Sakit Universitas Indonesia',
                cpDesc: 'Jl. Prof Bahder Djohan, Kampus UI, Depok.',
              },
            ],
          },
          {
            subId: 'krl-tangerang',
            subName: 'KRL dari Tangerang',
            checkPoint: [
              {
                cpId: 1,
                cpName: 'Stasiun Tangerang',
                cpDesc: 'Naik Kereta Menuju Duri.',
              },
              {
                cpId: 2,
                cpName: 'Transit di Stasiun Duri',
                cpDesc: 'Naik Kereta Menuju Bogor/Depok.',
              },
              {
                cpId: 3,
                cpName: 'Stasiun Pondok Cina',
                cpDesc: 'Turun di stasiun Pondok Cina. Jalan kaki sekitar 800 m (7 menit).',
              },
              {
                cpId: 4,
                cpName: 'Rumah Sakit Universitas Indonesia',
                cpDesc: 'Jl. Prof Bahder Djohan, Kampus UI, Depok.',
              },
            ],
          },
        ],
      },
      {
        id: 'trans-jakarta',
        name: 'Menggunakan Bus Trans Jakarta',
        content: [
          {
            subId: 'tj-manggarai-ui',
            subName: 'Transjakarta Rute Stasiun Manggarai - Universitas Indonesia',
            checkPoint: [
              {
                cpId: 1,
                cpName: 'Stasiun Manggarai',
                cpDesc: 'Naik Bus TransJakarta no. 4B.',
              },
              {
                cpId: 2,
                cpName: 'Halte RIK',
                cpDesc: 'Jalan kaki 320 m (3 menit).',
              },
              {
                cpId: 3,
                cpName: 'Rumah Sakit Universitas Indonesia',
                cpDesc: 'Jl. Prof Bahder Djohan, Kampus UI, Depok.',
              },
            ],
          },
        ],
      },
    ],
  };

  const sitePlanData = {
    title: 'Denah Lokasi',
    sections: [
      {
        id: 'lt-1-rs',
        name: 'LT. 1 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-01.png',
            alt: 'MAP-LANTAI-RSUI-01',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-3.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-01',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-2-rs',
        name: 'LT. 2 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-02.png',
            alt: 'MAP-LANTAI-RSUI-02',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-2.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-02',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-3-rs',
        name: 'LT. 3 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-03.png',
            alt: 'MAP-LANTAI-RSUI-03',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-2.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-03',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-4-rs',
        name: 'LT. 4 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-04.png',
            alt: 'MAP-LANTAI-RSUI-04',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-2.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-04',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-5-rs',
        name: 'LT. 5 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-05.png',
            alt: 'MAP-LANTAI-RSUI-05',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-1.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-05',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-6-rs',
        name: 'LT. 6 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-06.png',
            alt: 'MAP-LANTAI-RSUI-06',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-1.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-06',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-10-rs',
        name: 'LT. 10 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-10.png',
            alt: 'MAP-LANTAI-RSUI-10',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-1.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-10',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-11-rs',
        name: 'LT. 11 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-11.png',
            alt: 'MAP-LANTAI-RSUI-11',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-1.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-11',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-12-rs',
        name: 'LT. 12 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-12.png',
            alt: 'MAP-LANTAI-RSUI-12',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-1.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-12',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-13-rs',
        name: 'LT. 13 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-13.png',
            alt: 'MAP-LANTAI-RSUI-13',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-1.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-13',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-14-rs',
        name: 'LT. 14 GEDUNG RUMAH SAKIT',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-RSUI-14.png',
            alt: 'MAP-LANTAI-RSUI-14',
            legend: false,
          },
          {
            src: '/assets/media/petunjuk-lokasi/ket-1.jpg',
            alt: 'KET-MAP-LANTAI-RSUI-14',
            legend: true,
          },
        ],
      },
      {
        id: 'lt-1-adm',
        name: 'LT. 1 GEDUNG ADMINISTRASI',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-ADM-01.png',
            alt: 'MAP-LANTAI-ADM-01',
            legend: false,
          },
        ],
      },
      {
        id: 'lt-3-adm',
        name: 'LT. 3 GEDUNG ADMINISTRASI',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-ADM-03.png',
            alt: 'MAP-LANTAI-ADM-03',
            legend: false,
          },
        ],
      },
      {
        id: 'lt-4-adm',
        name: 'LT. 4 GEDUNG ADMINISTRASI',
        image: [
          {
            src: '/assets/media/petunjuk-lokasi/MAP-LANTAI-ADM-04.png',
            alt: 'MAP-LANTAI-ADM-04',
            legend: false,
          },
        ],
      },
    ],
  };

  const [activeTab, setActiveTab] = useState('');
  const [activeSection, setActiveSection] = useState<'direction' | 'siteplan' | null>(null);

  useEffect(() => {
    if (activeSection === 'direction') {
      setActiveTab(directionData.sections[0].id);
    } else if (activeSection === 'siteplan') {
      setActiveTab(sitePlanData.sections[0].id);
    }
  }, [activeSection]);

  const DirectionActiveContent = directionData.sections.find((f) => f.id === activeTab);
  const SitePlanActiveContent = sitePlanData.sections.find((f) => f.id === activeTab)?.image;

  console.log(DirectionActiveContent);

  return (
    <>
      <AppMeta title="Petunjuk Lokasi" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Petunjuk Lokasi', href: '#' },
              ]}
            />
          }
          title={t('location.guide.title', t_opt)}
        >
          {/* Desktop Layout */}
          <div className="max-[776px]:hidden">
            <Grid gutter="xl" className="p-4">
              <Grid.Col span={6}>
                <Card className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-5xl mb-4">📍</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('location.guide.title', t_opt)}</h3>
                    <button
                      onClick={() => setActiveSection('direction')}
                      className="px-6 py-2 border-2 cursor-pointer border-gray-400 text-gray-600 rounded hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                    >
                      {t('see-more', { ns: 'generic' })}
                    </button>
                  </div>
                </Card>
              </Grid.Col>
              <Grid.Col span={6}>
                <Card className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-5xl mb-4">🏥</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      {t('location.site-plan.title', t_opt)}
                    </h3>
                    <button
                      onClick={() => setActiveSection('siteplan')}
                      className="px-6 py-2 border-2 cursor-pointer border-gray-400 text-gray-600 rounded hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                    >
                      {t('see-more', { ns: 'generic' })}
                    </button>
                  </div>
                </Card>
              </Grid.Col>
            </Grid>

            <div className="bg-gray-100">
              {/* Direction Content */}
              {activeSection === 'direction' && (
                <div className="flex">
                  {/* Direction Left Sidebar */}
                  <div className="w-[280px] flex-shrink-0">
                    <nav>
                      {directionData.sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveTab(section.id)}
                          className={cn(
                            'w-full text-left px-4 py-3 transition-colors duration-200 relative cursor-pointer',
                            'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
                            activeTab === section.id
                              ? 'bg-white color-mantine-blue-8 border-r-4 border-orange-500'
                              : 'text-[#25455E] hover:text-[#3B6F97] bg-transparent border-r-4 border-gray-200',
                          )}
                        >
                          <div className="font-medium">{section.name}</div>
                        </button>
                      ))}
                    </nav>
                  </div>
                  <div className="flex-1 space-y-4 m-4">
                    {DirectionActiveContent?.id === 'arah-rsui' ? (
                      <ImageWithLoading
                        src={(DirectionActiveContent?.content as { src: string; alt: string })?.src}
                        alt={(DirectionActiveContent?.content as { src: string; alt: string })?.alt}
                        className="max-w-[750px] w-full h-auto object-contain border-0 shadow-xl-all"
                        clickable={true}
                      />
                    ) : (
                      <div className="flex-1 m-4">
                        <Accordion type="single" collapsible className="space-y-4">
                          {Array.isArray(DirectionActiveContent?.content) &&
                            DirectionActiveContent.content.map((co) => (
                              <AccordionItem
                                key={co.subId}
                                value={co.subId}
                                className="bg-white rounded-lg shadow-sm border-0"
                              >
                                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                  <div className="text-left">
                                    <div className="font-medium text-gray-900">{co.subName}</div>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  {co.checkPoint.map((cp, index) => {
                                    const isLast = index === co.checkPoint.length - 1;

                                    return (
                                      <div key={cp.cpId} className="relative pl-24 pb-8">
                                        {/* Vertical Line */}
                                        {!isLast && (
                                          <div className="absolute left-12 top-0 bottom-0 w-1 bg-blue-400"></div>
                                        )}

                                        {isLast && <div className="absolute left-12 top-0 h-6 w-1 bg-blue-400"></div>}

                                        {/* Circle Marker */}
                                        <div className="absolute left-12.5 w-6 h-6 rounded-full bg-blue-400 border-4 border-white -translate-x-1/2"></div>

                                        {/* Content */}
                                        <div>
                                          <h3 className="font-semibold text-gray-900 mb-2">{cp.cpName}</h3>
                                          <p className="text-gray-600 text-sm leading-relaxed">{cp.cpDesc}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                        </Accordion>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Site Plan Content */}
              {activeSection === 'siteplan' && (
                <div className="flex">
                  {/* Site Plan Left Sidebar */}
                  <div className="w-[280px] flex-shrink-0">
                    <nav>
                      {sitePlanData.sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveTab(section.id)}
                          className={cn(
                            'w-full text-left px-4 py-3 transition-colors duration-200 relative cursor-pointer',
                            'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
                            activeTab === section.id
                              ? 'bg-white color-mantine-blue-8 border-r-4 border-orange-500'
                              : 'text-[#25455E] hover:text-[#3B6F97] bg-transparent border-r-4 border-gray-200',
                          )}
                        >
                          <div className="font-medium">{section.name}</div>
                        </button>
                      ))}
                    </nav>
                  </div>
                  {/* Main Content */}
                  <div className="flex-1 space-y-4 m-4">
                    {SitePlanActiveContent?.map((img, index) => (
                      <ImageWithLoading
                        key={index}
                        src={img.src}
                        alt={img.alt}
                        clickable={!img.legend}
                        className={cn(
                          'w-full h-auto object-contain border-0 shadow-xl-all',
                          img.legend ? 'max-w-[500px]' : 'max-w-[1000px]',
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="hidden max-[776px]:flex flex-col space-y-5">
            <Card className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('location.guide.title', t_opt)}</h3>
                <button
                  onClick={() => setActiveSection('direction')}
                  className="px-6 py-2 border-2 border-gray-400 text-gray-600 rounded hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {t('see-more', { ns: 'generic' })}
                </button>
              </div>
            </Card>
            <Card className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl mb-4">🏥</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('location.site-plan.title', t_opt)}</h3>
                <button
                  onClick={() => setActiveSection('siteplan')}
                  className="px-6 py-2 border-2 border-gray-400 text-gray-600 rounded hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {t('see-more', { ns: 'generic' })}
                </button>
              </div>
            </Card>

            <div className="bg-white">
              {/* Direction Content */}
              {activeSection === 'direction' && (
                // Direction Accordion
                <Accordion type="single" collapsible className="space-y-4 mt-8">
                  {directionData.sections.map((section) => (
                    <AccordionItem key={section.id} value={section.id} className="bg-white rounded-lg shadow-xl border">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <p className="font-medium text-gray-900">{section.name}</p>
                      </AccordionTrigger>

                      <AccordionContent className="px-6 pb-6 space-y-4">
                        {/* CASE 1: content is an IMAGE */}
                        {!Array.isArray(section.content) && section.content?.src && (
                          <ImageWithLoading
                            src={section.content.src}
                            alt={section.content.alt}
                            className="max-w-[750px] w-full h-auto object-contain border-0 shadow-xl-all"
                            clickable={true}
                          />
                        )}

                        {/* CASE 2: content is SUBSECTIONS */}
                        {Array.isArray(section.content) &&
                          section.content.map((sub) => (
                            <div key={sub.subId} className="mt-3">
                              {/* Nested accordion for each transport route */}
                              <Accordion type="single" collapsible className="ml-4 border-l pl-4 space-y-3">
                                <AccordionItem value={sub.subId} className="bg-gray-50 rounded-lg border">
                                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                    <p className="font-medium text-gray-900">{sub.subName}</p>
                                  </AccordionTrigger>

                                  <AccordionContent>
                                    <div className="relative border-l ml-4">
                                      {sub.checkPoint.map((cp, idx) => {
                                        const isLast = idx === sub.checkPoint.length - 1;

                                        return (
                                          <div key={cp.cpId} className="relative pl-24 pb-8">
                                            {/* Vertical Line */}
                                            {!isLast && (
                                              <div className="absolute left-12 top-0 bottom-0 w-1 bg-blue-400"></div>
                                            )}

                                            {isLast && (
                                              <div className="absolute left-12 top-0 h-6 w-1 bg-blue-400"></div>
                                            )}

                                            {/* Circle Marker */}
                                            <div className="absolute left-12.5 w-6 h-6 rounded-full bg-blue-400 border-4 border-white -translate-x-1/2"></div>

                                            {/* Content */}
                                            <div>
                                              <h3 className="font-semibold text-gray-900 mb-2">{cp.cpName}</h3>
                                              <p className="text-gray-600 text-sm leading-relaxed">{cp.cpDesc}</p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}

              {/* Site Plan Content */}
              {activeSection === 'siteplan' && (
                <>
                  <h3 className="font-bold text-2xl mb-3 text-[#25455e]">{t('location.site-plan.title', t_opt)}</h3>
                  {/* Site Plan Accordion */}
                  <Accordion type="single" collapsible className="space-y-4">
                    {sitePlanData.sections.map((section) => (
                      <AccordionItem
                        key={section.id}
                        value={section.id}
                        className="bg-white rounded-lg shadow-sm border-0"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <div className="text-left">
                            <div className="font-medium text-gray-900">{section.name}</div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-2 pb-4">
                          <div className="flex-1 space-y-4">
                            {section.image?.map((img, index) => (
                              <ImageWithLoading
                                key={index}
                                src={img.src}
                                alt={img.alt}
                                clickable={!img.legend}
                                className="w-full h-auto object-contain border-0 shadow-xl-all"
                              />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </>
              )}
            </div>
          </div>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
