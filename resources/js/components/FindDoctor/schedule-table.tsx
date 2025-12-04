'use client';

import { CUSTOMER_WEB_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { daySchedule, doctorScheduleResponse } from '@/types/api';
import { DoctorSchedule } from '@/types/models';
import { useState } from 'react';

import { Badge } from '../ui/badge';

const dayLabels = {
  Monday: 'Senin',
  Tuesday: 'Selasa',
  Wednesday: 'Rabu',
  Thursday: 'Kamis',
  Friday: "Jum'at",
  Saturday: 'Sabtu',
  Sunday: 'Minggu',
};

const clinicLabels = {
  scheduleAnggrek: 'Klinik Anggrek',
  scheduleExecutive: 'Klinik Eksekutif',
};

function ScheduleItem({ data, index }: { data: DoctorSchedule; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div key={index} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {hovered ? (
        <a
          href={
            CUSTOMER_WEB_URL + `/layanan/poliklinik/daftar?id=${data.DoctorId}&klinik=${data.ClinicId}&tgl=${data.Date}`
          }
          target="_blank"
          className="max-h-[41.79px] overflow-hidden"
        >
          <Badge variant={'default'} className="bg-[#0071BA] text-white rounded-md px-3 my-[10px] cursor-pointer">
            Buat Janji
          </Badge>
        </a>
      ) : (
        <>
          <span className={cn('text-gray-700 font-semibold')}>{data.Schedule}</span>
          <Badge variant="outline" className="bg-[#0071BA] text-white">
            {data.Date}
          </Badge>
        </>
      )}
    </div>
  );
}

export function ScheduleTable({ schedule }: { schedule: doctorScheduleResponse }) {
  const clinics = Object.keys(schedule) as (keyof typeof schedule)[];
  const days = Object.keys(dayLabels);

  return (
    <div className="w-full overflow-x-auto mb-4 ms-0 min-[834px]:ms-4 min-[1024px]:ms-0">
      <div className="inline-block min-w-[800px] w-[98%] align-middle">
        {/* Header */}
        <div className={`bg-mantine-blue-8 text-white`}>
          <div className="grid grid-cols-8 text-sm font-medium">
            <div className="p-3 text-center border-blue-500">
              <span className="sr-only">Klinik</span>
            </div>
            {days.map((day) => (
              <div key={day} className="p-3 text-center border-blue-500 last:border-r-0 font-semibold">
                {dayLabels[day as keyof typeof dayLabels]}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="bg-white">
          {clinics.map((clinic, rowIndex) => (
            <div key={clinic} className={`grid grid-cols-8 text-sm bg-gray-50`}>
              <div
                className={`px-2 py-4 font-semibold text-gray-700 border-gray-200 ms-1 ${rowIndex === 0 ? 'border-b border-gray-400' : ''}`}
              >
                {clinicLabels[clinic as keyof typeof clinicLabels]}
              </div>
              {days.map((day, i) => {
                const todaySchedule = schedule[clinic][day as daySchedule];
                const isLastDay = i === days.length - 1;
                const multipleInOneDay = todaySchedule.length > 1;

                return (
                  <div
                    key={day}
                    className={cn(
                      rowIndex === 0 && 'border-b border-gray-400',
                      isLastDay && 'me-1',
                      multipleInOneDay && 'space-y-2 pt-2',
                      `flex flex-col items-center justify-center text-center relative`,
                    )}
                  >
                    {todaySchedule.length ? (
                      todaySchedule.map((data, index) => {
                        return <ScheduleItem key={index} data={data} index={index} />;
                      })
                    ) : (
                      <span className="text-gray-400 font-semibold">-</span>
                    )}

                    {/* Custom shorter right border */}
                    {!isLastDay && <div className="absolute right-0 top-1/4 h-1/2 border-r border-gray-200"></div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
