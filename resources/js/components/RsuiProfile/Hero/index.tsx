// import {About} from '@/components/RsuiProfile/About';
import { Box, Image, Stack } from '@mantine/core';

import classes from './Hero.module.css';

export default function Hero() {
  return (
    <Box className={classes.heroContainer}>
      <Stack className={classes.heroContent}>
        <Image
          src="/assets/media/logo-full-white.png"
          alt="RSUI Logo"
          mah={{ base: 100, xs: 180, sm: 220, md: 260, lg: 296 }}
          w="auto"
        />
      </Stack>
    </Box>
  );
}
