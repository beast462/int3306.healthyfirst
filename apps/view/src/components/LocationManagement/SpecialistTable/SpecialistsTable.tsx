import { useState } from 'react';

import { SortOrders } from '@/common/types/sort-orders';
import NowrapCell from '@/view/common/components/NowrapCell';
import styled from '@emotion/styled';
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';

import { ISegmentProps } from '@/view/common/interfaces/Segment';
import SpecialistItem from './SpecialistItem/SpecialistItem';
import { Specialist } from '@/common/models/specialist';
import { useManagedSpecialists } from '@/view/hooks/useManagedSpecialists';
import CustomScrollbar from '@/view/common/components/CustomScrollbar';
import { getComparator } from '@/view/common/funcs/getComparator';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.5rem;
`;

const Container = styled(Paper)`
  width: 100%;
`;

const CTableContainer = styled(CustomScrollbar)`
  max-height: calc(100vh - 14rem);
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar-track {
    margin-top: 3.75rem;
  }
`;

const fields = ['userId', 'displayName', 'email', 'roleId', 'managedArea'];
const labels = {
  userId: 'ID',
  displayName: 'Họ và tên',
  email: 'Email',
  roleId: 'Vai trò',
  managedArea: 'Địa bàn quản lý',
};

const switchSort: Record<SortOrders, SortOrders> = {
  asc: 'desc',
  desc: 'asc',
};

function SpecialistsTable({ switchSegment }: ISegmentProps) {
  const [sort, setSort] = useState({
    order: 'asc',
    column: 'userId',
  } as { order: SortOrders; column: string });
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
  } as { page: number; rowsPerPage: number });
  const { data } = useManagedSpecialists();

  console.log(data);

  const specialists = data ?? [];
  const total = specialists.length;

  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Danh sách chuyên viên</Typography>
        </Toolbar>

        <CTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <NowrapCell key={`header.table.locationManagement/${field}}`}>
                    <TableSortLabel
                      active={sort.column === field}
                      direction={sort.order}
                      onClick={() =>
                        setSort({
                          order:
                            field === sort.column
                              ? switchSort[sort.order]
                              : 'asc',
                          column: field,
                        })
                      }
                    >
                      {labels[field]}
                    </TableSortLabel>
                  </NowrapCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {specialists
                ?.sort(getComparator(sort.order, sort.column))
                .slice(
                  pagination.rowsPerPage * pagination.page,
                  pagination.rowsPerPage * pagination.page +
                    pagination.rowsPerPage,
                )
                .map((specialist: Specialist) => (
                  <SpecialistItem
                    key={`specialist#${specialist.userId}`}
                    specialist={specialist}
                    onClick={switchSegment}
                  />
                ))}
            </TableBody>
          </Table>
        </CTableContainer>

        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          rowsPerPage={pagination.rowsPerPage}
          count={total}
          page={pagination.page}
          labelRowsPerPage="Số dòng mỗi trang"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} trong ${count}`
          }
          onRowsPerPageChange={(event) =>
            setPagination({
              ...pagination,
              rowsPerPage: event.target.value as unknown as number,
            })
          }
          onPageChange={(_, page) => setPagination({ ...pagination, page })}
        />
      </Container>
    </Root>
  );
}

export default SpecialistsTable;
