import AppMeta from '@/components/Meta/AppMeta';
import { ConfirmAddModal, ConfirmResetModal } from '@/components/Modals/Confirm';
import DeleteGeneric from '@/components/Modals/DeleteGeneric';
import Surface from '@/components/Surface';
import { useSearchFilter } from '@/hooks';
import useClientServerForm from '@/hooks/use-client-server-form';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { checkMantineForm, cn, formatRupiah, getTodayString, mapFormErrorsToMessage } from '@/lib/utils';
import { Menu, Order, paginatedData } from '@/types/models';
import { GenericViewPage } from '@/types/page-params';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  Group,
  Input,
  Loader,
  Menu as MantineMenu,
  Tooltip as MantineTooltip,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCancel,
  IconCheck,
  IconDotsVertical,
  IconEdit,
  IconHandClick,
  IconSearch,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DataTable, DataTableProps, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import classes from '~/css/TableUtils.module.css';

const baseRoute = 'sale';

export default function Page(
  props: GenericViewPage<{
    orders: paginatedData<Order>;
    menus: Menu[];
    grossProfitThisMonth: number;
    profitAllTime: number;
    monthlyDepositTotal: number;
    editOrder?: Order & {
      items: {
        menu_id: number;
        qty: number;
        price: number;
        subtotal: number;
        menu: Menu;
      }[];
    };
  }>,
) {
  // const [media, setMedia] = useState<string | undefined>(data ? (data.thumbnail_pelatihan ?? '') : '');
  const data = props.data;

  const [selected, setSelected] = useState<Order>();
  const [isOpen, { open: onOpen, close: onClose }] = useDisclosure(false);
  const [selectedRecords, setSelectedRecords] = useState<Order[]>([]);
  const searchFilter = useSearchFilter(`${baseRoute}.index`);
  const [searching, setSearching] = useState(false);
  const handleSearchingButton = () => {
    setSearching((prev) => {
      return !prev;
    });
  };
  const [editing, setEditing] = useState<boolean>(false);

  const initialValues = {
    order_date: getTodayString(),
    buyer_type: 'NON-IT',
    buyer_name: '',
    menu_id: '',
    qty: 1,
    price: '',
    extra_cup: false,
    payment_type: 'Cash',
    is_paid: false,
    discount: '',
  };
  const { form, getSyncedInputProps, setFieldValueSync, inertiaForm, resetForm } = useClientServerForm({
    initialValues,
    validate: {},
  });
  const [responseNotifId, setResponseNotifId] = useState<string | null>(null);

  const buyerTypeSelection = [
    { value: 'NON-IT', label: 'NON-IT' },
    { value: 'IT', label: 'IT' },
  ];
  const menuSelection = data.menus.map((item) => {
    return {
      value: `${item.id}`,
      label: `${item.name}`,
    };
  });
  const paymentTypeSelection = [
    { value: 'Cash', label: 'Cash' },
    { value: 'QRIS', label: 'QRIS' },
    { value: 'Transfer', label: 'Transfer' },
  ];

  useEffect(() => {
    if (form.values.menu_id && form.values.qty) {
      const selectedMenu = data.menus.find((menu) => menu.id === parseInt(form.values.menu_id));
      if (selectedMenu && selectedMenu.base_price) {
        let baseprice = selectedMenu.base_price / 1;
        setFieldValueSync('price', baseprice.toString());
        if (form.values.buyer_type === 'IT') {
          let itPrice = selectedMenu.it_price / 1;
          setFieldValueSync('price', itPrice.toString());
          if (form.values.extra_cup) {
            itPrice += 1000;
            setFieldValueSync('price', itPrice.toString());
          }
        }
      }
    } else {
      setFieldValueSync('price', '');
    }
  }, [form.values.menu_id, form.values.qty, form.values.buyer_type, form.values.extra_cup]);

  useEffect(() => {
    if (!data.editOrder) return;

    const order = data.editOrder;
    const item = order.items[0]; // assuming 1 item per order

    setEditing(true);
    setSelected(order);

    setFieldValueSync('order_date', order.order_date);
    setFieldValueSync('buyer_type', order.buyer_type);
    setFieldValueSync('buyer_name', order.buyer_name);
    setFieldValueSync('menu_id', String(item.menu_id));
    setFieldValueSync('qty', item.qty);
    setFieldValueSync('price', item.price);
    setFieldValueSync('extra_cup', order.extra_cup);
    setFieldValueSync('payment_type', order.payment_type);
    setFieldValueSync('is_paid', order.is_paid);

    const discount = item.price * item.qty - item.subtotal;
    setFieldValueSync('discount', discount > 0 ? discount : 0);
  }, [data.editOrder]);

  useEffect(() => {
    if (!data.editOrder) return;

    router.replace({
      url: route('sale.index'),
      preserveState: true,
    });
  }, [data.editOrder]);

  const resetData = () => {
    resetForm();
    setEditing(false);
    setSelected(undefined);
    setFieldValueSync('menu_id', null);
  };

  const onReset = ConfirmResetModal({
    onConfirm: () => {
      resetData();
      notifications.show({
        title: 'Form Reset',
        message: 'Formulir berhasil direset.',
      });
    },
    data: 'Form',
  });

  const onSubmit = () => {
    if (!checkMantineForm(form)) return;

    const url = editing
      ? route(`${baseRoute}.update`, { id: selected!.id }) // update
      : route(`${baseRoute}.store`); // create

    if (editing) {
      inertiaForm.patch(url, {
        onSuccess: (e) => {
          let id;
          if ((e.props.flash as any).error) {
            id = notifications.show({
              title: 'Gagal Update Pesanan',
              message: (e.props.flash as any).error,
              color: 'red',
              autoClose: 10000,
              icon: <IconX />,
            });
          } else {
            id = notifications.show({
              title: 'Berhasil Update Pesanan',
              message: 'Data pesanan berhasil disimpan.',
              color: 'green',
              icon: <IconCheck />,
            });
          }
          setResponseNotifId(id);
        },
        onError: (e) => {
          const id = notifications.show({
            title: 'Gagal Update Pesanan',
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
              title: 'Gagal Menambahkan Pesanan',
              message: (e.props.flash as any).error,
              color: 'red',
              autoClose: 10000,
              icon: <IconX />,
            });
          } else {
            id = notifications.show({
              title: 'Berhasil Menambahkan Pesanan',
              message: 'Data pesanan berhasil disimpan.',
              color: 'green',
              icon: <IconCheck />,
            });
          }
          setResponseNotifId(id);
        },
        onError: (e) => {
          const id = notifications.show({
            title: 'Gagal Menambahkan Pesanan',
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
      accessor: 'is_paid',
      title: 'Lunas?',
      render: (data: Order) => (
        <Badge color={data.is_paid ? 'green.8' : 'red'} variant="filled" size="sm" radius="sm">
          {data.is_paid ? 'Lunas' : 'Belum lunas'}
        </Badge>
      ),
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
              // component={Link}
              leftSection={<IconEdit size={16} />}
              onClick={() => {
                setEditing(true);
                setSelected(data);

                // Fill form with selected data
                setFieldValueSync('order_date', data.order_date);
                setFieldValueSync('buyer_type', data.buyer_type);
                setFieldValueSync('buyer_name', data.buyer_name);
                setFieldValueSync('menu_id', `${data.menu_id}`);
                setFieldValueSync('qty', data.qty);
                setFieldValueSync('price', data.price ? data.price / 1 : 0);
                setFieldValueSync('extra_cup', data.extra_cup);
                setFieldValueSync('payment_type', data.payment_type);
                setFieldValueSync('is_paid', data.is_paid);

                let discount = null;

                if (data.price && data.qty && data.subtotal) {
                  const calculatedDiscount = data.price * data.qty - data.subtotal;
                  discount = calculatedDiscount < 0 ? 0 : calculatedDiscount;
                }

                // Set ke form
                setFieldValueSync('discount', discount);
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
      <AppMeta title="Sales" />
      <PublicLayout {...props}>
        <ContentLayout title="IT'S COFFEE CORNER — SALES">
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
          <Surface component={Paper} p="md" shadow="md" radius="md" h="100%" withBorder>
            <Stack gap={32}>
              <Stack>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                  <DateInput
                    withAsterisk
                    label="Tanggal"
                    placeholder="Pilih Tanggal Pesanan"
                    value={form.values.order_date}
                    error={form.errors.order_date}
                    disabled={inertiaForm.processing}
                    onChange={(value) => {
                      setFieldValueSync('order_date', dayjs(value).format('YYYY-MM-DD'));
                    }}
                    valueFormat="YYYY-MM-DD"
                    minDate={dayjs().format('YYYY-MM-DD')}
                  />
                  <Select
                    withAsterisk
                    label="Status"
                    placeholder="Pilih Status"
                    data={buyerTypeSelection}
                    value={form.values.buyer_type}
                    error={form.errors.buyer_type}
                    disabled={inertiaForm.processing}
                    onChange={(value) => {
                      setFieldValueSync('buyer_type', value);
                    }}
                    allowDeselect={false}
                  />
                </SimpleGrid>
              </Stack>
              <Stack>
                <TextInput
                  withAsterisk
                  label="Nama Pembeli"
                  placeholder="Contoh: Budi"
                  value={form.values.buyer_name}
                  error={form.errors.buyer_name}
                  disabled={inertiaForm.processing}
                  onChange={(e) => {
                    setFieldValueSync('buyer_name', e.target.value);
                  }}
                />
              </Stack>
              <Stack>
                <SimpleGrid cols={{ base: 2, md: 3 }} spacing="md">
                  <Select
                    withAsterisk
                    label="Menu"
                    placeholder="-- pilih menu --"
                    data={menuSelection}
                    value={form.values.menu_id || null}
                    error={form.errors.menu_id}
                    disabled={inertiaForm.processing}
                    onChange={(value) => {
                      setFieldValueSync('menu_id', value);
                    }}
                    allowDeselect={true}
                  />
                  <NumberInput
                    withAsterisk
                    label="Qty"
                    value={form.values.qty}
                    error={form.errors.qty}
                    disabled={inertiaForm.processing}
                    onChange={(value) => {
                      setFieldValueSync('qty', value);
                    }}
                    thousandSeparator=" "
                  />
                  <Input.Wrapper label="Cup" error={form.errors.is_paid} withAsterisk={false}>
                    <Checkbox
                      checked={form.values.extra_cup}
                      disabled={inertiaForm.processing}
                      onChange={(e) => {
                        setFieldValueSync('extra_cup', e.target.checked);
                      }}
                      mt="xs"
                      description="Pembeli IT pakai cup (+1000)"
                    />
                  </Input.Wrapper>
                </SimpleGrid>
              </Stack>
              <Stack>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                  <NumberInput
                    label="Harga (auto)"
                    placeholder="Harga (auto)"
                    value={form.values.price}
                    error={form.errors.price || inertiaForm.errors.price}
                    disabled={inertiaForm.processing || !form.values.price}
                    onChange={(value) => {
                      setFieldValueSync('price', value);
                    }}
                    thousandSeparator=" "
                    readOnly
                  />
                  <NumberInput
                    label="Diskon"
                    placeholder="Contoh: 5 000"
                    value={form.values.discount}
                    error={form.errors.discount}
                    disabled={inertiaForm.processing}
                    onChange={(value) => {
                      setFieldValueSync('discount', value);
                    }}
                    thousandSeparator=" "
                  />
                </SimpleGrid>
              </Stack>
              <Stack>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                  <Select
                    withAsterisk
                    label="Metode Bayar"
                    placeholder="-- pilih metode bayar --"
                    data={paymentTypeSelection}
                    value={form.values.payment_type}
                    error={form.errors.payment_type}
                    disabled={inertiaForm.processing}
                    onChange={(value) => {
                      setFieldValueSync('payment_type', value);
                    }}
                    allowDeselect={false}
                  />
                  <Input.Wrapper label=" " error={form.errors.is_paid} withAsterisk={false}>
                    <Checkbox
                      label="Lunas"
                      checked={form.values.is_paid}
                      disabled={inertiaForm.processing}
                      onChange={(e) => setFieldValueSync('is_paid', e.target.checked)}
                      mt="xs"
                    />
                  </Input.Wrapper>
                </SimpleGrid>
              </Stack>
              <Stack>
                <Group justify="center">
                  <Button
                    variant="outline"
                    style={{ width: 'fit-content' }}
                    loading={inertiaForm.processing}
                    leftSection={<IconCancel size={16} />}
                    color="red"
                    onClick={onReset}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    style={{ width: 'fit-content' }}
                    loading={inertiaForm.processing}
                    rightSection={<IconHandClick size={16} />}
                    onClick={onSave}
                  >
                    {editing ? 'Update Pesanan' : 'Pesan'}
                  </Button>
                </Group>
              </Stack>
            </Stack>
          </Surface>

          <Paper p="md" shadow="md" radius="md" withBorder className="mt-4">
            <Group justify="space-between" mb="xl">
              <Text c="dimmed">
                * Pastikan semua transaksi telah lunas, apabila sudah berganti hari status pembayaran hanya dapat diubah
                melalui halaman laporan bulanan!
              </Text>

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
            <div className="mt-5 w-full flex flex-col items-center md:grid md:grid-cols-3 md:items-start">
              {/* KOSONG SEBAGAI RUANG KIRI (DESKTOP) */}
              <div className="hidden md:block"></div>

              {/* PENDAPATAN (TENGAH) */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
                <span>
                  Pendapatan bulan ini:
                  <Text fw={700}>{formatRupiah(Number(data.grossProfitThisMonth))}</Text>
                </span>
                <span>
                  Pendapatan keseluruhan:
                  <Text fw={700}>{formatRupiah(Number(data.profitAllTime))}</Text>
                </span>
              </div>

              {/* TAGIHAN UNIT (KANAN BAWAH DI DESKTOP, CENTER DI MOBILE) */}
              <div className="mt-4 md:mt-0 text-center md:text-right">
                tagihan Unit:
                <Text fw={700}>{formatRupiah(Number(data.monthlyDepositTotal))}</Text>
              </div>
            </div>
          </Paper>
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
