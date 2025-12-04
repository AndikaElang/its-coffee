import { MOBILE_BREAKPOINT } from '@/lib/constants';
import { FlashAlertType } from '@/types';
import { Alert, AlertProps, Stack } from '@mantine/core';
import { useMediaQuery, useTimeout } from '@mantine/hooks';
import { IconAlertTriangle, IconMessageCircle, IconProgressCheck, IconXboxX } from '@tabler/icons-react';
import { cx } from 'class-variance-authority';
import { useEffect, useState } from 'react';

import classes from './FlashAlert.module.css';

const useHiddenState = (show: boolean) => {
  const [hidden, setHidden] = useState(false);
  const { start, clear } = useTimeout(() => setHidden(true), 500);
  useEffect(() => {
    if (!show) start();
    return () => clear();
  }, [show]);

  return hidden;
};

const SuccessAlert = ({
  state,
  show,
  closeFn,
  ...others
}: {
  state: FlashAlertType;
  show: boolean;
  closeFn: () => void;
  others?: AlertProps;
}) => {
  const { style: customStyle, ...customProp } = others.others ?? {};
  const hidden = useHiddenState(show);
  return (
    <Alert
      color="green"
      title="Sukses"
      icon={<IconProgressCheck />}
      style={{ whiteSpace: 'pre-wrap' }}
      {...customProp}
      withCloseButton
      onClose={closeFn}
      className={cx({
        [classes.showAnimation]: show,
        [classes.hideAnimation]: !show,
      })}
      display={hidden ? 'none' : 'block'}
    >
      {state.success}
    </Alert>
  );
};

const ErrorAlert = ({
  state,
  show,
  closeFn,
  ...others
}: {
  state: FlashAlertType;
  show: boolean;
  closeFn: () => void;
  others?: AlertProps;
}) => {
  const { style: customStyle, ...customProp } = others.others ?? {};
  const hidden = useHiddenState(show);
  return (
    <Alert
      color="red"
      title="Error"
      icon={<IconXboxX />}
      style={{ whiteSpace: 'pre-wrap' }}
      {...customProp}
      withCloseButton
      onClose={closeFn}
      className={cx({
        [classes.showAnimation]: show,
        [classes.hideAnimation]: !show,
      })}
      display={hidden ? 'none' : 'block'}
    >
      {state.error}
    </Alert>
  );
};

const WarningAlert = ({
  state,
  show,
  closeFn,
  ...others
}: {
  state: FlashAlertType;
  show: boolean;
  closeFn: () => void;
  others?: AlertProps;
}) => {
  const { style: customStyle, ...customProp } = others.others ?? {};
  const hidden = useHiddenState(show);
  return (
    <Alert
      color="orange"
      title="Perhatian"
      icon={<IconAlertTriangle />}
      style={{ whiteSpace: 'pre-wrap' }}
      {...customProp}
      withCloseButton
      onClose={closeFn}
      className={cx({
        [classes.showAnimation]: show,
        [classes.hideAnimation]: !show,
      })}
      display={hidden ? 'none' : 'block'}
    >
      {state.warning}
    </Alert>
  );
};

const InfoAlert = ({
  state,
  show,
  closeFn,
  ...others
}: {
  state: FlashAlertType;
  show: boolean;
  closeFn: () => void;
  others?: AlertProps;
}) => {
  const { style: customStyle, ...customProp } = others.others ?? {};
  return (
    <Alert
      color="blue"
      title="Informasi"
      icon={<IconMessageCircle />}
      style={{ whiteSpace: 'pre-wrap' }}
      {...customProp}
      withCloseButton
      onClose={closeFn}
      className={cx({
        [classes.showAnimation]: show,
        [classes.hideAnimation]: !show,
      })}
    >
      {state.info}
    </Alert>
  );
};

export default function FlashAlert({ state, ...others }: { state: FlashAlertType; others?: AlertProps }) {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [showSuccess, setShowSuccess] = useState(true);
  const [showError, setShowError] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const atLeastOneAlert = state.success || state.error || state.warning || state.info;

  if (!atLeastOneAlert) return null;
  return (
    <Stack gap="md" mb={'md'} mt={isMobile ? undefined : 'md'}>
      {state.success && (
        <SuccessAlert state={state} {...others} closeFn={() => setShowSuccess(false)} show={showSuccess} />
      )}
      {state.error && <ErrorAlert state={state} {...others} closeFn={() => setShowError(false)} show={showError} />}
      {state.warning && (
        <WarningAlert state={state} {...others} closeFn={() => setShowWarning(false)} show={showWarning} />
      )}
      {state.info && <InfoAlert state={state} {...others} closeFn={() => setShowInfo(false)} show={showInfo} />}
    </Stack>
  );
}
