import LogoFull from '@/assets/media/logo.png';
import { FAVICON_URL } from '@/lib/constants';
import { Alert, Button, Center, Image, Modal, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { isIOS } from 'react-device-detect';
import { MdErrorOutline, MdOutlineInstallMobile } from 'react-icons/md';
import PWAPromptIOS from 'react-ios-pwa-prompt';

import { NotifyError } from './Notifications/Notify';
import { usePWAInstall } from './Provider/PWAInstallProvider';

interface InstallPWAPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstallPWAPrompt: React.FC<InstallPWAPromptProps> = ({ isOpen, onClose }) => {
  const { canInstall, install } = usePWAInstall();
  const [promptIos, setPromptIos] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleInstallClick = () => {
    if (isIOS) {
      setPromptIos(true);
    } else {
      if (install) {
        install()
          .then(() => {
            handleClose();
          })
          .catch((error) => {
            console.error('Installation failed:', error);
            NotifyError('Error', 'Gagal menginstall aplikasi');
          });
      }
    }
  };

  return (
    <>
      <PWAPromptIOS
        isShown={promptIos}
        onClose={() => {
          setPromptIos(false);
          handleClose();
        }}
        appIconPath={FAVICON_URL}
        copyDescription="Website ini dapat diinstall di perangkat anda sebagai PWA untuk akses yang lebih cepat dan mudah."
      />
      <Modal
        opened={isOpen}
        onClose={handleClose}
        title={
          <Title order={5} component={'span'}>
            Install MyRSUI
          </Title>
        }
        centered
      >
        <Stack gap="lg">
          <Center>
            <Image src={LogoFull} alt="My RSUI" h={125} />
          </Center>

          <Text ta={'center'} fw={600}>
            MyRSUI
          </Text>
          <Text ta={'justify'}>
            Website ini dapat diinstall di perangkat anda sebagai PWA untuk akses yang lebih cepat dan mudah.
          </Text>

          {isIOS || canInstall ? (
            <Text size="xs" c={'dimmed'} ta={'center'}>
              Gunakan Google Chrome untuk pengalaman terbaik.
            </Text>
          ) : (
            <Alert color="red" title="Browser anda tidak mendukung" icon={<MdErrorOutline />}>
              Browser anda tidak mendukung fitur ini. Silahkan gunakan Google Chrome untuk menginstall aplikasi ini.
            </Alert>
          )}

          <Button
            onClick={handleInstallClick}
            disabled={isIOS ? false : !canInstall}
            leftSection={<MdOutlineInstallMobile />}
          >
            Install
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default InstallPWAPrompt;
