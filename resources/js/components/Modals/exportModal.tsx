'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { exportMultipleOrdersToCSV, exportMultipleOrdersToExcel } from '@/lib/export-utils';
import { BaseAPIResponse } from '@/types/api';
import { Order } from '@/types/models';
import { Modal, SimpleGrid } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';
import { Download, FileSpreadsheet, FileText, Filter, Info, Loader2, Users } from 'lucide-react';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export function ExportReportModal({ isOpen, onClose, orders }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exportMode, setExportMode] = useState<'bydate' | 'selected'>('bydate');

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleExport = async (format: 'csv' | 'excel') => {
    setIsExporting(true);
    setError(null);

    const notif = notifications.show({
      title: 'Exporting...',
      message: 'Please wait while exporting the data.',
      color: 'blue',
      loading: true,
    });

    try {
      let ordersToExport: Order[];

      if (exportMode === 'selected') {
        ordersToExport = orders;
      } else {
        // Validate dates for bydate mode
        if (!startDate || !endDate) {
          notifications.update({
            id: notif,
            title: 'Failed!',
            message: 'Please select both start and end dates.',
            color: 'red',
            loading: false,
            icon: <IconX />,
          });
          setError('Please select both start and end dates.');
          setIsExporting(false);
          return;
        }

        if (new Date(startDate) > new Date(endDate)) {
          notifications.update({
            id: notif,
            title: 'Failed!',
            message: 'Start date must be before end date.',
            color: 'red',
            loading: false,
            icon: <IconX />,
          });
          setError('Start date must be before end date.');
          setIsExporting(false);
          return;
        }

        // Fetch all orders with selected date range
        const req = await axios.post<BaseAPIResponse<Order[]>>(route('report.getOrder'), {
          start_date: startDate,
          end_date: endDate,
        });

        if (req.status !== 200) {
          notifications.update({
            id: notif,
            title: 'Failed!',
            message: `Something went wrong, could not get the order data. ${req.data ? req.data.message : ''}`,
            color: 'red',
            loading: false,
            icon: <IconX />,
          });
          return;
        }

        const { data } = req.data;
        if (!data) {
          notifications.update({
            id: notif,
            title: 'Failed!',
            message: `Something went wrong, could not get the order data. ${req.data ? req.data.message : ''}`,
            color: 'red',
            loading: false,
            icon: <IconX />,
          });
          return;
        }

        ordersToExport = data;
      }

      if (ordersToExport.length === 0) {
        notifications.update({
          id: notif,
          title: 'Failed!',
          message: `Data is empty`,
          color: 'red',
          loading: false,
          icon: <IconX />,
        });
        return;
      }

      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `Orders_Export_${timestamp}.${format === 'csv' ? 'csv' : 'xlsx'}`;

      if (format === 'csv') {
        exportMultipleOrdersToCSV(ordersToExport, filename);
      } else {
        exportMultipleOrdersToExcel(ordersToExport, filename);
      }

      notifications.update({
        id: notif,
        title: 'Success!',
        message: `${ordersToExport.length} orders exported successfully.`,
        color: 'green',
        loading: false,
        icon: <IconCheck />,
      });
    } catch (err) {
      setError('Failed to export orders');
      console.error('Export error:', err);
      notifications.update({
        id: notif,
        title: 'Failed!',
        message: `Something went wrong, try again. ${err}`,
        color: 'red',
        loading: false,
        icon: <IconX />,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Export Applications from API</h2>
          </div>
        </div>
      }
      opened={isOpen}
      onClose={onClose}
      size="xl"
      padding={0}
      radius="md"
      styles={{
        header: {
          backgroundColor: '#0072bc',
        },
        content: {
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        },
        body: {
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        },
      }}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Export Mode Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tipe Export</CardTitle>
            <CardDescription>Pilih cara Anda ingin export pesanan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  exportMode === 'bydate' ? 'border-blue-500 bg-blue-50' : 'hover:bg-muted/50'
                }`}
                onClick={() => setExportMode('bydate')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    checked={exportMode === 'bydate'}
                    onChange={() => setExportMode('bydate')}
                    className="text-blue-600"
                  />
                  <h4 className="font-medium">Export Semua (Berdasarkan Tanggal)</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Eksport semua pesanan dari API, difilter berdasarkan tanggal. Ini akan mengambil data terbaru dari
                  server.
                </p>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  exportMode === 'selected' ? 'border-blue-500 bg-blue-50' : 'hover:bg-muted/50'
                }`}
                onClick={() => setExportMode('selected')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    checked={exportMode === 'selected'}
                    onChange={() => setExportMode('selected')}
                    className="text-blue-600"
                  />
                  <h4 className="font-medium">Export yang Dipilih</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ekspor hanya pesanan yang Anda pilih dari tampilan saat ini. Memberikan Anda kendali yang tepat atas
                  apa yang di-export.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Filter */}
        {exportMode === 'bydate' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter berdasarkan Tanggal
              </CardTitle>
              <CardDescription>Pilih tanggal untuk filter pesanan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                <DateInput
                  withAsterisk
                  label="Tanggal Awal"
                  placeholder="Pilih Tanggal Awal"
                  valueFormat="YYYY-MM-DD"
                  value={startDate}
                  onChange={setStartDate}
                />

                <DateInput
                  withAsterisk
                  label="Tanggal Akhir"
                  placeholder="Pilih Tanggal Akhir"
                  valueFormat="YYYY-MM-DD"
                  value={endDate}
                  onChange={setEndDate}
                  minDate={startDate ? new Date(startDate) : undefined}
                />
              </SimpleGrid>
            </CardContent>
          </Card>
        )}

        {/* Applications List (for filtered mode) */}
        {exportMode === 'selected' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Status Pilihan
                <Badge variant="outline" className="ml-2">
                  {orders.length} dipilih
                </Badge>
              </CardTitle>
              <CardDescription>Pesanan yang dipilih akan di-export</CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Export Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
            <CardDescription>Unduh pesanan yang dipilih dalam format yang Anda inginkan.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => handleExport('excel')}
                disabled={
                  isExporting ||
                  (exportMode === 'selected' && orders.length === 0) ||
                  (exportMode === 'bydate' && (!startDate || !endDate))
                }
                className="flex items-center gap-2"
              >
                {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileSpreadsheet className="h-4 w-4" />}
                Export Excel
              </Button>
              <Button
                onClick={() => handleExport('csv')}
                disabled={
                  isExporting ||
                  (exportMode === 'selected' && orders.length === 0) ||
                  (exportMode === 'bydate' && (!startDate || !endDate))
                }
                className="flex items-center gap-2"
              >
                {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                Export CSV
              </Button>
            </div>

            {exportMode === 'selected' && orders.length === 0 && (
              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription>Pilih setidaknya satu pesanan untuk di-export.</AlertDescription>
              </Alert>
            )}

            {exportMode === 'bydate' && (!startDate || !endDate) && (
              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription>Silakan pilih tanggal awal dan tanggal akhir untuk export pesanan.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
}
