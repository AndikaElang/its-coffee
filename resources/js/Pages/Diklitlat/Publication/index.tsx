import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import AppMeta from '@/components/Meta/AppMeta';
import { useSearchFilter } from '@/hooks';
import ContentLayout from '@/layouts/ContentLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { cn } from '@/lib/utils';
import { Publication } from '@/types/models';
import { ViewPaginateGeneric } from '@/types/page-params';
import { ActionIcon, Group, Loader, Tooltip as MantineTooltip, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { DataTable, DataTableProps, DataTableSortStatus } from 'mantine-datatable';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from '~/css/TableUtils.module.css';

export default function Page(props: ViewPaginateGeneric<Publication>) {
  const { t } = useTranslation();
  const t_opt = { ns: 'diklat' };
  const data = props.data.data;
  const baseRoute = 'diklat.publication';

  const searchFilter = useSearchFilter(`${baseRoute}.index`);
  const [searching, setSearching] = useState(false);
  const handleSearchingButton = () => {
    setSearching((prev) => {
      return !prev;
    });
  };

  const columns: DataTableProps<Publication>['columns'] = [
    {
      accessor: 'title',
      title: 'Judul',
      render: (data: Publication) => {
        return (
          <div>
            <p className="text-center">{data.title}</p>
          </div>
        );
      },
      sortable: true,
    },
    {
      accessor: 'year',
      title: 'Tahun',
      render: (data: Publication) => {
        return (
          <div>
            <p className="text-center">{data.year}</p>
          </div>
        );
      },
      sortable: true,
    },
    {
      accessor: 'writer',
      title: 'Penulis',
      render: (data: Publication) => {
        return (
          <div>
            <p className="text-center">{data.writer}</p>
          </div>
        );
      },
      sortable: true,
    },
    {
      accessor: 'journal',
      title: 'Jurnal',
      render: (data: Publication) => {
        return (
          <div>
            <p className="text-center">{data.journal}</p>
          </div>
        );
      },
      sortable: true,
    },
    {
      accessor: 'doi',
      title: 'DOI',
      render: (data: Publication) => {
        return (
          <div className="text-center">
            <a
              href={data.doi ? data.doi : '#'}
              className="text-blue-400 hover:text-blue-600 hover:cursor-pointer hover:underline"
              target={data.doi ? '_blank' : undefined}
            >
              {data.doi}
            </a>
          </div>
        );
      },
      sortable: true,
    },
  ];

  return (
    <>
      <AppMeta title="Publikasi" />
      <PublicLayout {...props}>
        <ContentLayout
          breadCrumb={
            <CustomBreadcrumb
              items={[{ label: 'Beranda', href: '/' }, { label: 'Diklitlat' }, { label: 'Publikasi', href: '#' }]}
            />
          }
        >
          {/* <Paper p="md" shadow="md" radius="md" withBorder> */}
          <Group justify="space-between" mb="md">
            <Group ms={'auto'} gap={'xs'} justify="flex-end">
              <Group gap={'xs'} justify="flex-end">
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
                    size={'lg'}
                    onClick={handleSearchingButton}
                    loading={searchFilter.isFetching}
                  >
                    <IconSearch />
                  </ActionIcon>
                </MantineTooltip>
              </Group>
            </Group>
          </Group>

          <DataTable
            minHeight={200}
            verticalSpacing="xs"
            striped
            highlightOnHover
            // withColumnBorders
            columns={columns}
            records={data}
            fetching={searchFilter.isFetching}
            totalRecords={props.data.total}
            recordsPerPage={props.data.per_page}
            page={props.data.current_page}
            recordsPerPageOptions={[5, 10, 20, 50]}
            onPageChange={(page) => searchFilter.onPageChange(page)}
            onRecordsPerPageChange={(perPage) => searchFilter.onRecordsPerPage(perPage)}
            sortStatus={searchFilter.sortStatus as DataTableSortStatus<Publication>}
            onSortStatusChange={(sortStatus: DataTableSortStatus<Publication>) =>
              searchFilter.onSortStatus(sortStatus as DataTableSortStatus<any>)
            }
          />
          {/* </Paper> */}
        </ContentLayout>
      </PublicLayout>
    </>
  );
}
