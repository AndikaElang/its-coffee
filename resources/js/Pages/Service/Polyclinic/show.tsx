import NormalCard, { GenericDescription } from '@/components/Card/NormalCard';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/PublicLayout';
import { stripHTMLTags } from '@/lib/utils';
import { PageProps } from '@/types';
import { PolyClinic, PolyClinicArticle, PolyClinicDoctor, PolyClinicPoster, PolyClinicVideo } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Carousel } from '@mantine/carousel';
import { Accordion, Anchor, Container, Grid, Group, Text, Title, Typography, useMantineTheme } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useState } from 'react';
import classes from '~/css/Carousel.module.css';

interface PolyclinicShowProps extends PageProps {
  clinic: PolyClinic;
  clinicPoster: PolyClinicPoster[];
  clinicArticles: PolyClinicArticle[];
  clinicVideos: PolyClinicVideo[];
  clinicDoctors: PolyClinicDoctor[];
}

export default function Show({
  clinic,
  clinicPoster,
  clinicArticles,
  clinicVideos,
  clinicDoctors,
  ...props
}: PolyclinicShowProps) {
  const [activeTab, setActiveTab] = useState('ruang-lingkup');
  const theme = useMantineTheme();

  // Fungsi untuk mengekstrak ID YouTube dari URL
  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;

    // Pattern untuk berbagai format YouTube URL
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtube\.com\/v\/)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  // Fungsi untuk mendapatkan URL thumbnail YouTube
  const getYouTubeThumbnail = (url: string): string => {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      // Gunakan hqdefault sebagai fallback jika maxresdefault tidak tersedia
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return '/assets/media/example/video-placeholder.jpg';
  };

  const tabs = [
    { id: 'ruang-lingkup', label: 'Ruang Lingkup Pelayanan', content: clinic.ruang_lingkup_layanan },
    { id: 'layanan-unggulan', label: 'Layanan Unggulan', content: clinic.layanan_unggulan },
    { id: 'fasilitas', label: 'Fasilitas dan Teknologi', content: clinic.fasilitas_dan_teknologi },
    { id: 'dokter', label: 'Dokter Kami', content: null },
  ];

  return (
    <>
      <AppMeta
        title={clinic.judul}
        description={clinic.deskripsi ? stripHTMLTags(clinic.deskripsi, 300) : ''}
        ogImage={clinic.img_file_name}
      />
      <PublicLayout {...props}>
        {/* Breadcrumb and Back Button */}
        <Container size="xl" py="md">
          <CustomBreadcrumb
            items={[
              { label: 'Beranda', href: route('home.index') },
              { label: 'Layanan Kesehatan' },
              { label: 'Poliklinik', href: route('service.polyclinic.index') },
              { label: clinic.judul },
            ]}
            mb="md"
          />
          {/* <Group gap="sm" className="mb-4">
            <Link href={route('service.polyclinic.index')}>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Poliklinik
              </Button>
            </Link>
          </Group> */}
        </Container>

        {/* Hero Section */}
        <Container size="xl" py="xl">
          <Grid gutter="xl">
            {/* Image First on Mobile, Second on Desktop */}
            <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageWithLoading
                  src={clinic.img_file_name}
                  alt={clinic.judul}
                  imageFull={false}
                  imageClassname="w-full h-80 object-cover"
                />
              </div>
            </Grid.Col>

            {/* Content Second on Mobile, First on Desktop */}
            <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
              <div className="pr-0 md:pr-8">
                <Title order={1} className="text-2xl font-bold text-left color-mantine-blue-8">
                  {clinic.judul}
                </Title>
                {clinic.deskripsi && (
                  <Typography>
                    <div
                      className="rich-text-typography text-lg text-gray-600 leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{ __html: clinic.deskripsi }}
                    />
                  </Typography>
                )}
                {clinic.center_of_excellence && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                    Center of Excellence
                  </div>
                )}
              </div>
            </Grid.Col>
          </Grid>
        </Container>

        {/* Navigation Tabs (Desktop) */}
        <div className="hidden md:block">
          <Container size="xl">
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#F26522] text-[#F26522]'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </Container>
        </div>

        {/* Navigation Accordion (Mobile) */}
        <div className="block md:hidden mb-8">
          <Container size="xl">
            <Accordion variant="default" chevronPosition="right">
              {tabs.map((tab) => (
                <Accordion.Item key={tab.id} value={tab.id}>
                  <Accordion.Control className="text-sm font-medium">{tab.label}</Accordion.Control>
                  <Accordion.Panel>
                    <div className="p-4">
                      {tab.id === 'dokter' ? (
                        <div>
                          {clinicDoctors && clinicDoctors.length > 0 ? (
                            <div className="grid gap-4">
                              <Text className="text-gray-600 mb-4">
                                Tim dokter profesional yang berpengalaman di klinik ini:
                              </Text>
                              <div className="grid grid-cols-1 gap-4">
                                {clinicDoctors.map((doctor) => (
                                  <Anchor
                                    key={doctor.id}
                                    href={doctor.link_dokter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline="never"
                                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                  >
                                    <Text fw={600} className="text-blue-600 hover:text-blue-800">
                                      {doctor.nama}
                                    </Text>
                                  </Anchor>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <Text className="text-gray-500 mb-4">Belum ada informasi dokter yang tersedia</Text>
                              <Text size="sm" className="text-gray-400">
                                Silakan hubungi bagian informasi untuk mengetahui jadwal dokter
                              </Text>
                            </div>
                          )}
                        </div>
                      ) : tab.content ? (
                        <Typography>
                          <div
                            className="rich-text-typography prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: tab.content }}
                          />
                        </Typography>
                      ) : (
                        <Text className="text-gray-500 italic">Informasi belum tersedia</Text>
                      )}
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Container>
        </div>

        {/* Tab Content (Desktop only) */}
        <div className="hidden md:block">
          <Container size="xl" className="mb-12">
            {tabs.map((tab) => (
              <div key={tab.id} className={`${activeTab === tab.id ? 'block' : 'hidden'}`}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl color-mantine-blue-8">{tab.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {tab.id === 'dokter' ? (
                      <div>
                        {clinicDoctors && clinicDoctors.length > 0 ? (
                          <div className="grid gap-4">
                            <Text className="text-gray-600 mb-4">
                              Tim dokter profesional yang berpengalaman di klinik ini:
                            </Text>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {clinicDoctors.map((doctor) => (
                                <Anchor
                                  key={doctor.id}
                                  href={doctor.link_dokter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  underline="never"
                                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                >
                                  <Text fw={600} className="text-blue-600 hover:text-blue-800">
                                    {doctor.nama}
                                  </Text>
                                </Anchor>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Text className="text-gray-500 mb-4">Belum ada informasi dokter yang tersedia</Text>
                            <Text size="sm" className="text-gray-400">
                              Silakan hubungi bagian informasi untuk mengetahui jadwal dokter
                            </Text>
                          </div>
                        )}
                      </div>
                    ) : tab.content ? (
                      <Typography>
                        <div
                          className="rich-text-typography prose prose-lg max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ __html: tab.content }}
                        />
                      </Typography>
                    ) : (
                      <Text className="text-gray-500 italic">Informasi belum tersedia</Text>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </Container>
        </div>

        {/* Articles Section */}
        {clinicArticles.length > 0 && (
          <Container size="xl" className="mb-12">
            <div>
              <Title order={2} className="text-2xl font-bold color-mantine-blue-8 mb-4 text-center">
                Artikel Terkait
              </Title>
              <p className="text-[#3C3C3C] opacity-60 text-center">
                Artikel dan informasi terkini seputar layanan kesehatan di klinik kami
              </p>
            </div>

            <div className="mx-auto overflow-hidden">
              <Carousel
                withIndicators
                slideSize={{ base: '50%', sm: '40%', md: '30%', lg: '25%' }}
                slideGap={'xl'}
                emblaOptions={{ loop: true, align: 'start' }}
                classNames={classes}
              >
                {clinicArticles.map((article, i) => (
                  <Carousel.Slide key={i} className="pt-12 pb-12">
                    <NormalCard
                      key={article.id}
                      title={article.artikel_judul || ''}
                      image={article.artikel_thumbnail_file_name || ''}
                      description={
                        <GenericDescription description={''} title={article.artikel_judul || ''} isHtml={false} />
                      }
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
            {/* </div> */}
          </Container>
        )}

        {/* Video Section */}
        {clinicVideos.length > 0 && (
          <Container size="xl" className="mb-12">
            <div className="mb-8">
              <Title order={2} className="text-2xl font-bold color-mantine-blue-8 text-center">
                Video Terkait
              </Title>
              <p className="text-[#3C3C3C] opacity-60 text-center">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              </p>
            </div>

            <Grid gutter="lg">
              {clinicVideos.slice(0, 4).map((video) => (
                <Grid.Col key={video.id} span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
                  <div className="cursor-pointer group">
                    {/* Video Thumbnail Container */}
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <img
                        src={getYouTubeThumbnail(video.video_url)}
                        alt={video.video_judul}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />

                      {/* Duration Badge (bottom right) */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                        Video
                      </div>

                      {/* Play Overlay (center, on hover) */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Anchor
                          href={video.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-600 hover:bg-red-700 rounded-full p-3 shadow-lg transition-all duration-200"
                        >
                          <IconPlayerPlay size={20} className="text-white ml-0.5" fill="currentColor" />
                        </Anchor>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex gap-3">
                      {/* Channel Avatar (small circle) */}
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center">
                          <img src="/logo.png" alt="RSUI Logo" className="w-6 h-6 object-contain" loading="lazy" />
                        </div>
                      </div>

                      {/* Video Details */}
                      <div className="flex-1 min-w-0">
                        <Anchor
                          href={video.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          <Text
                            fw={600}
                            lineClamp={2}
                            className="text-gray-900 hover:text-gray-700 transition-colors text-sm leading-5 mb-1"
                          >
                            {video.video_judul}
                          </Text>
                        </Anchor>

                        <Text size="xs" className="text-gray-600 mb-1">
                          {clinic.judul}
                        </Text>

                        <div className="flex items-center gap-1">
                          <Text size="xs" className="text-gray-600">
                            Video Edukasi
                          </Text>
                          <span className="text-gray-400">•</span>
                          <Text size="xs" className="text-gray-600">
                            Kesehatan
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        )}

        {/* Call to Action */}
        <Container size="xl" className="my-12">
          <Card className="bg-gradient-to-r from-[#0072bc] to-[#005a96] text-white overflow-hidden">
            <CardContent className="relative text-center py-12 px-6">
              <Title order={2} className="text-2xl font-bold mb-4 text-white">
                Butuh Konsultasi Lebih Lanjut?
              </Title>
              <p className="text-blue-100 mt-2 mb-8 max-w-2xl mx-auto block">
                Tim medis profesional kami siap membantu Anda. Hubungi kami untuk mendapatkan pelayanan terbaik.
              </p>
              <Group justify="center" gap="md">
                <Button asChild className="bg-[#F26522] text-white hover:bg-[#d4571e] border-transparent">
                  <Link href="#">Hubungi Kami</Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-[#0072bc]"
                  onClick={() => setActiveTab('dokter')}
                >
                  Lihat Jadwal Dokter
                </Button>
              </Group>
            </CardContent>
          </Card>
        </Container>
      </PublicLayout>
    </>
  );
}
