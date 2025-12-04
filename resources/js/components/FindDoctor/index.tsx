'use client';

import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { BaseAPIResponse } from '@/types/api';
import { Doctor } from '@/types/models';
import { ViewFindDoctor } from '@/types/page-params';
import { Loader } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { NotifyError } from '../Notifications/Notify';
import { DoctorCard } from './doctor-card';

export default function FindDoctor(props: ViewFindDoctor) {
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [doctors, setDoctors] = useState(props.doctors);

  // filter doctors if a selected doctor is set
  const filteredDoctors = doctors.filter((doctor) => {
    if (selectedDoctorId) {
      return doctor.id.toString() === selectedDoctorId;
    } else {
      return true; // no filter
    }
  });

  // State for the searchable combobox
  const [openSpecialist, setOpenSpecialist] = useState(false);
  const [openDoctor, setOpenDoctor] = useState(false);

  const mutation = useMutation({
    mutationFn: async (id_api: string) => {
      const req = await axios.post<BaseAPIResponse<Doctor[]>>(route('patient.findDoctor.doctorBySpecialist'), {
        spesialis: id_api,
      });
      return req.data;
    },
    onSuccess: (res) => {
      const { success, data, message } = res;

      if (success && data) {
        setDoctors(data);
      } else {
        NotifyError('Gagal mengambil data dokter. Silakan coba lagi.');
        console.error('Error fetching doctors by specialist:', message);
      }
    },
    onError: (error) => {
      console.error('Error fetching doctors by specialist:', error);
      NotifyError('Terjadi kesalahan saat mengambil data dokter. Silakan coba lagi.');
    },
  });

  useEffect(() => {
    // if selectedSpecialistId is set, fetch new data
    if (selectedSpecialistId) {
      const specialist = props.specialists.find((specialist) => specialist.id.toString() === selectedSpecialistId);
      mutation.mutate(specialist?.id_api!);
      // add the id to the url as query param
      const url = new URL(window.location.href);
      url.searchParams.set('spesialis', specialist?.id_api!);
      window.history.pushState({}, '', url.toString());

      // if specialist change. reset selectedDoctorId
      setSelectedDoctorId('');
    }
  }, [selectedSpecialistId]);

  return (
    <div className="max-w-7xl mx-auto my-8 space-y-6 max-xl:px-4">
      <CustomBreadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Cari Dokter', href: route('patient.findDoctor.index') },
        ]}
      />

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Searchable Combobox for Specialists */}
        <div className="relative">
          <Popover open={openSpecialist} onOpenChange={setOpenSpecialist}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openSpecialist}
                className="w-full justify-between bg-gray-200 border-0 text-gray-600 h-12 rounded-lg hover:bg-gray-200"
              >
                {selectedSpecialistId
                  ? props.specialists.find((specialist) => specialist.id?.toString() === selectedSpecialistId)
                      ?.nama_spesialisasi
                  : 'Pilih Spesialis'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
              <Command>
                <CommandInput placeholder="Cari spesialis..." />
                <CommandList>
                  <CommandEmpty>Spesialis tidak ditemukan.</CommandEmpty>
                  <CommandGroup>
                    {props.specialists.map((specialist) => (
                      <CommandItem
                        key={specialist.id}
                        value={specialist.nama_spesialisasi ?? ''}
                        onSelect={(currentValue) => {
                          setSelectedSpecialistId(specialist.id.toString());
                          setOpenSpecialist(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedSpecialistId === specialist.id.toString() ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {specialist.nama_spesialisasi}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Searchable Combobox for Doctor */}
        <div className="relative">
          <Popover open={openDoctor} onOpenChange={setOpenDoctor}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openDoctor}
                className="w-full justify-between bg-gray-200 border-0 text-gray-600 h-12 rounded-lg hover:bg-gray-200"
              >
                {selectedDoctorId
                  ? doctors.find((doctor) => doctor.id.toString() === selectedDoctorId)?.nama_dokter
                  : 'Pilih Dokter'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
              <Command>
                <CommandInput placeholder="Cari Dokter..." />
                <CommandList>
                  <CommandEmpty>Dokter tidak ditemukan.</CommandEmpty>
                  <CommandGroup>
                    {doctors.map((doctor) => (
                      <CommandItem
                        key={doctor.id}
                        value={doctor.nama_dokter}
                        onSelect={(currentValue) => {
                          // if already selected, unselect
                          if (selectedDoctorId === doctor.id.toString()) {
                            setSelectedDoctorId('');
                            return;
                          }

                          setSelectedDoctorId(doctor.id.toString());
                          setOpenDoctor(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedDoctorId === doctor.id.toString() ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {doctor.nama_dokter}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="space-y-6">
        {/* on render we use the filteredDoctors to  */}
        {mutation.isPending ? (
          <div className="flex flex-col pt-5">
            <div className="mx-auto text-gray-400">Loading...</div>
            <Loader size={60} className="mx-auto mt-4" />
          </div>
        ) : (
          filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} canLoadMore={true} />)
        )}
      </div>
    </div>
  );
}
