import { PageProps } from '@/types';
import { Box, List, Text, ThemeIcon, Title } from '@mantine/core';
import { CircleDot } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import classes from './About.module.css';

export default function About(props: PageProps & { ns: string }) {
  const { t } = useTranslation();
  const t_opt = { ns: props.ns };
  const visionItems = t('vision', { ...t_opt, returnObjects: true }) as string[];

  return (
    <Box py={{ base: 'xl', md: '5rem' }}>
      <div className="container mx-auto max-xs:px-4">
        <Title order={1} className={classes.title}>
          Rumah Sakit Universitas Indonesia
        </Title>
        <Text mt="lg" className={classes.paragraph} ta="justify">
          {t('description', t_opt)}
        </Text>
        <div id="visi-misi" style={{ scrollMarginTop: '140px' }}>
          <Title order={2} className={classes.subTitle} mt={{ base: 40, md: 60 }}>
            {t('mission-title', t_opt)}
          </Title>
          <Text mt="sm" className={classes.paragraph} ta="justify">
            {t('mission', t_opt)}
          </Text>

          <Title order={2} className={classes.subTitle} mt={{ base: 40, md: 60 }}>
            {t('vision-title', t_opt)}
          </Title>
          <List
            mt="sm"
            spacing="xs"
            icon={
              <ThemeIcon color="orange" size={16} radius="xl">
                <CircleDot size={10} />
              </ThemeIcon>
            }
            className={classes.list}
          >
            {Array.isArray(visionItems) && visionItems.map((item, index) => <List.Item key={index}>{item}</List.Item>)}
          </List>
        </div>
      </div>
    </Box>
  );
}
