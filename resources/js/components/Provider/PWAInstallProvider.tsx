import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface PWAInstallContextType {
  canInstall: boolean;
  install: () => Promise<boolean>;
}

const PWAInstallContext = createContext<PWAInstallContextType>({
  canInstall: false,
  install: async () => false,
});

export const PWAInstallProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // This state holds the cached beforeinstallprompt event.
  const [deferredPrompt, setDeferredPrompt] = useState<
    Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> }
    // @ts-ignore
  >(null);

  useEffect(() => {
    // Handler to capture the beforeinstallprompt event.
    const handler = (e: Event) => {
      e.preventDefault(); // Prevent the default mini-infobar.
      setDeferredPrompt(e as any);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) {
      return false;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      // Optionally clear the prompt so it won't be reused.
      // @ts-ignore
      setDeferredPrompt(null);
      return true;
    }
    return false;
  }, [deferredPrompt]);

  return (
    <PWAInstallContext.Provider value={{ canInstall: !!deferredPrompt, install }}>
      {children}
    </PWAInstallContext.Provider>
  );
};

export const usePWAInstall = (): PWAInstallContextType => {
  return useContext(PWAInstallContext);
};
