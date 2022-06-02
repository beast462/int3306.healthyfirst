import { ReactElement, useState } from 'react';

import { SortOrders } from '@/common/types/sort-orders';

import styled from '@emotion/styled';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';

import { ISegmentProps } from '@/view/common/interfaces/Segment';
import NowrapCell from '@/view/common/components/NowrapCell';

import { facilities } from '../../../../test/mock-data/facilities/facilities';
import FacilityItem from './FacilityItem/FacilityItem';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
`;

const Container = styled(Paper)`
  width: 100%;
`;

// const TableContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   overflow-x: auto;
//   overflow-y: auto;
// `;

const fields = ['id', 'facilityName', 'ownerName', 'address', 'facilityType'];

const labels = {
  id: 'ID',
  facilityName: 'Tên cơ sở',
  ownerName: 'Chủ sở hữu',
  address: 'Địa chỉ',
  facilityType: 'Loại hình kinh doanh',
};

const switchSort: Record<SortOrders, SortOrders> = {
  asc: 'desc',
  desc: 'asc',
};

function FacilitiesTable({ switchSegment }: ISegmentProps): ReactElement {
  const [sort, setSort] = useState({
    order: 'asc',
    column: 'id',
  } as { order: SortOrders; column: string });

  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
  } as { page: number; rowsPerPage: number });

  const mockData = facilities;
  const total = 100;

  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Danh sách cơ sở</Typography>
        </Toolbar>

        <TableContainer sx={{ maxHeight: 'calc(100vh - 12rem)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <NowrapCell key={`header.table.facilityManagement/${field}`}>
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
              {mockData
                .slice(
                  pagination.rowsPerPage * pagination.page,
                  pagination.rowsPerPage * pagination.page +
                    pagination.rowsPerPage,
                )
                .map((facility) => (
                  <FacilityItem
                    key={`facility#${facility.id}`}
                    facility={facility}
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

export default FacilitiesTable;
