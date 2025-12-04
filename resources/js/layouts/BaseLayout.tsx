import useIsRendering from '@/hooks/use-is-rendering';
import { Page, PageResolver } from '@inertiajs/core';
import axios from 'axios';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  initialPage: Page<any>;
  initialComponent: React.ReactNode;
  resolveComponent: PageResolver;
  titleCallback?: (title: string) => string;
  onHeadUpdate?: (elements: string[]) => void;
};

function BaseLayout(props: Props) {
  const rendering = useIsRendering();
  useEffect(() => {
    if (rendering) return;
    console.log('Registering service worker');
    try {
      navigator.serviceWorker.register('/service-worker.js');
    } catch (e) {
      console.log('Not HTTPS!');
    }

    async function saveSub(sub: string) {
      const jsoned = JSON.parse(sub);
      axios
        .post(route('subscribe-push-notification'), {
          sub: sub,
          endpoint: jsoned.endpoint,
          key_auth: jsoned.keys.auth,
          key_p256dh: jsoned.keys.p256dh,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error('Could not save subscription');
          console.log(error);
        });
    }

    function askForPermission() {
      const key = props.initialPage.props.PUSH_NOTIFICATION_PUBLIC_KEY;
      Notification.requestPermission().then((permission) => {
        console.log(permission);
        if (permission === 'granted') {
          // get service worker
          navigator.serviceWorker.ready.then((sw) => {
            // subscribe
            sw.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: key,
              })
              .then((subscription) => {
                // stringify to get data in json format (previously a class object)
                saveSub(JSON.stringify(subscription));
              });
          });
        }
      });
    }

    // check current window
    // must not be in / or /register
    if (window.location.pathname !== '/' && window.location.pathname !== '/register') askForPermission();
  }, [rendering]);

  return <>{props.children}</>;
}

export default BaseLayout;
