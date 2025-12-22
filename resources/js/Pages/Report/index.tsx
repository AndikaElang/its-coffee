import AppMeta from '@/components/Meta/AppMeta';
import DeleteGeneric from '@/components/Modals/DeleteGeneric';
import { ExportReportModal } from '@/components/Modals/exportModal';
import { useSearchFilter } from '@/hooks';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { cn, formatRupiah } from '@/lib/utils';
import { Order, paginatedData } from '@/types/models';
import { GenericViewPage } from '@/types/page-params';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Loader,
  Menu as MantineMenu,
  Tooltip as MantineTooltip,
  Paper,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure, useTimeout } from '@mantine/hooks';
import { IconDotsVertical, IconEdit, IconFileExcel, IconSearch, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { EyeIcon } from 'lucide-react';
import { DataTable, DataTableProps, DataTableSortStatus } from 'mantine-datatable';
import { useState } from 'react';
import classes from '~/css/TableUtils.module.css';

const baseRoute = 'report';

export default function Page(
  props: GenericViewPage<{
    orders: paginatedData<Order>;
    years: number[];
    selectedYear: number;
    selectedMonth: number;
    profitThisMonth: number;
    monthlydeposittotal: number;
  }>,
) {
  const data = props.data;

  const [selected, setSelected] = useState<Order>();
  const [isOpen, { open: onOpen, close: onClose }] = useDisclosure(false);
  const [selectedMonth, setSelectedMonth] = useState(data.selectedMonth);
  const [selectedYear, setSelectedYear] = useState(data.selectedYear);
  const [selectedRecords, setSelectedRecords] = useState<Order[]>([]);
  const searchFilter = useSearchFilter(`${baseRoute}.index`);
  const [searching, setSearching] = useState(false);
  const handleSearchingButton = () => {
    setSearching((prev) => {
      return !prev;
    });
  };
  const [isOpenExportModal, { open: onOpenExportModal, close: onCloseExportModal }] = useDisclosure(false);
  // const []

  const { start: openBatchExportDelay, clear: clearBatchExportDelay } = useTimeout(() => onOpenExportModal(), 150);

  const monthSelection = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ];

  const columns: DataTableProps<Order>['columns'] = [
    {
      accessor: 'order_date',
      title: 'Tanggal',
      sortable: true,
      render: (data: Order) => <Text fz="sm">{dayjs(new Date(data.order_date!)).format('MMM D, YYYY')}</Text>,
    },
    {
      accessor: 'buyer_name',
      title: 'Pembeli',
      sortable: true,
    },
    {
      accessor: 'buyer_type',
      title: 'Jenis',
      sortable: true,
    },
    {
      accessor: 'name',
      title: 'Menu',
      sortable: true,
    },
    {
      accessor: 'qty',
      title: 'Qty',
    },
    {
      accessor: 'is_paid',
      title: 'Lunas?',
      render: (data: Order) => (
        <Badge color={data.is_paid ? 'green.8' : 'red'} variant="filled" size="sm" radius="sm">
          {data.is_paid ? 'Lunas' : 'Belum lunas'}
        </Badge>
      ),
      sortable: true,
    },
    {
      accessor: 'price',
      title: 'Harga',
      render: (data: Order) => <Text fz="sm">{formatRupiah(Number(data.price))}</Text>,
    },
    {
      accessor: 'subtotal',
      title: 'Total',
      render: (data: Order) => <Text fz="sm">{formatRupiah(Number(data.subtotal))}</Text>,
    },
    {
      accessor: 'id',
      title: 'Aksi',
      width: 150,
      render: (data: Order) => (
        <MantineMenu withArrow width={150} shadow="md">
          <MantineMenu.Target>
            <ActionIcon>
              <IconDotsVertical size={16} />
            </ActionIcon>
          </MantineMenu.Target>
          <MantineMenu.Dropdown>
            <MantineMenu.Item
              fw={600}
              fz="sm"
              color="blue"
              variant="filled"
              leftSection={<IconEdit size={16} />}
              onClick={() => {
                router.get(route('sale.index'), {
                  edit: data.id,
                });
              }}
            >
              Edit
            </MantineMenu.Item>

            <MantineMenu.Item
              fw={600}
              fz="sm"
              color="red"
              variant="filled"
              leftSection={<IconTrash size={16} />}
              onClick={() => {
                setSelected(() => data);
                onOpen();
              }}
            >
              Hapus
            </MantineMenu.Item>
          </MantineMenu.Dropdown>
        </MantineMenu>
      ),
    },
  ];

  return (
    <>
      <ExportReportModal
        isOpen={isOpenExportModal}
        onClose={() => {
          onCloseExportModal();
        }}
        orders={selectedRecords}
      />

      <AppMeta title="Laporan Bulanan" />
      <PublicLayout {...props}>
        <ContentLayout title="IT'S COFFEE CORNER — LAPORAN BULANAN">
          <DeleteGeneric
            data={selected}
            isOpen={isOpen}
            onClose={onClose}
            baseRoute={baseRoute}
            title="Pesanan"
            deleteParam={{ id: selected?.id }}
            itemName={`Pesanan ${selected?.name} atas nama ${selected?.buyer_name}`}
            onSuccess={(deleted) => {
              data.orders.data = data.orders.data.filter((o) => o.id !== deleted.id);
            }}
            onAfterDelete={() => {
              router.reload({
                only: ['data'],
              });
            }}
          />

          <Paper p="md" shadow="md" radius="md" withBorder className="mt-4">
            <Group justify="space-between" mb="xl">
              <Group gap="xs">
                <Text>Bulan:</Text>
                <Select
                  placeholder="Pilih Bulan"
                  data={monthSelection}
                  value={selectedMonth.toString()}
                  onChange={(e) => {
                    setSelectedMonth(parseInt(e!));
                  }}
                />
                <Text>Tahun:</Text>
                <Select
                  placeholder="Pilih Tahun"
                  data={data.years.map((year) => ({ value: year.toString(), label: year.toString() }))}
                  value={selectedYear.toString()}
                  onChange={(e) => {
                    setSelectedYear(parseInt(e!));
                  }}
                />
                <Button
                  variant="filled"
                  rightSection={<EyeIcon />}
                  disabled={
                    (selectedMonth === data.selectedMonth && selectedYear === data.selectedYear) ||
                    searchFilter.isFetching
                  }
                  onClick={() => {
                    router.get(
                      route('report.index'),
                      {
                        month: selectedMonth,
                        year: selectedYear,
                      },
                      {
                        preserveState: true,
                        replace: true,
                      },
                    );
                  }}
                >
                  Tampilkan
                </Button>
                <Button
                  variant="outline"
                  rightSection={<IconFileExcel />}
                  color="lime"
                  disabled={searchFilter.isFetching}
                  onClick={() => {
                    clearBatchExportDelay();
                    const temp = selectedRecords;
                    setSelectedRecords(data.orders.data.filter((u) => temp.some((t) => t.id === u.id)));
                    openBatchExportDelay();
                  }}
                >
                  Export
                </Button>
              </Group>

              <Group gap="xs">
                <TextInput
                  placeholder="Cari..."
                  leftSection={searchFilter.isFetching ? <Loader size={16} /> : <IconSearch size={16} />}
                  value={searchFilter.search}
                  onChange={(e) => {
                    searchFilter.onSearch(e.currentTarget.value);
                  }}
                  className={cn(classes.searchInput, {
                    [classes.appearAnimation]: searching,
                    [classes.disappearAnimation]: !searching,
                  })}
                />

                <MantineTooltip label="Cari" withArrow>
                  <ActionIcon
                    variant="outline"
                    size="lg"
                    onClick={handleSearchingButton}
                    loading={searchFilter.isFetching}
                  >
                    <IconSearch />
                  </ActionIcon>
                </MantineTooltip>
              </Group>
            </Group>

            <DataTable
              minHeight={200}
              verticalSpacing="xs"
              striped
              highlightOnHover
              columns={columns}
              records={data.orders.data}
              selectedRecords={selectedRecords}
              fetching={searchFilter.isFetching}
              totalRecords={data.orders.total}
              recordsPerPage={data.orders.per_page}
              page={data.orders.current_page}
              recordsPerPageOptions={[5, 10, 15, 20, 50]}
              onSelectedRecordsChange={setSelectedRecords}
              onPageChange={(page) => searchFilter.onPageChange(page)}
              onRecordsPerPageChange={(perPage) => searchFilter.onRecordsPerPage(perPage)}
              sortStatus={searchFilter.sortStatus as DataTableSortStatus<Order>}
              onSortStatusChange={(sortStatus: DataTableSortStatus<Order>) =>
                searchFilter.onSortStatus(sortStatus as DataTableSortStatus<any>)
              }
            />

            <Group gap="xs" mt="sm">
              <Card shadow="md" mt="xs" radius="md">
                <Text fw={500}>Total Pemasukan:</Text>
                <Text size="sm" c="dimmed">
                  {formatRupiah(Number(data.profitThisMonth))}
                </Text>
              </Card>
              <Card shadow="md" mt="xs" radius="md">
                <Text fw={500}>Tagihan IT / Unit:</Text>
                <Text size="sm" c="dimmed">
                  {formatRupiah(Number(data.monthlydeposittotal))}
                </Text>
              </Card>
            </Group>
          </Paper>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
