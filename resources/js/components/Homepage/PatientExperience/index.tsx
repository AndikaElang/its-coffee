import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import type { PatientExperience } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Avatar, Box, Group, Paper, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MoveRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import homepageStyle from '~/css/Homepage.module.css';

import classes from './PatientExperience.module.css';

// Pilih kalimat positif + potong panjangnya
const POSITIVE_WORDS_ID = [
  'puas',
  'sangat puas',
  'ramah',
  'cepat',
  'profesional',
  'terbantu',
  'nyaman',
  'baik',
  'bersih',
  'rekomendasi',
  'rekomendasikan',
  'terima kasih',
  'memuaskan',
  'sigap',
  'informatif',
  'terpercaya',
  'aman',
  'kompeten',
  'peduli',
  'sopan',
  'telaten',
  'luar biasa',
  'mengapresiasi',
  'sukses',
];

function decodeHtml(html: string): string {
  if (typeof window !== 'undefined') {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  return html
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripHtml(html: string): string {
  const noTags = html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ');
  return decodeHtml(noTags).replace(/\s+/g, ' ').trim();
}

function toSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?…])\s+|(?<=\.)\s+/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function truncate(text: string, limit = 180): string {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim() + '…';
}

function getPositiveExcerpt(html: string, limit = 180): string {
  const plain = stripHtml(html);
  const sentences = toSentences(plain);
  const positives = sentences.filter((s) => POSITIVE_WORDS_ID.some((w) => s.toLowerCase().includes(w)));
  const pick = positives[0] ?? sentences[0] ?? '';
  return truncate(pick, limit);
}

export default function PatientExperience(props: PageProps & { ns: string; patientExperiences: PatientExperience[] }) {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const testimonials = props.patientExperiences;
  const t_opt = { ns: props.ns };

  useEffect(() => {
    // Memastikan animasi hanya berjalan di client-side
    setIsMounted(true);
  }, []);

  const items = useMemo(
    () =>
      testimonials.map((testimonial) => (
        <Stack key={testimonial.nama} align="center" gap="md">
          <Paper withBorder radius="md" className={classes.testimonial}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed" ta="justify">
                {getPositiveExcerpt(testimonial.deskripsi ?? '', isMobile ? 140 : 180)}
              </Text>
              {/* <Anchor href="/cerita-mereka" size="sm" className={classes.link}>
            Baca selengkapnya →
          </Anchor> */}
            </Stack>
          </Paper>
          <Group>
            <Avatar
              src={testimonial.file_name}
              alt={testimonial.nama ? testimonial.nama : ''}
              size={isMobile ? 60 : 80}
              radius="xl"
            />
            <Stack gap={0} align="flex-start">
              <Text fw={700} size={isMobile ? 'sm' : 'md'}>
                {testimonial.nama}
              </Text>
              <Text size="sm" c="white" className={classes.wrap}>
                {testimonial.profesi}
              </Text>
            </Stack>
          </Group>
        </Stack>
      )),
    [testimonials, isMobile],
  );

  return (
    <Box className={cn(classes.wrapper)} id="kritik-saran" style={{ scrollMarginTop: '120px' }}>
      <div className="container mx-auto max-xs:px-4">
        <div className={cn(homepageStyle.header, 'pt-8')}>
          <div>
            <h2 className="text-4xl font-bold text-left mb-4">{t('pengalaman-pasien', t_opt)}</h2>
          </div>
          <Link
            href={route('others.patientExperience.index')}
            className={cn(homepageStyle['header-link'], 'text-white!')}
          >
            <Group gap="xs" align="center" wrap="nowrap">
              {t('pengalaman-pasien.lihat-semua', t_opt)} <MoveRight size={20} />
            </Group>
          </Link>
        </div>
      </div>

      <Box py="xl" px="md">
        <div className={classes.scrollerContainer} data-animated={isMounted}>
          <ul className={classes.scrollerInner}>
            {items}
            {items}
          </ul>
        </div>
      </Box>
    </Box>
  );
}
