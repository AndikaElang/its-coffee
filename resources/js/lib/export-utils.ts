import { Order } from '@/types/models';
import * as XLSX from 'xlsx-js-style';

import { formatRupiah } from './utils';

export interface ExportData {
  [key: string]: string | number | boolean | null;
}

export const flattenMultipleOrders = (orders: Order[]) => {
  return orders.map((order) => flattenOrderData(order));
};

export const flattenOrderData = (order: Order): ExportData => {
  // const { order_data: orderData } = order;
  // Helper function to safely get value
  const getValue = (value: any, fallback = 'N/A') => {
    if (value === null || value === undefined || value === '') {
      return fallback;
    }
    return value;
  };

  // Helper function to format multiple entries with newlines
  const formatMultipleEntries = (entries: any[], formatter: (entry: any) => string): string => {
    if (!entries || entries.length === 0) {
      return 'N/A';
    }
    return entries.map((v, i) => `[${i + 1}] ${formatter(v)}`).join('\n');
  };

  // Base order data - single row with all information
  const exportData: ExportData = {
    // Basic Information
    Tanggal: getValue(order.order_date),
    Pembeli: getValue(order.buyer_name ?? ''),
    Menu: getValue(order.name ?? ''),
    Qty: getValue(order.qty ?? 0),
    Harga: getValue(order.price ? formatRupiah(order.price) : formatRupiah(0)),
    Total: getValue(order.subtotal ? formatRupiah(order.subtotal) : formatRupiah(0)),
  };

  return exportData;
};

// Helper function to check if data is valid (moved outside the main function for reuse)
const hasValidData = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value.trim() !== '';
};

export const exportToCSV = (data: ExportData[], filename: string) => {
  if (data.length === 0) return;

  // Get all unique headers
  const headers = Array.from(new Set(data.flatMap((row) => Object.keys(row))));

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header] ?? '';
          // Escape quotes and wrap in quotes if contains comma, quote, or newline
          const stringValue = String(value);
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(','),
    ),
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (data: ExportData[], filename: string) => {
  if (data.length === 0) return;

  // Get all unique headers
  const headers = Object.keys(data[0]);

  // Create worksheet data
  const wsData = [headers, ...data.map((row) => headers.map((header) => row[header] ?? ''))];

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Set column widths based on content
  const colWidths = headers.map((header) => {
    const maxLength = Math.max(
      header.length,
      ...data.map((row) => {
        const value = String(row[header] ?? '');
        // For multi-line content, use the longest line length
        const lines = value.split('\n');
        return Math.max(...lines.map((line) => line.length));
      }),
    );
    return { wch: Math.min(Math.max(maxLength, 10), 150) }; // Min 10, max 150 characters
  });
  ws['!cols'] = colWidths;

  // Set row heights for multi-line content
  // const rowHeights = data.map((row, index) => {
  //   const maxLines = Math.max(
  //     ...headers.map((header) => {
  //       const value = String(row[header] ?? '');
  //       return value.split('\n').length;
  //     }),
  //   );
  //   return { hpt: Math.max(15, maxLines * 15), customHeight: true }; // 15 points per line
  // });
  // ws['!rows'] = [{ hpt: 20 }, ...rowHeights]; // Header row height

  // Style the header row
  const headerRange = XLSX.utils.decode_range(ws['!ref'] || 'A1');
  for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!ws[cellAddress]) continue;
    ws[cellAddress].s = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '366092' } },
      alignment: { horizontal: 'left', vertical: 'top', wrapText: true },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } },
      },
    };
  }

  // Get the full range of the worksheet
  const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');

  // Style data cells
  for (let row = range.s.r + 1; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });

      // Ensure cell object exists
      if (!ws[cellAddress]) ws[cellAddress] = {};

      // Combine all styles into one object
      ws[cellAddress].s = {
        alignment: {
          vertical: 'top', // <-- YOUR ANSWER
          horizontal: 'left',
          wrapText: true, // Important for vertical alignment to be visible with multi-line text
        },
        border: {
          top: { style: 'thin', color: { rgb: 'CCCCCC' } },
          bottom: { style: 'thin', color: { rgb: 'CCCCCC' } },
          left: { style: 'thin', color: { rgb: 'CCCCCC' } },
          right: { style: 'thin', color: { rgb: 'CCCCCC' } },
        },
      };
    }
  }

  // align the columns to TOP
  ws['!autofilter'] = { ref: 'A1:Z1' };
  ws['!freeze'] = { xSplit: '1', ySplit: '1', topLeftCell: 'A1', activePane: 'bottomRight' };
  ws['!margins'] = { left: 0.75, right: 0.75, top: 0.75, bottom: 1.25, footer: 0.5, header: 0.5 };

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Order Data');

  // Save file
  XLSX.writeFile(wb, filename);
};

export const exportMultipleOrdersToCSV = (orders: Order[], filename?: string) => {
  const flattenedData = flattenMultipleOrders(orders);
  const defaultFilename = `Orders_Export_${new Date().toISOString().split('T')[0]}.csv`;
  exportToCSV(flattenedData, filename || defaultFilename);
};

export const exportMultipleOrdersToExcel = (orders: Order[], filename?: string) => {
  const flattenedData = flattenMultipleOrders(orders);
  const defaultFilename = `Orders_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
  exportToExcel(flattenedData, filename || defaultFilename);
};
