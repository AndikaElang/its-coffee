import { NotifyError } from '@/components/Notifications/Notify';
import { FormErrors, UseFormReturnType } from '@mantine/form';
import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { isDate, isString } from 'lodash-es';
import { stripHtml } from 'string-strip-html';
import { twMerge } from 'tailwind-merge';

import { PASS_REQ } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapFormErrorsToMessage(errors: FormErrors): string {
  return Object.values(errors).join(', ');
}

export function stripHTMLTags(htmlString: string, limit?: number): string {
  const stripped = stripHtml(htmlString).result;

  if (limit && stripped.length > limit) {
    return `${stripped.substring(0, limit)}...`;
  }

  return stripped;
}

export function checkMantineForm(form: UseFormReturnType<any>) {
  const { hasErrors, errors } = form.validate();
  if (hasErrors) {
    NotifyError('Form Tidak Valid', `${mapFormErrorsToMessage(errors)}`);
    return false;
  }
  return true;
}

export function upperCaseFirstLetter(str: string) {
  if (!str) return '';

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}

// Function to show current time in 24-hour format (without seconds)
export function formatTime(time: Date) {
  if (isDate(time))
    return time.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  else return time;
}

// function to format date for notification
// format:
// 1. Month Day pukul HH:MM AM/PM
// 2. Day Month Year pukul HH:MM AM/PM
// Year only shows when the date is not in the current year
export function formatNotificationDate(date: Date) {
  const now = new Date();
  const isSameYear = now.getFullYear() === date.getFullYear();

  return `${date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: isSameYear ? undefined : 'numeric',
  })} pukul ${formatTime(date)}`;
}

// function to format date for article
// format:
// yyyy-MM-dd
export function formatViewDate(date: Date | string | null) {
  if (!date) return null;
  if (isString(date)) date = new Date(date);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatFormDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function limitString(str: string, limit: number): string {
  if (!str) return '';
  return str.length > limit ? str.substring(0, limit - 3) + '...' : str;
}

export function getFirstName(name: string): string {
  if (!name) return '';
  const nameParts = name.split(' ');
  return nameParts.length > 1 ? nameParts[0] : name;
}

export function limitHTMLString(str: string, limit: number): string {
  if (!str) return '';
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.innerText.length > limit ? div.innerText.substring(0, limit - 3) + '...' : div.innerText;
}

export function removeDuplicates<T>(array: T[], key: keyof T) {
  let lookup: { [key: string]: T } = {};
  array.forEach((element) => {
    lookup[element[key] as unknown as string] = element;
  });
  return Object.keys(lookup).map((key) => lookup[key]);
}

export async function saveSub(sub: string) {
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

export function askForPermission(PUSH_NOTIFICATION_PUBLIC_KEY: string) {
  const key = PUSH_NOTIFICATION_PUBLIC_KEY;
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

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function getNameInitial(name: string) {
  const nameInitial =
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || null;

  return nameInitial;
}

export function getPasswordStrength(password: string) {
  let multiplier = password.length > 7 ? 0 : 1;

  PASS_REQ.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (PASS_REQ.length + 1)) * multiplier, 10);
}

export function getTodayString(offsetDay: number = 0): string {
  const today = new Date();
  today.setDate(today.getDate() + offsetDay);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getYearString(offsetYear: number = 0): string {
  const today = new Date();
  today.setFullYear(today.getFullYear() + offsetYear);
  const year = today.getFullYear();
  return `${year}`;
}

function getExtensionFromMime(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
  };
  return map[mime] || '';
}

export async function fileFromBlobUrl(blobUrl: string, fallbackName = 'file'): Promise<File> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const mime = blob.type || 'application/octet-stream';
  const ext = getExtensionFromMime(mime);
  const filename = `${fallbackName}.${ext}`;

  return new File([blob], filename, { type: mime });
}

export function readableEducationLevel(level: string) {
  switch (level) {
    case 'sd':
      return 'SD';
    case 'smp':
      return 'SMP';
    case 'sma':
      return 'SMA';
    case 'smk':
      return 'SMK';
    case 'diploma':
      return 'Diploma';
    case 'sarjana':
      return 'Sarjana';
    case 'magister':
      return 'Magister';
    case 'doktor':
      return 'Doktor';
    default:
      return 'Edukasi Tidak Diketahui';
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function formatRupiah(value: number) {
  if (isNaN(value)) return 'Rp0';

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
