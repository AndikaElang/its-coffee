import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { ScheduleTable } from '@/components/FindDoctor/schedule-table';
import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import AppMeta from '@/components/Meta/AppMeta';
import { minimalRichStr } from '@/components/i18n/MinimalRichStr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { limitString, stripHTMLTags } from '@/lib/utils';
import { Doctor, doctorScheduleProps } from '@/types/models';
import { GenericViewPage } from '@/types/page-params';
import { Accordion, Collapse, Group, LoadingOverlay, Text, Typography } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Page(props: GenericViewPage<{ doctor: Doctor; schedule: doctorScheduleProps }>) {
  const doctorData = props.data.doctor;
  const scheduleData = props.data.schedule;
  const { t } = useTranslation();
  const t_opt = { ns: 'findDoctor' };
  const [activeTab, setActiveTab] = useState('riwayat-pendidikan');

  const tabs = [
    { id: 'riwayat-pendidikan', label: 'Riwayat Pendidikan', content: doctorData.pendidikan_dokter },
    { id: 'penghargaan', label: 'Penghargaan', content: doctorData.penghargaan_dokter },
    { id: 'keanggotaan', label: 'Keanggotaan', content: doctorData.keanggotaan_dokter },
    { id: 'penelitian-publikasi', label: 'Penelitian dan Publikasi', content: doctorData.penelitian_dokter },
    { id: 'kompetensi', label: 'Kompetensi / Keahlian Bidang', content: doctorData.kompetensi_dokter },
  ];

  return (
    <>
      <AppMeta
        title={doctorData.nama_dokter}
        description={doctorData.headline_dokter ? stripHTMLTags(doctorData.headline_dokter, 300) : ''}
        ogImage={doctorData.path_foto_dokter ? doctorData.path_foto_dokter : ''}
      />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Pasien & Pengunjung' },
                { label: 'Cari Dokter', href: route('patient.findDoctor.index') },
                { label: `${limitString(doctorData.nama_dokter ? doctorData.nama_dokter : '', 50)}`, href: '#' },
              ]}
            />
          }
        >
          <div className="flex flex-col lg:flex-row mb-8">
            {/* Doctor Info Section */}
            {/* <div className="flex items-center max-lg:py-4 lg:w-90 xl:w-100 bg-gray-50"> */}
            <div className="flex items-center max-lg:pt-4 w-65 max-[1024px]:mx-auto">
              <div className="relative w-full">
                <ImageWithLoading
                  src={doctorData.path_foto_dokter || '/placeholder.svg'}
                  alt={`Foto ${doctorData.nama_dokter}`}
                  className="mx-4 my-2 p-0"
                  imageClassname="rounded-md min-h-[280px]"
                  clickable={true}
                />
              </div>
            </div>

            {/* Schedule Section */}
            <div className="flex-1 p-0 overflow-x-auto">
              <Group mt={'md'} mb={'xs'}>
                <div className=" max-[1070px]:flex max-[1070px]:flex-col max-[1070px]:w-full max-[1070px]:mx-4">
                  <h3 className="max-[1024px]:mx-auto max-[1024px]:text-center text-3xl font-semibold text-[#25455E] leading-tight line-clamp-3">
                    {doctorData.nama_dokter}
                  </h3>
                  <p className="max-[1024px]:mx-auto max-[1024px]:text-center text-lg text-muted-foreground mt-1 line-clamp-2">
                    {doctorData.headline_dokter ?? '-'}
                  </p>
                </div>
              </Group>

              {/* <div className="flex"> */}
              <h3 className="text-[#25455E] font-semibold text-xl flex mb-1 max-[1024px]:mx-auto max-[1024px]:my-2">
                {t('schedule-and-register', t_opt)}
              </h3>
              <p className="text-gray-600 leading-relaxed">{minimalRichStr(t('schedule-and-register-desc', t_opt))}</p>
              {/* </div> */}

              <Collapse in={true} transitionDuration={300} keepMounted pos={'relative'}>
                <LoadingOverlay />
                {/* {fetching && <p className="text-center min-h-20">Loading...</p>} */}
                {scheduleData && <ScheduleTable schedule={scheduleData} />}
              </Collapse>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <div className="hidden md:block">
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-[#F26522] text-[#F26522]'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Navigation Accordion (Mobile) */}
          <div className="block md:hidden mb-8">
            <Accordion variant="default" chevronPosition="right">
              {tabs.map((tab) => (
                <Accordion.Item key={tab.id} value={tab.id}>
                  <Accordion.Control className="text-sm font-medium">{tab.label}</Accordion.Control>
                  <Accordion.Panel>
                    <div className="p-4">
                      {tab.content ? (
                        <Typography>
                          <div
                            className="rich-text-typography prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: tab.content }}
                          />
                        </Typography>
                      ) : (
                        <Text className="text-gray-500 italic">Informasi belum tersedia</Text>
                      )}
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>

          {/* Tab Content (Desktop only) */}
          <div className="hidden md:block">
            {tabs.map((tab) => (
              <div key={tab.id} className={`${activeTab === tab.id ? 'block' : 'hidden'} mb-8`}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#25455E]">{tab.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {tab.content ? (
                      <Typography>
                        <div
                          className="rich-text-typography prose prose-lg max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ __html: tab.content }}
                        />
                      </Typography>
                    ) : (
                      <Text className="text-gray-500 italic">Informasi belum tersedia</Text>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
