import { createInertiaApp } from '@inertiajs/react';
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { NavigationProgress } from '@mantine/nprogress';
import '@mantine/nprogress/styles.css';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import 'mantine-datatable/styles.layer.css';
import { createRoot, hydrateRoot } from 'react-dom/client';

import '../css/app.css';
import './bootstrap';
import './i18n';
import BaseLayout from './layouts/BaseLayout';
import { AppProvider } from './provider';
import { myTheme } from './theme';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const glob = import.meta.glob('./Pages/**/*.tsx');

createInertiaApp({
  title: (title) => (title ? `${title} | ${appName}` : appName),
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, glob),
  setup({ el, App, props }) {
    if (import.meta.env.DEV) {
      createRoot(el).render(
        <MantineProvider theme={myTheme} defaultColorScheme="light" forceColorScheme="light">
          <NavigationProgress />
          <Notifications position="top-right" zIndex={1000} />
          <ModalsProvider
            modalProps={{
              zIndex: 1000,
            }}
          >
            <AppProvider>
              <App {...props} />
            </AppProvider>
          </ModalsProvider>
        </MantineProvider>,
      );
      return;
    }

    hydrateRoot(
      el,
      <MantineProvider theme={myTheme}>
        <NavigationProgress />
        <Notifications position="top-right" zIndex={1000} />
        <ModalsProvider
          modalProps={{
            zIndex: 1000,
          }}
        >
          <AppProvider>
            <BaseLayout {...props}>
              <App {...props} />
            </BaseLayout>
          </AppProvider>
        </ModalsProvider>
      </MantineProvider>,
    );
  },
});
