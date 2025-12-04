import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

interface NavigationEvent {
  url: URL | string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  data?: Record<string, any>;
  preserveState?: boolean;
  preserveScroll?: boolean;
  only?: string[];
  headers?: Record<string, string>;
  replace?: boolean;
  [key: string]: any;
}

interface LeaveConfirmationOptions {
  onConfirm?: () => void;
  onCancel?: () => void;
}

const useLeaveConfirmation = (
  shouldPreventLeave = true,
  message = 'Are you sure you want to leave? You may have unsaved changes.',
  options: LeaveConfirmationOptions = {},
) => {
  const [pendingNavigation, setPendingNavigation] = useState<NavigationEvent | null>(null);

  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (shouldPreventLeave) {
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    },
    [shouldPreventLeave, message],
  );

  const confirmLeave = useCallback(() => {
    if (pendingNavigation) {
      const navUrl = pendingNavigation.url instanceof URL ? pendingNavigation.url.href : pendingNavigation.url;

      // Destructure navigation options, using defaults if not provided
      const { method = 'get', data = {}, preserveState, preserveScroll, only, headers, replace } = pendingNavigation;

      router.visit(navUrl, {
        method,
        data,
        preserveState,
        preserveScroll,
        only,
        headers,
        replace,
      });

      options.onConfirm?.();
    }
    setPendingNavigation(null);
  }, [pendingNavigation, options]);

  const cancelLeave = useCallback(() => {
    options.onCancel?.();
    setPendingNavigation(null);
  }, [options]);

  useEffect(() => {
    // Handle browser refresh/close
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Handle Inertia navigation
    const unsubscribe = router.on('before', (event: any) => {
      if (shouldPreventLeave) {
        event.preventDefault();
        setPendingNavigation({
          url: event.detail.visit.url,
          ...event.detail.visit,
        });
      }
    });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      unsubscribe();
    };
  }, [handleBeforeUnload, shouldPreventLeave]);

  return {
    pendingNavigation,
    confirmLeave,
    cancelLeave,
  };
};

export default useLeaveConfirmation;
