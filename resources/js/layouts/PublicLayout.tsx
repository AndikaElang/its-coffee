import FloatBoxMobile from '@/components/FloatBoxMobile';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { Box } from '@mantine/core';
import { IconMessageFilled } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';

export function PublicLayout(props: PropsWithChildren) {
  return (
    <Box className="relative flex flex-col min-h-screen">
      <Nav />

      <FloatBoxMobile label="Buat Janji" href="https://m.rs.ui.ac.id/" icon={<IconMessageFilled />} />

      <Box>{props.children}</Box>

      <Footer />
    </Box>
  );
}
