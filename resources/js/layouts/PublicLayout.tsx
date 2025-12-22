import Nav from '@/components/Nav';
import { Box } from '@mantine/core';
import { PropsWithChildren } from 'react';

export function PublicLayout(props: PropsWithChildren) {
  return (
    <Box className="relative flex flex-col min-h-screen">
      <Nav />

      {/* <FloatBoxMobile label="Buat Janji" href="https://m.rs.ui.ac.id/" icon={<IconMessageFilled />} /> */}

      <Box>{props.children}</Box>

      {/* <Footer /> */}
    </Box>
  );
}
