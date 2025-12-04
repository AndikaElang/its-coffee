import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const useIsRouterStart = (): boolean => {
  const [isRouterStart, setIsRouterStart] = useState(false);

  useEffect(() => {
    const start = () => {
      setIsRouterStart(true);
    };
    const finish = () => {
      setIsRouterStart(false);
    };

    // only when its page visit
    router.on('start', (event) => {
      start();
    });
    router.on('finish', (event) => {
      finish();
    });
  }, []);

  return isRouterStart;
};

export default useIsRouterStart;
