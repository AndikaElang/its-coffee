import { Accordion, Anchor, Box, Grid, Group, Image, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandX,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import classes from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const tentangKamiLinks = [
    { label: t('tentang-kami.visi-misi', { ns: 'footer' }), link: '/tentang-rsui#visi-misi' },
    { label: t('tentang-kami.struktural', { ns: 'footer' }), link: '/tentang-rsui#struktural' },
    { label: t('tentang-kami.pencapaian', { ns: 'footer' }), link: '/#pencapaian' },
    { label: t('tentang-kami.karir', { ns: 'footer' }), link: 'https://karir.rs.ui.ac.id/' },
  ];

  const informasiLinksCol1 = [
    { label: t('informasi.layanan-pusat', { ns: 'footer' }), link: '/#coe' },
    { label: t('informasi.layanan-fasilitas', { ns: 'footer' }), link: '/#fasilitas-layanan' },
    { label: t('informasi.dokter-kami', { ns: 'footer' }), link: '/pasien-pengunjung/cari-dokter' },
    { label: t('informasi.kritik-saran', { ns: 'footer' }), link: '/#kritik-saran' },
  ];

  const informasiLinksCol2 = [
    { label: t('informasi.pelatihan', { ns: 'footer' }), link: '/diklitlat/pelatihan' },
    { label: t('informasi.faq', { ns: 'footer' }), link: '/info-media/faq' },
  ];

  const socialMedia = [
    { icon: <IconBrandFacebook size={24} />, link: 'https://www.facebook.com/rumah.s.ui' },
    { icon: <IconBrandX size={24} />, link: 'https://x.com/rumahsakit_ui' },
    { icon: <IconBrandInstagram size={24} />, link: 'https://www.instagram.com/rs.ui/' },
    { icon: <IconBrandYoutube size={24} />, link: 'https://www.youtube.com/@RumahSakitUniversitasIndonesia' },
    { icon: <IconBrandTiktok size={24} />, link: 'https://www.tiktok.com/@rumahsakit_ui' },
    {
      icon: <IconBrandWhatsapp size={24} />,
      link: 'https://api.whatsapp.com/send/?phone=08119113913&text&type=phone_number&app_absent=0',
    },
  ];

  return (
    <Box className={classes.footer}>
      <div className="container mx-auto px-0">
        {isMobile ? (
          <>
            {/* Logo + Alamat di atas (sesuai gambar) */}
            <Box mb="md">
              <Group wrap="nowrap" align="flex-start" gap="md">
                <Image src={'/assets/media/logo-full-white.png'} alt="RSUI Logo" w={150} ms={'-.9rem'} fit="contain" />
                <Text size="sm" className={classes.address}>
                  {t('address', { ns: 'footer' })
                    .split('\n')
                    .map((line, index) => (
                      <span key={index} className="block">
                        {line}
                      </span>
                    ))}
                </Text>
              </Group>
            </Box>

            {/* Hanya 2 accordion: Tentang Kami & Informasi */}
            <Accordion className={classes.accordion} variant="default" chevronPosition="right" chevronSize={18}>
              <Accordion.Item value="tentang-kami">
                <Accordion.Control>
                  <Text className={classes.title} m={0}>
                    {t('tentang-kami', { ns: 'footer' })}
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Box className={classes.linkGroup}>
                    {tentangKamiLinks.map((link) => (
                      <Anchor key={link.label} href={link.link} className={classes.link}>
                        {link.label}
                      </Anchor>
                    ))}
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="informasi">
                <Accordion.Control>
                  <Text className={classes.title} m={0}>
                    {t('informasi', { ns: 'footer' })}
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Box className={classes.linkGroup}>
                    {informasiLinksCol1.concat(informasiLinksCol2).map((link) => (
                      <Anchor key={link.label} href={link.link} className={classes.link}>
                        {link.label}
                      </Anchor>
                    ))}
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>

            {/* Ayo Terhubung tampil normal di bawah accordion */}
            <Box mt="lg">
              <Text className={classes.title} m={0}>
                {t('social-callout', { ns: 'footer' })}
              </Text>
              <Group mt="md" gap="md">
                {socialMedia.map((item, index) => (
                  <Anchor
                    key={index}
                    href={item.link}
                    target="_blank"
                    className={classes.socialIcon}
                    rel="noreferrer noopener"
                  >
                    {item.icon}
                  </Anchor>
                ))}
              </Group>
            </Box>
          </>
        ) : (
          <Grid>
            {/* Kolom Tentang Kami */}
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Text className={classes.title}>{t('tentang-kami', { ns: 'footer' })}</Text>
              <Box className={classes.linkGroup}>
                {tentangKamiLinks.map((link) => (
                  <Anchor key={link.label} href={link.link} className={classes.link}>
                    {link.label}
                  </Anchor>
                ))}
              </Box>
            </Grid.Col>

            {/* Kolom Informasi Pasien dan Pengunjung */}
            <Grid.Col span={{ base: 12, sm: 6, md: 5 }}>
              <Text className={classes.title}>{t('informasi', { ns: 'footer' })}</Text>
              <Grid>
                <Grid.Col span={7}>
                  <Box className={classes.linkGroup}>
                    {informasiLinksCol1.map((link) => (
                      <Anchor key={link.label} href={link.link} className={classes.link}>
                        {link.label}
                      </Anchor>
                    ))}
                  </Box>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Box className={classes.linkGroup}>
                    {informasiLinksCol2.map((link) => (
                      <Anchor key={link.label} href={link.link} className={classes.link}>
                        {link.label}
                      </Anchor>
                    ))}
                  </Box>
                </Grid.Col>
              </Grid>
            </Grid.Col>

            {/* Kolom Ayo Terhubung Dengan Kami */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Text className={classes.title}>{t('social-callout', { ns: 'footer' })}</Text>

              {/* Social Media Icons */}
              <Group mt="md" gap="md">
                {socialMedia.map((item, index) => (
                  <Anchor
                    key={index}
                    href={item.link}
                    target="_blank"
                    className={classes.socialIcon}
                    rel="noreferrer noopener"
                  >
                    {item.icon}
                  </Anchor>
                ))}
              </Group>

              {/* Logo dan Alamat */}
              <Box mt="xl" maw={350}>
                <Group wrap="nowrap" align="flex-start" gap="md">
                  <Image
                    src={'/assets/media/logo-full-white.png'}
                    alt="RSUI Logo"
                    w={150}
                    ms={'-.9rem'}
                    fit="contain"
                  />
                  <Text size="sm" className={classes.address}>
                    {t('address', { ns: 'footer' })
                      .split('\n')
                      .map((line, index) => (
                        <span key={index} className="block">
                          {line}
                        </span>
                      ))}
                  </Text>
                </Group>
              </Box>
            </Grid.Col>
          </Grid>
        )}
      </div>

      {/* Copyright dan Links */}
      <Box mt="xl" className={classes.bottom}>
        <div className="container mx-auto px-0">
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Text size="sm">© Copyright 2025 | Rumah Sakit Universitas Indonesia. All Rights Reserved</Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group gap="md">
                <Anchor href={route('others.terms.index')} className={classes.bottomLink}>
                  {t('syarat-ketentuan', { ns: 'footer' })}
                </Anchor>
                <Text size="sm" className={classes.divider}>
                  |
                </Text>
                <Anchor href={route('others.privacyPolicy.web')} className={classes.bottomLink}>
                  {t('kebijakan-privasi', { ns: 'footer' })}
                </Anchor>
              </Group>
            </Grid.Col>
          </Grid>
        </div>
      </Box>
    </Box>
  );
}
