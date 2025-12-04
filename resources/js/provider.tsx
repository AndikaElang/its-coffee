'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoadingIndicator from './components/Loading/LoadingIndicator';
import { AxiosStatusProvider } from './components/Provider/AxiosStatusProvider';
import { MobileProvider } from './components/Provider/MobileProvider';
import { PWAInstallProvider } from './components/Provider/PWAInstallProvider';

const queryClient = new QueryClient();

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AxiosStatusProvider>
        <MobileProvider>
          <PWAInstallProvider>
            <LoadingIndicator />
            {children}
          </PWAInstallProvider>
        </MobileProvider>
      </AxiosStatusProvider>
    </QueryClientProvider>
  );
}
