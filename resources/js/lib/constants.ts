export const LAPTOP_BREAKNUMBER = 1024;
export const LAPTOP_BREAKPOINT = `(max-width: ${LAPTOP_BREAKNUMBER}px)`;
export const MD_BREAKNUMBER = 1020;
export const MD_BREAKPOINT = `(max-width: ${MD_BREAKNUMBER}px)`;
export const TABLET_BREAKNUMBER = 768;
export const TABLET_BREAKPOINT = `(max-width: ${TABLET_BREAKNUMBER}px)`;
export const MOBILE_BREAKNUMBER = 425;
export const MOBILE_BREAKPOINT = `(max-width: ${MOBILE_BREAKNUMBER}px)`;
export const MOBILE_S_BREAKNUMBER = 320;
export const MOBILE_S_BREAKPOINT = `(max-width: ${MOBILE_S_BREAKNUMBER}px)`;

export const TW_SM = 640;
export const TW_MD = 768;
export const TW_LG = 1024;
export const TW_XL = 1280;
export const TW_2XL = 1536;

export const PASS_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
export const PASS_REQ = [
  { re: /[0-9]/, label: 'Harus terdapat setidaknya satu angka' },
  { re: /[a-z]/, label: 'Harus terdapat setidaknya satu huruf kecil' },
  { re: /[A-Z]/, label: 'Harus terdapat setidaknya satu huruf besar' },
];
export const _MB = 1024 * 1024;
export const FILE_SIZE_LIMIT = 20 * _MB;
export const AVATAR_SIZE_LIMIT = 5 * _MB;
export const USERNAME_RE = /^[a-zA-Z0-9._]*$/;
export const USERNAME_REPLACE_RE = /[^a-zA-Z0-9._]/g;
export const TIMEOUT_NORMAL = 60 * 1000; // 1 minute
export const FAVICON_URL = 'https://rs.ui.ac.id/favicon.ico'; // TODO: EDIT with real domain
export const CUSTOMER_WEB_URL = 'https://m.rs.ui.ac.id';

export const GENERAL_VARCHAR_LIMIT = 255;
export const SHORT_TEXT_LIMIT = 1000;
export const LOGO_PATH = '/assets/media/logo-full.png';
export const LOAD_GIF_PATH = '/assets/media/load.gif';
export const INITIAL_RTE_CONTENT = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Type here...' }],
    },
  ],
};
export const EDUCATION_LEVELS = [
  { value: 'sd', label: 'SD' },
  { value: 'smp', label: 'SMP' },
  { value: 'sma', label: 'SMA' },
  { value: 'smk', label: 'SMK' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'sarjana', label: 'Sarjana' },
  { value: 'magister', label: 'Magister' },
  { value: 'doktor', label: 'Doktor' },
];
