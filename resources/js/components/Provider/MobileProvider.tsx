import useInitialMediaMatch from '@/hooks/use-initial-media-match';
import { MOBILE_BREAKNUMBER } from '@/lib/constants';
import { createContext, useContext } from 'react';
import { isMobile } from 'react-device-detect';

const MobileContext = createContext<boolean | null>(null);

export function MobileProvider({ children }: { children: React.ReactNode }) {
  const initialMatch = useInitialMediaMatch({ type: 'max', breakpoint: MOBILE_BREAKNUMBER });
  const isInitialMobile = initialMatch && isMobile; // Computed value

  return <MobileContext.Provider value={isInitialMobile}>{children}</MobileContext.Provider>;
}

export function useInitialMobile() {
  const context = useContext(MobileContext);
  if (context === null) {
    throw new Error('useInitialMobile must be used within a MobileProvider');
  }
  return context;
}
