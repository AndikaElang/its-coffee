import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
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
import ReactDOMServer from 'react-dom/server';
import { RouteName } from 'ziggy-js';

import { route } from '../../vendor/tightenco/ziggy';
import '../css/app.css';
import './i18n';
import { AppProvider } from './provider';
import { myTheme } from './theme';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer(
  (page) => {
    (global as any).route = (name: RouteName, params?: any, absolute?: boolean) =>
      route(name, params, absolute, {
        // @ts-expect-error
        ...page.props.ziggy,
      });

    return createInertiaApp({
      page,
      render: ReactDOMServer.renderToString,
      title: (title) => (title ? `${title} | ${appName}` : appName),
      resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
      setup: ({ App, props }) => {
        return (
          <MantineProvider theme={myTheme}>
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
          </MantineProvider>
        );
      },
    });
  },
  { cluster: true },
);
