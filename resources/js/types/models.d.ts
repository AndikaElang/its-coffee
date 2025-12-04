export interface paginatedData<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

type PoliklinikTotal = {
  poliklinik: string;
  total: number;
};

type PenjaminTotal = {
  penjamin: string;
  total: number;
};

type MemberTotal = {
  gender: string;
  total: number;
};
export interface Dashboard {
  resHistory: PenjaminTotal[];
  resRegistration: PenjaminTotal[];
  topSixHistoryPoli: PoliklinikTotal[];
  topSixRegistrationPoli: PoliklinikTotal[];
  totalMemberByGender: MemberTotal[];
  totalPatientByGender: MemberTotal[];
  totalUserPatient: number;
}

export interface User {
  id: number | string;
  role?: string;
  roles: {
    id: number;
    name: RoleName;
    guard_name: string;
    permissions: {
      id: number;
      name: string;
      guard_name: string;
      created_at: string;
      updated_at: string;
      pivot: {
        permission_id: number;
        role_id: number;
      };
    }[];
    pivot: {
      model_id: string;
      model_type: string;
      role_id: number;
    };
  }[];
  avatar?: string; // image from laravel-medialibrary
  featured_image?: string; // image from laravel-medialibrary ???
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  password?: string;
  // password_confirmation?: string; // ??? why this is here
}

export interface Media {
  collection_name: string;
  conversions_disk: string;
  disk: string;
  file_name: string;
  generated_conversions: {
    [key: string]: {
      conversion: string;
      disk: string;
      file_name: string;
      mime_type: string;
      size: number;
    };
  };
  custom_properties: {
    [key: string]: any;
  };
  id: number;
  manipulations: {
    [key: string]: {
      crop?: {
        height: number;
        width: number;
        x: number;
        y: number;
      };
      fit?: {
        height: number;
        width: number;
      };
      resize?: {
        height: number;
        width: number;
      };
    };
  };
  mime_type: string;
  model_id: number;
  model_type: string;
  name: string;
  order_column: number;
  responsive_images: {
    [key: string]: {
      conversion: string;
      disk: string;
      file_name: string;
      mime_type: string;
      size: number;
    };
  };
  original_url: string;
  preview_url: string;
  size: number;
  updated_at: string;
  uuid: string;
}

export interface Role {
  _method?: string;
  id: string;
  name: string;
  guard_name: string;
  enable_all: boolean;
  description: string;
  created_at: string;
  updated_at: string;
}

export type Permission = {
  name: string;
  active?: boolean;
  permission: {
    name: string;
    active?: boolean;
  }[];
};

export interface SpecialOffer {
  id: number;
  judul?: string | null;
  status?: string | 'Aktif' | 'Tidak Aktif' | null;
  link?: string | null;
  file_name?: string | null;
  deskripsi?: string | null;
  sender?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PopUpSpecialOffer {
  id: number;
  penawaran_spesial_id: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface Slider {
  id: number;
  judul?: string | null;
  status?: string | 'Aktif' | 'Tidak Aktif' | null;
  link?: string | null;
  file_name?: string | null;
  sender?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RSUILatest {
  id: number;
  judul?: string | null;
  status?: string | 'Aktif' | 'Tidak Aktif' | null;
  link?: string | null;
  sender?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Specialist {
  id: number;
  nama_spesialisasi?: string | null;
  id_api?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: number;
  nip: string;
  headline_dokter?: string | null;
  status_dokter: boolean | null;
  nama_dokter: string;
  path_foto_dokter: string | null;
  spesialis_id: number | null;
  pendidikan_dokter?: string | null;
  penghargaan_dokter?: string | null;
  keanggotaan_dokter?: string | null;
  penelitian_dokter?: string | null;
  kompetensi_dokter?: string | null;
  created_at: string;
  updated_at: string;
  status_dokter: boolean;
  specialist?: Specialist | null;
}

export interface PatientExperience {
  id: number;
  nama?: string | null;
  status?: string | 'Aktif' | 'Tidak Aktif' | null;
  landingpage?: string | 'Ya' | 'Tidak' | null;
  profesi?: string | null;
  file_name?: string | null;
  deskripsi?: string | null;
  sender?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Insurance {
  id: number;
  nama?: string | null;
  status: boolean;
  logo?: string | null;
  link?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Accomplishment {
  id: number;
  link: string | null;
  logo: string;
  media: Media[];
  nama: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface PolyClinic {
  id: number;
  judul: string;
  slug: string;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  prioritas?: boolean;
  img_file_name: string;
  deskripsi?: string | null;
  ruang_lingkup_layanan?: string | null;
  layanan_unggulan?: string | null;
  fasilitas_dan_teknologi?: string | null;
  sender?: string | null;
  center_of_excellence?: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface PolyClinicDoctor {
  id: number;
  poli_id: number;
  nama: string;
  link_dokter: string;
  created_at: string;
  updated_at: string;
}

export interface PolyClinicPoster {
  id: number;
  poli_id: number;
  poster_file_name: string;
  poster_extension: string;
  poster_url: string;
  poster_aktif: boolean;
  created_at: string;
  updated_at: string;
}

export interface PolyClinicArticle {
  id: number;
  poli_id: number;
  artikel_judul: string;
  artikel_file_name: string;
  artikel_extension: string;
  artikel_thumbnail_file_name: string;
  artikel_thumbnail_extension: string;
  artikel_aktif: boolean;
  created_at: string;
  updated_at: string;
}

export interface PolyClinicVideo {
  id: number;
  poli_id: number;
  video_url: string;
  video_judul: string;
  created_at: string;
  updated_at: string;
}

export interface SundayClinic {
  id: number;
  judul: string;
  slug: string;
  img_file_name: string;
  deskripsi?: string | null;
  ruang_lingkup_layanan?: string | null;
  layanan_unggulan?: string | null;
  fasilitas_dan_teknologi?: string | null;
  created_at: string;
  updated_at: string;
  poster?: SundayClinicPoster[] | null;
  article?: SundayClinicArticle[] | null;
  video?: SundayClinicVideo[] | null;
  doctor?: SundayClinicDoctor[] | null;
}

export interface SundayClinicDoctor {
  id: number;
  sunday_clinic_id: number;
  nama: string;
  link_dokter: string;
  created_at: string;
  updated_at: string;
}

export interface SundayClinicPoster {
  id: number;
  sunday_clinic_id: number;
  poster_file_name: string;
  poster_extension: string;
  poster_url: string;
  poster_aktif: boolean;
  created_at: string;
  updated_at: string;
}

export interface SundayClinicArticle {
  id: number;
  sunday_clinic_id: number;
  artikel_judul: string;
  artikel_file_name: string;
  artikel_extension: string;
  artikel_thumbnail_file_name: string;
  artikel_thumbnail_extension: string;
  artikel_aktif: boolean;
  created_at: string;
  updated_at: string;
}

export interface SundayClinicVideo {
  id: number;
  sunday_clinic_id: number;
  video_url: string;
  video_judul: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleFile {
  id: number;
  artikel_id: number;
  file_name?: string | null;
  extension?: string | null;
  size?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleJoinFile {
  judul?: string | null;
  slug?: string | null;
  tanggal?: string | null;
  file_names?: string;
  kategori_id?: number | null;
  kategori?: string | null;
}

export interface Specialist {
  id: number;
  nama_spesialisasi?: string | null;
  id_api?: string | null;
}

export interface Doctor {
  id: number;
  status_dokter?: boolean | null;
  nip?: string | null;
  nama_dokter?: string | null;
  path_foto_dokter?: string | null;
  spesialis_id?: number | null;
  pendidikan_dokter?: string | null;
  penghargaan_dokter?: string | null;
  keanggotaan_dokter?: string | null;
  penelitian_dokter?: string | null;
  kompetensi_dokter?: string | null;
  headline_dokter?: string | null;
}

export interface PushNotification {
  id: number;
  title: string;
  body: string;
  url: string;
  is_read: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: number;
  judul: string;
  slug: string;
  tgl_awal: string | null;
  tgl_akhir: string | null;
  jam_awal: string | null;
  jam_akhir: string | null;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  htm?: string | null;
  file_name?: string | null;
  url_whatsapp?: string | null;
  url_daftar?: string | null;
  deskripsi?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ActivityParticipantTargetList {
  id: number;
  target_peserta: string;
}

export interface ActivityParticipantTarget {
  id: number;
  kegiatan_id: number;
  target_peserta_id: number;
  target_peserta_name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityWithParticipantTarget extends Activity {
  participant_targets: ActivityParticipantTarget[];
}

export interface DisorderDisease {
  id: number;
  judul: string;
  slug: string;
  penulis: string | null;
  ditinjau: string | null;
  tanggal: string | null;
  file_name?: string[] | null;
  deskripsi: string | null;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  sender: string | null;
  created_at: string;
  updated_at: string;
}

export interface DisorderDiseaseCategory {
  id: number;
  kelainan_penyakit_id: number;
  kategori_id: number;
  kategori_name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface DisorderDiseaseFile {
  id: number;
  extension: string;
  file_name: string;
  kelainan_penyakit_id: number;
  size: string;
  media: Media[];
  created_at: string;
  updated_at: string;
}

export interface DisorderDiseasesWithCategoryAndFile extends DisorderDisease {
  categories?: DisorderDiseaseCategory[];
  files?: DisorderDiseaseFile[];
}

export interface PopularArticle {
  id: number;
  judul?: string | null;
  slug?: string | null;
  penulis?: string | null;
  tanggal?: string | null;
  deskripsi?: string | null;
  status?: string | 'Aktif' | 'Tidak Aktif' | null;
  sender?: string | null;
  count?: number | null;
  created_at: string;
  updated_at: string;
  increased_at?: string | null;
}

export interface PopularArticleCategory {
  id: number;
  artikel_id: number;
  kategori_id: number;
  kategori_name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface PopularArticleFile {
  id: number;
  artikel_id: number;
  file_name: string;
  extension: string;
  size: string;
  // media: Media[];
  created_at: string;
  updated_at: string;
}

export interface ArticleWithCategoryAndFile extends PopularArticle {
  categories?: PopularArticleCategory[];
  files?: PopularArticleFile[];
}

export interface CategoryList {
  id: number;
  kategori: string;
  total: number;
}

export interface VisualEducation {
  id: number;
  judul: string | null;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  file_name: string | null;
  deskripsi: string | null;
  slug: string;
  kategori_id: number | null;
  tanggal: string | null;
  count: number | null;
  created_at: string;
  updated_at: string;
}

export interface VisualEducationCategory {
  id: number;
  nama_kategori: string;
  created_at: string;
  updated_at: string;
}

export interface VisualEducationWithCategory extends VisualEducation {
  nama_kategori: string;
}

export interface HealthyTalkNewsletter {
  id: number;
  judul: string | null;
  slug: string;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  tanggal: string | null;
  image_name: string | null;
  file_name: string | null;
  deskripsi: string | null;
  sender: string | null;
  count: number | null;
  increased_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: number;
  judul: string | null;
  slug: string | null;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  tanggal: string | null;
  image_name: string | null;
  file_name: string | null;
  deskripsi: string | null;
  sender: string | null;
  increased_at: string | null;
  landingpage: string | 'Aktif' | 'Tidak Aktif' | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleNewsVideo {
  id: number;
  judul: string;
  slug: string;
  link: string | null;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  deskripsi: string | null;
  sender: string | null;
  created_at: string;
  updated_at: string;
}

export interface Promotion {
  id: number;
  judul?: string | null;
  slug: string;
  status?: string | 'Aktif' | 'Tidak Aktif' | null;
  tanggal?: string | null;
  kategori_id: number;
  file_name?: string[] | null;
  deskripsi?: string | null;
  sender?: string | null;
  created_at?: string;
  updated_at?: string;
  files?: Media[];
}

export interface PromotionCategory {
  id: number;
  nama_kategori: string;
  created_at: string;
  updated_at: string;
}

export interface PromotionMedia {
  id: number;
  promosi_id: number;
  file_name: string;
  extension: string;
  size: string;
  created_at: string;
  updated_at: string;
}

export interface Publication {
  id: number;
  title: string;
  year: number | null;
  writer: string | null;
  journal: string | null;
  doi: string | null;
  flag_active_disable: 0 | 1;
  sender: string | null;
  created_at: string;
  updated_at: string;
}

export interface Training {
  id: number;
  nama_pelatihan: string;
  penyelenggara_pelatihan: string;
  link_gform_pelatihan: string;
  tanggal_mulai_pelatihan: string;
  tanggal_selesai_pelatihan: string;
  biaya_pelatihan: number;
  status_pelatihan: string | '0' | '1' | '2';
  tipe_pelatihan: string | '1' | '2' | '3';
  total_skp_pelatihan: number;
  kuota_peserta_pelatihan: number;
  deskripsi_pelatihan: string;
  thumbnail_pelatihan: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface MedDevValidation {
  id: number;
  tahun_group: number;
  sequence: number;
  kode_alkes: string;
  jenis_pengujian: string | null;
  nilai: number | NonNullable;
  sender: string | null;
  created_at: string;
  updated_at: string;
}

// the same as HealthyTalkNewsletter
export interface EnvironmentSustainabilityArticle extends HealthyTalkNewsletter {}

export interface EnvironmentSustainabilityReport {
  id: number;
  judul: string | null;
  slug: string | null;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  tanggal: string | null;
  file_name: string | null;
  sender: string | null;
  created_at: string;
  updated_at: string;
}
export interface EnvironmentSustainabilityVideo {
  id: number;
  judul: string | null;
  slug: string | null;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  sender: string | null;
  link_video: string | null;
  tanggal: string | null;
  created_at: string;
  updated_at: string;
}

export interface VaccineInformation {
  id: number;
  judul: string | null;
  deskripsi: string | null;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  sender: string | null;
  created_at: string;
  updated_at: string;
}

export interface VaccineSession {
  id: number;
  tgl_vaksin: string | null;
  sesi: string | null;
  total: number | null;
  status: string | 'Aktif' | 'Tidak Aktif' | null;
  id_jenis_vaksin: number | null;
  nama_jenis_vaksin?: string | null;
  booking?: string | null;
  created_at: string;
  updated_at: string;
}

export interface VaccineType {
  id: number;
  nama_jenis_vaksin: string | null;
  status: string | 'Aktif' | 'Nonaktif' | null;
  created_at: string;
  updated_at: string;
}

export interface PatientMassRegistration {
  id: number;
  identification_no: string;
  name: string;
  gender: string;
  date_of_birth: string | null;
  place_of_birth: string | null;
  mobile_phone: string | null;
  email: string | null;
  notes: string | null;
  home_address: string | null;
  sender: string | null;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: number;
  id_user?: number | null;
  identification_no?: number | null;
  name?: string | null;
  gender?: string | 'M' | 'F' | null;
  place_of_birth?: string | null;
  date_of_birth?: string | null; // Use `Date` if you are working with actual Date objects
  mobile_phone?: string | null;
  email?: string | null;
  home_address?: string | null;
  rt?: string | null;
  rw?: string | null;
  country_id?: string | null;
  country_name?: string | null;
  provinces_id?: string | null;
  provinces_name?: string | null;
  regencies_cities_id?: string | null;
  regencies_cities_name?: string | null;
  districts_id?: string | null;
  districts_name?: string | null;
  villages_id?: string | null;
  villages_name?: string | null;
  postal_code?: string | null;
  same_as_home_address?: string | null;
  current_address?: string | null;
  current_rt?: string | null;
  current_rw?: string | null;
  current_country_id?: string | null;
  current_country_name?: string | null;
  current_provinces_id?: string | null;
  current_provinces_name?: string | null;
  current_regencies_cities_id?: string | null;
  current_regencies_cities_name?: string | null;
  current_districts_id?: string | null;
  current_districts_name?: string | null;
  current_villages_id?: string | null;
  current_villages_name?: string | null;
  current_postal_code?: string | null;
  status?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type PatientMember = Omit<Patient, 'id_user'> & {
  id_master_pasien?: number | null;
  master_pasien?: string | null;
};
export interface PatientMedicalRecordEpisode {
  id: number;
  id_pasien: number | null;
  episode_no: string | null;
  episode_date: string | null;
  treatment_type: string | null;
  episode_status: string | null;
  patient_name: string | null;
  medical_record_no: string | null;
  gender: string | 'Male' | 'Female' | null;
  date_of_birth: string | null;
  patient_identity_no: string | null;
  passport_no: string | null;
  examiner_name: string | null;
  episode_location: string | null;
  sender: string | null;
  created_afya_by: string | null;
  reference_id: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface PatientRegistrationHistory {
  id: number;
  id_registrasi: number | null;
  identification_no: number | null;
  id_layanan: number | null;
  guarantor_id: string | null;
  guarantor_name: string | null;
  clinic_id: string | null;
  clinic_name: string | null;
  clinic_schedule: string | null;
  doctor_id: string | null;
  doctor_name: string | null;
  doctor_schedule: string | null;
  package_id: string | null;
  sender: string | null;
  reference_id: string | null;
  user_id: string | null;
  tgl_registrasi: string | null; // e.g. "2025-05-15"
  nik_master: number | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string; // e.g. "2025-05-15T12:34:56Z"
  updated_at: string; // e.g. "2025-05-15T12:34:56Z"
}

export interface ViewPatientRegistrationHistory {
  name: string;
  identification_no: number;
  date_of_birth: string; // e.g. "1985-10-23"
  gender: string; // e.g. "M" or "F"
  id: number; // history_registrasi.id
  tgl_registrasi: string | null; // e.g. "2025-05-15" or null
  clinic_name: string | null;
  created_by: string | null;
}

export interface ViewPolyPatientRegistrationHistory {
  name: string;
  identification_no: number;
  date_of_birth: string; // e.g. "1985-10-23"
  gender: string; // e.g. "M" or "F"
  mobile_phone: string | null;
  email: string | null;
  status: string | null;
  id: number; // registrasi.id
  clinic_id: string; // registrasi.clinic_id
  clinic_name: string; // registrasi.clinic_name
  doctor_id: string | null;
  doctor_name: string | null;
  doctor_schedule: string | null;
  tgl_registrasi: string; // e.g. "2025-05-15"
  reference_id: string | null;
  created_at: string; // e.g. "2025-05-15T12:34:56Z"
  updated_at: string; // e.g. "2025-05-15T12:34:56Z"
}

export interface ViewPatientRegistration {
  name: string;
  identification_no: number;
  date_of_birth: string; // e.g. "1985-10-23"
  gender: string; // e.g. "M" or "F"
  id: number; // registrasi.id
  clinic_id: string; // registrasi.clinic_id
  tgl_registrasi: string; // e.g. "2025-05-15"
  clinic_name: string; // registrasi.clinic_name
  nama_jenis_vaksin: string; // jenis_vaksin.nama_jenis_vaksin
  sesi_vaksin: string; // vaksin.sesi_vaksin
}

export interface ViewPolyPatientRegistration {
  name: string;
  identification_no: number;
  date_of_birth: string; // e.g. "1985-10-23"
  gender: string; // e.g. "M" or "F"
  mobile_phone: string | null;
  email: string | null;
  status: string | null;
  id: number; // registrasi.id
  clinic_id: string; // registrasi.clinic_id
  clinic_name: string; // registrasi.clinic_name
  doctor_id: string | null;
  doctor_name: string | null;
  doctor_schedule: string | null;
  tgl_registrasi: string; // e.g. "2025-05-15"
  reference_id: string | null;
  created_at: string; // e.g. "2025-05-15T12:34:56Z"
  updated_at: string; // e.g. "2025-05-15T12:34:56Z"
}

export interface QualityIndicator {
  id: number;
  tahun: number;
  kategori_id: number;
  kode_imut: string;
  target: string | null;
  capaian: string | null;
  sender: string | null;
  created_at: string;
  updated_at: string;
}

export interface QualityIndicatorCategory {
  id: number;
  kategori_nama: string;
  created_at: string;
  updated_at: string;
}

export type SearchAll = {
  // id: number;
  judul: string;
  slug?: string;
  deskripsi: string;
  created_at: string;
  kategori: string;
  url?: string;
};

export interface DoctorSchedule {
  ClinicId: string; // e.g. "123"
  ClinicName: string; // e.g. "KLINIK ANGGREK-KLINIK XXX"
  Date: string; // e.g. "2025-05-15"
  Day: string; // e.g. "5"
  DayName: string; // e.g. "Jumat"
  DoctorId: string; // e.g. "123"
  DoctorName: string; // e.g. "dr. abc abc ah"
  Duration: string;
  EmployeeIDNumber: string; // e.g. "123"
  IDCardNumber: string; // e.g. "123345451"
  PriorAgreement: string;
  Schedule: string; // e.g. "12:00-15:00"
  ScheduleStatus: string;
  Specialties: string; // e.g. "Obstetri & Ginekologi"
}

export type daySchedule = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type ScheduleProps = {
  [key in daySchedule]: DoctorSchedule[];
};

export type doctorScheduleProps = {
  scheduleAnggrek: ScheduleProps;
  scheduleExecutive: ScheduleProps;
};
export type doctorScheduleClinic = 'scheduleAnggrek' | 'scheduleExecutive';
