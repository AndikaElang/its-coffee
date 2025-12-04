import { useEffect, useState } from 'react';

interface ScrollStatus {
  scrollY: number;
  scrollX: number;
  scrollDirection: 'up' | 'down' | 'none';
  isScrolling: boolean;
}

/**
 * React hook to track scrolling status
 * @returns ScrollStatus object containing scroll position, direction, and status
 */
const useScrollStatus = (): ScrollStatus => {
  const [scrollStatus, setScrollStatus] = useState<ScrollStatus>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: 'none',
    isScrolling: false,
  });

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : currentScrollY < lastScrollY ? 'up' : 'none';

      setScrollStatus({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        scrollDirection,
        isScrolling: true,
      });

      lastScrollY = currentScrollY;
      lastScrollX = currentScrollX;

      // Reset isScrolling after 100ms of inactivity
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollStatus((prev) => ({ ...prev, isScrolling: false }));
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return scrollStatus;
};

export default useScrollStatus;
