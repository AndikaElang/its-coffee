import { Link } from '@inertiajs/react';
import { AppShell, Button, Flex } from '@mantine/core';
import { cx } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

import classes from './AuthLayout.module.css';

function AuthLayout({
  children,
  customWrapper,
  footerInMobileView = false,
}: PropsWithChildren & { customWrapper?: boolean; footerInMobileView?: boolean }) {
  return (
    <AppShell layout="alt" footer={{ height: 50 }} padding={0}>
      <AppShell.Main component={Flex}>
        {customWrapper ? (
          <>{children}</>
        ) : (
          <Flex mx={'auto'} justify="center" align="center" px={'md'} className={classes.authPage}>
            {children}
          </Flex>
        )}
      </AppShell.Main>
      <AppShell.Footer className={cx({ [classes.footerHiddenInMobile]: !footerInMobileView })}>
        <Button pt={'sm'} c="dimmed" fz="sm" component={Link} href={'/'} target="_blank" variant="transparent">
          &copy;&nbsp;{new Date().getFullYear()}&nbsp;Rumah Sakit Universitas Indonesia
        </Button>
      </AppShell.Footer>
    </AppShell>
  );
}

export default AuthLayout;
