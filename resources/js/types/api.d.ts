import { DoctorSchedule } from './models';

export type BaseAPIResponse<T = any> = {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
};

export type clinicResponse = {
  ClinicId: string;
  ClinicName: string;
  ClinicSchedule: string;
};

export type oldDoctorScheduleResponse = {
  DoctorId: string;
  DoctorName: string;
  EmployeeIDNumber: string;
  IDCardNumber: string;
  PriorAgreement: boolean;
  Schedule: string;
};

export type doctorIdResponse = {
  id: string;
};

export type slotResponse = {
  id: string;
  no: string;
  from_time: string;
  to_time: string;
  from_hour: string;
  to_hour: string;
  appointment_type: string;
  is_block: boolean;
  queue_no: number;
  prior_agreement: boolean;
};

export type doctorByClinicResponse = {
  DoctorId: string;
  DoctorName: string;
  Gender: 'Female' | 'Male';
  Specialties: string;
};

export type daySchedule = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type ScheduleResponse = {
  [key in daySchedule]: DoctorSchedule[];
};

export type doctorScheduleResponse = {
  scheduleAnggrek: ScheduleResponse;
  scheduleExecutive: ScheduleResponse;
};
export type doctorScheduleClinic = 'scheduleAnggrek' | 'scheduleExecutive';
