import { generateColors } from '@mantine/colors-generator';
import { ActionIcon, createTheme } from '@mantine/core';

const blue = generateColors('#0072bc');
const orange = generateColors('#F26522');

export const myTheme = createTheme({
  primaryColor: 'blue',
  focusRing: 'always',
  fontFamily: 'Poppins, Geist, Open Sans, sans-serif',
  headings: { fontFamily: 'Poppins, Geist, Open Sans, sans-serif' },
  fontFamilyMonospace: 'Geist Mono, Open Sans, sans-serif',
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: 'subtle',
      },
    }),
  },
  defaultRadius: 'md',
  colors: {
    whiteAlpha: generateColors('#FAFAFA'),
    blue: blue,
    orange: orange,
  },
  breakpoints: {
    'logo-auth': '1064px',
    tablet: '768px',
    mobile: '600px',
    'mobile-s': '320px',
    'mobile-m': '375px',
    'mobile-l': '425px',
  },
});
