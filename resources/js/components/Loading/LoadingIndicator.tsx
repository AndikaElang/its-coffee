import LoadGif from '@/assets/media/load.gif';
import useProgressWhenRendering from '@/hooks/use-progress-when-rendering';
import { Image, Stack, Text } from '@mantine/core';
import React from 'react';

import classes from './LoadingIndicator.module.css';

const loadingText = 'Loading...'.split('').map((char, index) => (
  // @ts-ignore
  <span key={index} style={{ '--i': index + 1 }}>
    {char}
  </span>
));
const LoadingIndicator: React.FC = () => {
  const { isRendering } = useProgressWhenRendering();

  if (!isRendering) return null;
  return (
    <Stack
      className="top-0 left-0 centered-wrapper transition-all duration-300 backdrop-blur-lg bg-background/40"
      pos={'fixed'}
      style={{ zIndex: 9999, width: '100%', height: '100%' }}
    >
      <Image className="centered-xy" src={LoadGif} alt="Loading" w={75} mb={'md'} />

      <Text fw={500} fs="italic" c={'dimmed'} className={classes.waviy}>
        {loadingText}
      </Text>
    </Stack>
  );
};

export default LoadingIndicator;
