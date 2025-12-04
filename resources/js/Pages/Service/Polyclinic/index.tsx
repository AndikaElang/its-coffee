import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import AppMeta from '@/components/Meta/AppMeta';
import { PublicLayout } from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { PolyClinic } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Badge, Box, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';

interface PolyclinicIndexProps extends PageProps {
  clinics: PolyClinic[];
}

export default function Index({ clinics, ...props }: PolyclinicIndexProps) {
  // Function to clean clinic title by removing "klinik" or "clinic" words
  const cleanClinicTitle = (title: string): string => {
    return title
      .replace(/\b(klinik|clinic)\b/gi, '') // Remove "klinik" or "clinic" (case insensitive)
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim(); // Remove leading/trailing spaces
  };

  // Group clinics by first letter
  const groupedClinics = clinics.reduce((groups: Record<string, PolyClinic[]>, clinic) => {
    const cleanTitle = cleanClinicTitle(clinic.judul);
    const firstLetter = cleanTitle.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push({ ...clinic, judul: cleanTitle });
    return groups;
  }, {});

  // Sort letters
  const sortedLetters = Object.keys(groupedClinics).sort();

  return (
    <>
      <AppMeta title="Layanan Poliklinik" />
      <PublicLayout {...props}>
        {/* Breadcrumb */}
        <Container size="xl" py="md">
          <CustomBreadcrumb
            items={[
              { label: 'Beranda', href: route('home.index') },
              { label: 'Layanan Kesehatan' },
              { label: 'Poliklinik', href: '#' },
            ]}
            mb="md"
          />
        </Container>

        {/* Hero Section */}
        <Box
          style={{
            position: 'relative',
            height: '480px',
            backgroundImage: 'url(/poli-klinik-img.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // background: 'linear-gradient(135deg, rgba(139, 69, 255, 0.8), rgba(255, 105, 180, 0.6))',
            }}
          />
        </Box>

        {/* White Background Section */}
        <Box style={{ backgroundColor: 'white', minHeight: '100vh' }}>
          {/* Poliklinic Section */}
          <Container size="xl" py="xl">
            <Text
              className="text-justify md:text-center"
              style={{
                color: '#666',
                // maxWidth: '800px',
                // margin: '0 0 3rem 0',
                lineHeight: 1.6,
                marginBottom: '3rem',
                // fontSize: '16px',
              }}
            >
              Kebutuhan kesehatan yang spesifik membutuhkan penanganan yang spesifik pula sesuai dengan kondisi yang
              Anda alami. Layanan klinik rawat jalan kami didukung oleh dokter dari berbagai spesialisasi dan
              subspesialisasi serta tenaga medis profesional dalam menjamin pelayanan terbaik untuk Anda.
            </Text>

            <Title
              order={1}
              style={{
                fontSize: '2.5rem',
                color: '#1976d2',
                marginBottom: '2rem',
                fontWeight: 600,
              }}
            >
              Poliklinik
            </Title>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem',
                alignItems: 'start',
              }}
            >
              {sortedLetters.map((letter) => (
                <Card key={letter} shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Badge
                      size="xl"
                      variant="filled"
                      style={{
                        backgroundColor: getColorByLetter(letter),
                        fontSize: '1.5rem',
                        padding: '10px 15px',
                        alignSelf: 'flex-start',
                      }}
                    >
                      {letter}
                    </Badge>

                    <Stack gap="xs">
                      {groupedClinics[letter].map((clinic) => (
                        <Group
                          key={clinic.id}
                          justify="space-between"
                          style={{
                            cursor: 'pointer',
                            padding: '8px 0',
                            borderBottom: '1px solid #f0f0f0',
                          }}
                          component={Link}
                          // @ts-ignore
                          href={route('service.polyclinic.show', { id: clinic.id })}
                        >
                          <Group gap="sm" style={{ flex: 1 }}>
                            <Text size="md" style={{ color: '#666' }}>
                              {clinic.judul}
                            </Text>
                            {clinic.center_of_excellence && (
                              <Badge
                                size="sm"
                                variant="light"
                                color="blue"
                                leftSection={<IconStar size={12} />}
                                style={{
                                  backgroundColor: '#E3F2FD',
                                  color: '#1976D2',
                                  border: '1px solid #BBDEFB',
                                }}
                              >
                                Center of Excellence
                              </Badge>
                            )}
                          </Group>
                          <Text style={{ color: '#1976d2' }}>›</Text>
                        </Group>
                      ))}
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </div>
          </Container>
        </Box>
      </PublicLayout>
    </>
  );
} // Helper function to assign colors to letters
function getColorByLetter(letter: string): string {
  const colors = {
    A: '#1a75bb', // Biru Tua (Kontras Sangat Baik)
    B: '#1b7cb9',
    C: '#1d83b7',
    D: '#1e8ab5',
    E: '#2091b3', // Biru Bergeser ke Teal
    F: '#2198b1',
    G: '#23a0af',
    H: '#25a7ad', // Teal Pekat
    I: '#27aeab',
    J: '#29b5a9',
    K: '#2CB09A', // Hijau Laut Dalam
    L: '#38AD8B',
    M: '#45AA7C', // Hijau Zamrud
    N: '#51A76D',
    O: '#6AAB5E', // Hijau Zaitun
    P: '#84AE4F',
    Q: '#9DB040', // Kuning Mustard
    R: '#B6B231',
    S: '#CFB522', // Emas Tua (Kontras Baik)
    T: '#DBA91A',
    U: '#E79D12',
    V: '#F3910A',
    W: '#F58803', // Oranye Terang (Seperti Logo, Kontras Cukup)
    X: '#E97E02',
    Y: '#DD7401',
    Z: '#D16A00', // Oranye Bakar (Kontras Sangat Baik)
  };
  return colors[letter as keyof typeof colors] || '#666';
}
