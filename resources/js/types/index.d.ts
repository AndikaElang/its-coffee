import { Config } from 'ziggy-js';

import { User } from './models';

export interface SelectableList {
  label: string;
  value: string;
}

export type FlashType = 'success' | 'error' | 'info' | 'warning';
export interface FlashAlertType {
  success?: string;
  error?: string;
  info?: string;
  warning?: string;
}

export type CanType = { [key: string]: boolean };
export type AuthPageProps = {
  user?: User;
  can: CanType;
};
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: AuthPageProps;
  ziggy: Config & { location: string; urlPrevious: string | null };
  errors: { [key: string]: string };
  flash: FlashAlertType;
  PUSH_NOTIFICATION_PUBLIC_KEY: string;
};
