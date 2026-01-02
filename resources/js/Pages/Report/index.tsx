import AppMeta from '@/components/Meta/AppMeta';
import { ConfirmAddModal } from '@/components/Modals/Confirm';
import DeleteGeneric from '@/components/Modals/DeleteGeneric';
import { ExportReportModal } from '@/components/Modals/exportModal';
import { useSearchFilter } from '@/hooks';
import useClientServerForm from '@/hooks/use-client-server-form';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { checkMantineForm, cn, formatRupiah, mapFormErrorsToMessage } from '@/lib/utils';
import { Expense, Order, paginatedData } from '@/types/models';
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
  NumberInput,
  Paper,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure, useTimeout } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconDotsVertical,
  IconEdit,
  IconFileExcel,
  IconSearch,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { EyeIcon, PlusIcon } from 'lucide-react';
import { DataTable, DataTableProps, DataTableSortStatus } from 'mantine-datatable';
import { useState } from 'react';
import classes from '~/css/TableUtils.module.css';

const baseRoute = 'report';

export default function Page(
  props: GenericViewPage<{
    orders: paginatedData<Order>;
    expenses: paginatedData<Expense>;
    years: number[];
    selectedYear: number;
    selectedMonth: number;
    grossProfitThisMonth: number;
    expenseThisMonth: number;
    monthlydeposittotal: number;
    netProfitThisMonth: number;
    netProfitAllTime: number;
  }>,
) {
  const data = props.data;

  const initialValues = {
    type: '',
    description: '',
    amount: '',
  };
  const { form, getSyncedInputProps, setFieldValueSync, inertiaForm, resetForm } = useClientServerForm({
    initialValues,
    validate: {},
  });
  const [responseNotifId, setResponseNotifId] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const [selectedExpense, setSelectedExpense] = useState<Expense>();
  const [isOpenOrder, { open: onOpenOrder, close: onCloseOrder }] = useDisclosure(false);
  const [isOpenExpense, { open: onOpenExpense, close: onCloseExpense }] = useDisclosure(false);

  const [selectedMonth, setSelectedMonth] = useState(data.selectedMonth);
  const [selectedYear, setSelectedYear] = useState(data.selectedYear);
  const [selectedOrderRecords, setSelectedOrderRecords] = useState<Order[]>([]);
  const [selectedExpenseRecords, setSelectedExpenseRecords] = useState<Expense[]>([]);

  // Orders search filter with context
  const ordersSearchFilter = useSearchFilter(`${baseRoute}.index`, 'updated_at', 'orders');
  const [ordersSearching, setOrdersSearching] = useState(false);

  // Expenses search filter with context
  const expensesSearchFilter = useSearchFilter(`${baseRoute}.index`, 'created_at', 'expenses');
  const [expensesSearching, setExpensesSearching] = useState(false);

  const handleOrdersSearchingButton = () => {
    setOrdersSearching((prev) => {
      return !prev;
    });
  };
  const handleExpensesSearchingButton = () => {
    setExpensesSearching((prev) => {
      return !prev;
    });
  };
  const [isOpenExportModal, { open: onOpenExportModal, close: onCloseExportModal }] = useDisclosure(false);

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

  const expenseTypeSelection = [
    { value: 'bayar it', label: 'Bayar IT' },
    { value: 'belanja', label: 'Belanja' },
    { value: 'lain-lain', label: 'Lain-Lain' },
  ];

  const expenseTypeMapped: Record<string, string> = {
    'bayar it': 'Bayar IT',
    belanja: 'Belanja',
    'lain-lain': 'Lain-Lain',
  };

  const orderColumns: DataTableProps<Order>['columns'] = [
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
                setSelectedOrder(() => data);
                onOpenOrder();
              }}
            >
              Hapus
            </MantineMenu.Item>
          </MantineMenu.Dropdown>
        </MantineMenu>
      ),
    },
  ];

  const expenseColumns: DataTableProps<Expense>['columns'] = [
    {
      accessor: 'created_at',
      title: 'Tanggal',
      sortable: true,
      render: (data: Expense) => <Text fz="sm">{dayjs(new Date(data.created_at!)).format('MMM D, YYYY')}</Text>,
    },
    {
      accessor: 'type',
      title: 'Jenis',
      sortable: true,
      render: (data: Expense) => <Text fz="sm">{expenseTypeMapped[data.type]}</Text>,
    },
    {
      accessor: 'description',
      title: 'Keterangan',
    },
    {
      accessor: 'amount',
      title: 'Nominal',
      render: (data: Expense) => <Text fz="sm">{formatRupiah(Number(data.amount))}</Text>,
      sortable: true,
    },
    {
      accessor: 'id',
      title: 'Aksi',
      width: 150,
      render: (data: Expense) => (
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
                setEditing(true);
                setSelectedExpense(() => data);

                setFieldValueSync('type', data.type);
                setFieldValueSync('description', data.description);
                setFieldValueSync('amount', data.amount / 1);
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
                setSelectedExpense(() => data);
                onOpenExpense();
              }}
            >
              Hapus
            </MantineMenu.Item>
          </MantineMenu.Dropdown>
        </MantineMenu>
      ),
    },
  ];

  const resetData = () => {
    resetForm();
    setEditing(false);
    setSelectedExpense(undefined);
    setFieldValueSync('type', null);
  };

  const onSubmit = () => {
    if (!checkMantineForm(form)) return;

    const url = editing
      ? route(`${baseRoute}.expense.update`, { id: selectedExpense!.id }) // update
      : route(`${baseRoute}.expense.store`); // create

    if (editing) {
      inertiaForm.patch(url, {
        onSuccess: (e) => {
          let id;
          if ((e.props.flash as any).error) {
            id = notifications.show({
              title: 'Gagal Update Pengeluaran',
              message: (e.props.flash as any).error,
              color: 'red',
              autoClose: 10000,
              icon: <IconX />,
            });
          } else {
            id = notifications.show({
              title: 'Berhasil Update Pengeluaran',
              message: 'Data pengeluaran berhasil disimpan.',
              color: 'green',
              icon: <IconCheck />,
            });
          }
          setResponseNotifId(id);
        },
        onError: (e) => {
          const id = notifications.show({
            title: 'Gagal Update Pengeluaran',
            message: `Terjadi kesalahan, silahkan coba lagi. ${mapFormErrorsToMessage(e)}`,
            color: 'red',
            autoClose: 10000,
            icon: <IconX />,
          });
          setResponseNotifId(id);
        },
        onFinish: () => {
          resetData();
        },
      });
    } else {
      inertiaForm.post(url, {
        onSuccess: (e) => {
          let id;
          if ((e.props.flash as any).error) {
            id = notifications.show({
              title: 'Gagal Menambahkan Pengeluaran',
              message: (e.props.flash as any).error,
              color: 'red',
              autoClose: 10000,
              icon: <IconX />,
            });
          } else {
            id = notifications.show({
              title: 'Berhasil Menambahkan Pengeluaran',
              message: 'Data Pengeluaran berhasil disimpan.',
              color: 'green',
              icon: <IconCheck />,
            });
          }
          setResponseNotifId(id);
        },
        onError: (e) => {
          const id = notifications.show({
            title: 'Gagal Menambahkan Pengeluaran',
            message: `Terjadi kesalahan, silahkan coba lagi. ${mapFormErrorsToMessage(e)}`,
            color: 'red',
            autoClose: 10000,
            icon: <IconX />,
          });
          setResponseNotifId(id);
        },
        onFinish: () => {
          resetData();
        },
      });
    }
  };

  const onSave = ConfirmAddModal({
    onConfirm: () => {
      onSubmit();
    },
    data: 'Form',
  });

  return (
    <>
      <ExportReportModal
        isOpen={isOpenExportModal}
        onClose={() => {
          onCloseExportModal();
        }}
        orders={selectedOrderRecords}
      />

      <AppMeta title="Laporan Bulanan" />
      <PublicLayout {...props}>
        <ContentLayout title="IT'S COFFEE CORNER — LAPORAN BULANAN">
          {/* Delete Generic Order */}
          <DeleteGeneric
            data={selectedOrder}
            isOpen={isOpenOrder}
            onClose={onCloseOrder}
            baseRoute={baseRoute}
            title="Pesanan"
            deleteParam={{ id: selectedOrder?.id }}
            itemName={`Pesanan ${selectedOrder?.name} atas nama ${selectedOrder?.buyer_name}`}
            onSuccess={(deleted) => {
              data.orders.data = data.orders.data.filter((o) => o.id !== deleted.id);
            }}
            onAfterDelete={() => {
              router.reload({
                only: ['data'],
              });
            }}
          />

          {/* Delete Generic Expense */}
          <DeleteGeneric
            data={selectedExpense}
            isOpen={isOpenExpense}
            onClose={onCloseExpense}
            baseRoute={`${baseRoute}.expense`}
            title="Pengeluaran"
            deleteParam={{ id: selectedExpense?.id }}
            itemName={`Pengeluaran "${selectedExpense?.description}" pada tanggal ${dayjs(new Date(selectedExpense?.created_at!)).format('DD-MM-YYYY')}`}
            onSuccess={(deleted) => {
              data.expenses.data = data.expenses.data.filter((o) => o.id !== deleted.id);
            }}
            onAfterDelete={() => {
              router.reload({
                only: ['data'],
              });
            }}
          />

          <Group justify="space-between">
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
                  ordersSearchFilter.isFetching ||
                  expensesSearchFilter.isFetching
                }
                onClick={() => {
                  // Clear search states before navigating
                  ordersSearchFilter.onSearch('');
                  expensesSearchFilter.onSearch('');

                  router.get(
                    route('report.index'),
                    {
                      month: selectedMonth,
                      year: selectedYear,
                      // Explicitly clear the search parameters
                      orders_search: undefined,
                      expenses_search: undefined,
                      orders_page: 1,
                      expenses_page: 1,
                    },
                    {
                      preserveState: false, // Changed from true to false
                      replace: true,
                    },
                  );
                }}
              >
                Tampilkan
              </Button>
            </Group>
          </Group>

          <Group gap="xs" mt="sm">
            <Card shadow="md" mt="xs" radius="md">
              <Text fw={500}>Total Pemasukan Kotor:</Text>
              <Text size="sm" c="dimmed">
                {formatRupiah(Number(data.grossProfitThisMonth))}
              </Text>
            </Card>
            <Card shadow="md" mt="xs" radius="md">
              <Text fw={500}>Total Pengeluaran:</Text>
              <Text size="sm" c="dimmed">
                {formatRupiah(Number(data.expenseThisMonth))}
              </Text>
            </Card>
            <Card shadow="md" mt="xs" radius="md">
              <Text fw={500}>Tagihan IT / Unit:</Text>
              <Text size="sm" c="dimmed">
                {formatRupiah(Number(data.monthlydeposittotal))}
              </Text>
            </Card>
            <Card shadow="md" mt="xs" radius="md">
              <Text fw={500}>Total Keuntungan Bersih:</Text>
              <Text size="sm" c="dimmed">
                {formatRupiah(Number(data.netProfitThisMonth))}
              </Text>
            </Card>
            <Card shadow="md" mt="xs" radius="md">
              <Text fw={500}>Total Keseluruhan Keuntungan Bersih:</Text>
              <Text size="sm" c="dimmed">
                {formatRupiah(Number(data.netProfitAllTime))}
              </Text>
            </Card>
          </Group>

          {/* Orders Table */}
          <Paper p="md" shadow="md" radius="md" withBorder className="mt-4">
            <Group justify="space-between" mb="xl">
              <Group gap="xs">
                <Button
                  variant="outline"
                  rightSection={<IconFileExcel />}
                  color="lime"
                  disabled={ordersSearchFilter.isFetching}
                  onClick={() => {
                    clearBatchExportDelay();
                    const temp = selectedOrderRecords;
                    setSelectedOrderRecords(data.orders.data.filter((u) => temp.some((t) => t.id === u.id)));
                    openBatchExportDelay();
                  }}
                >
                  Export
                </Button>
              </Group>

              <Group gap="xs">
                <TextInput
                  placeholder="Cari..."
                  leftSection={ordersSearchFilter.isFetching ? <Loader size={16} /> : <IconSearch size={16} />}
                  value={ordersSearchFilter.search}
                  onChange={(e) => {
                    ordersSearchFilter.onSearch(e.currentTarget.value);
                  }}
                  className={cn(classes.searchInput, {
                    [classes.appearAnimation]: ordersSearching,
                    [classes.disappearAnimation]: !ordersSearching,
                  })}
                />

                <MantineTooltip label="Cari" withArrow>
                  <ActionIcon
                    variant="outline"
                    size="lg"
                    onClick={handleOrdersSearchingButton}
                    loading={ordersSearchFilter.isFetching}
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
              columns={orderColumns}
              records={data.orders.data}
              selectedRecords={selectedOrderRecords}
              fetching={ordersSearchFilter.isFetching}
              totalRecords={data.orders.total}
              recordsPerPage={data.orders.per_page}
              page={data.orders.current_page}
              recordsPerPageOptions={[5, 10, 15, 20, 50]}
              onSelectedRecordsChange={setSelectedOrderRecords}
              onPageChange={(page) => ordersSearchFilter.onPageChange(page)}
              onRecordsPerPageChange={(perPage) => ordersSearchFilter.onRecordsPerPage(perPage)}
              sortStatus={ordersSearchFilter.sortStatus as DataTableSortStatus<Order>}
              onSortStatusChange={(sortStatus: DataTableSortStatus<Order>) =>
                ordersSearchFilter.onSortStatus(sortStatus as DataTableSortStatus<any>)
              }
            />
          </Paper>

          {/* Expenses Table */}
          <Paper p="md" shadow="md" radius="md" withBorder className="mt-4">
            <Group justify="space-between" mb="xl">
              <Group gap="xs">
                <Select
                  placeholder="Jenis Pengeluaran"
                  data={expenseTypeSelection}
                  value={form.values.type}
                  error={form.errors.type}
                  disabled={inertiaForm.processing}
                  onChange={(value) => {
                    setFieldValueSync('type', value);
                  }}
                />
                <TextInput
                  placeholder="Keterangan Pengeluaran"
                  value={form.values.description}
                  error={form.errors.description}
                  disabled={inertiaForm.processing}
                  onChange={(e) => {
                    setFieldValueSync('description', e.target.value);
                  }}
                />
                <NumberInput
                  placeholder="Nominal Pengeluaran"
                  value={form.values.amount}
                  error={form.errors.amount}
                  disabled={inertiaForm.processing}
                  onChange={(value) => {
                    setFieldValueSync('amount', value);
                  }}
                  thousandSeparator=" "
                />
                <Button
                  variant="filled"
                  rightSection={<PlusIcon />}
                  color="green"
                  loading={inertiaForm.processing}
                  onClick={onSave}
                >
                  {editing ? 'Update' : 'Tambah'}
                </Button>
              </Group>

              <Group gap="xs">
                <TextInput
                  placeholder="Cari..."
                  leftSection={expensesSearchFilter.isFetching ? <Loader size={16} /> : <IconSearch size={16} />}
                  value={expensesSearchFilter.search}
                  onChange={(e) => {
                    expensesSearchFilter.onSearch(e.currentTarget.value);
                  }}
                  className={cn(classes.searchInput, {
                    [classes.appearAnimation]: expensesSearching,
                    [classes.disappearAnimation]: !expensesSearching,
                  })}
                />

                <MantineTooltip label="Cari" withArrow>
                  <ActionIcon
                    variant="outline"
                    size="lg"
                    onClick={handleExpensesSearchingButton}
                    loading={expensesSearchFilter.isFetching}
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
              columns={expenseColumns}
              records={data.expenses.data}
              selectedRecords={selectedExpenseRecords}
              fetching={expensesSearchFilter.isFetching}
              totalRecords={data.expenses.total}
              recordsPerPage={data.expenses.per_page}
              page={data.expenses.current_page}
              recordsPerPageOptions={[5, 10, 15, 20, 50]}
              onSelectedRecordsChange={setSelectedExpenseRecords}
              onPageChange={(page) => expensesSearchFilter.onPageChange(page)}
              onRecordsPerPageChange={(perPage) => expensesSearchFilter.onRecordsPerPage(perPage)}
              sortStatus={expensesSearchFilter.sortStatus as DataTableSortStatus<Expense>}
              onSortStatusChange={(sortStatus: DataTableSortStatus<Expense>) =>
                expensesSearchFilter.onSortStatus(sortStatus as DataTableSortStatus<any>)
              }
            />
          </Paper>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
