import { ReactElement, useState } from 'react';

import { SortOrders } from '@/common/types/sort-orders';

import styled from '@emotion/styled';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';

import { ISegmentProps } from '../../AccountManagement';
import NowrapCell from '@/view/common/components/NowrapCell';

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
    rowsPerPage: 100,
  } as { page: number; rowsPerPage: number });

  // const mockData = JSON.parse(
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   require('../../../../test/mock-data/facilities/facilities.json'),
  // );

  // console.log(mockData);

  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Danh sách cơ sở</Typography>
        </Toolbar>

        <TableContainer>
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
          </Table>
        </TableContainer>
      </Container>
    </Root>
  );
}

export default FacilitiesTable;
