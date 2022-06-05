import { useState } from 'react';

import { PublicUser } from '@/common/models/public-user';
import { SortOrders } from '@/common/types/sort-orders';
import NowrapCell from '@/view/common/components/NowrapCell';
import { useCreatedAccounts } from '@/view/hooks/useCreatedAccounts';
import styled from '@emotion/styled';
import { Add } from '@mui/icons-material';
import {
  Button,
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

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
`;

const Container = styled(Paper)`
  width: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const fields = ['id', 'displayName', 'email', 'roleId', 'managedArea'];
const labels = {
  id: 'ID',
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
    column: 'id',
  } as { order: SortOrders; column: string });
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
  } as { page: number; rowsPerPage: number });
  const { data } = useManagedSpecialists();

  const specialists = data?.specialists ?? [];
  const total = data?.total ?? 0;

  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Danh sách chuyên viên</Typography>

          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            onClick={switchSegment}
          >
            tạo tài khoản
          </Button>
        </Toolbar>

        <TableContainer>
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
              {specialists?.map((specialist: Specialist) => (
                <SpecialistItem
                  key={`specialist#${specialist.id}`}
                  specialist={specialist}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
