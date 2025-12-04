import { useEffect, useState } from 'react';

/**
 * Custom hook to determine if the component is still in its initial rendering phase
 * @returns boolean indicating whether the component is still rendering
 */
export function useIsRendering(): boolean {
  const [isRendering, setIsRendering] = useState<boolean>(true);

  useEffect(() => {
    // After the first render, mark rendering as complete
    const timeout = setTimeout(() => {
      setIsRendering(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return isRendering;
}

export default useIsRendering;
