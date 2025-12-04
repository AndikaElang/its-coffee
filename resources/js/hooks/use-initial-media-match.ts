import { useEffect, useState } from 'react';

export default function useInitialMediaMatch({ type, breakpoint }: { type: 'min' | 'max'; breakpoint: number }) {
  const [initialMatch, setInitialMatch] = useState<boolean>(false);
  useEffect(() => {
    // For unknown reason the breakpoint is not working as expected in article-populer page
    // check route, if route contains 'artikel-populer' add +16 to breakpoint
    let adjustedBreakpoint = breakpoint;
    if (window.location.pathname.includes('artikel-populer')) {
      adjustedBreakpoint += 16;
    }

    if (type === 'min') {
      setInitialMatch(window.innerWidth >= adjustedBreakpoint);
    } else {
      setInitialMatch(window.innerWidth <= adjustedBreakpoint);
    }
  }, []);
  return initialMatch;
}
