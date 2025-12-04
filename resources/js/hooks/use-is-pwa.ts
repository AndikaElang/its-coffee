import { useEffect, useState } from 'react';

/**
 * Hook to detect if the current session is running as a Progressive Web App (PWA)
 * @returns boolean indicating if the app is running as a PWA
 */
export const useIsPWA = (): boolean => {
  const [isPWA, setIsPWA] = useState<boolean>(false);

  useEffect(() => {
    const checkIsPWA = () => {
      // Check if display-mode is standalone or fullscreen
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;

      // Check for iOS Safari's standalone mode
      const isIOSStandalone = 'standalone' in window.navigator && (window.navigator as any).standalone === true;

      setIsPWA(isStandalone || isFullscreen || isIOSStandalone);
    };

    checkIsPWA();

    // Listen for changes in display mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = () => checkIsPWA();

    // Use the appropriate event listener method
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      (mediaQuery as any).addListener?.(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        (mediaQuery as any).removeListener?.(handleChange);
      }
    };
  }, []);

  return isPWA;
};

export default useIsPWA;
