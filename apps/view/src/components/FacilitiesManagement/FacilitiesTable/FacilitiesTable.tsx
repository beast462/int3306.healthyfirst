import { ReactElement, useState } from 'react';

import { SortOrders } from '@/common/types/sort-orders';

import styled from '@emotion/styled';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';

import { ISegmentProps } from '@/view/common/interfaces/Segment';
import NowrapCell from '@/view/common/components/NowrapCell';

import { facilities as mockFacilities } from '../../../../test/mock-data/facilities/facilities';
import FacilityItem from './FacilityItem/FacilityItem';

import CustomScrollbar from '@/view/common/components/CustomScrollbar';
import { AddBusinessRounded } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import SearchBox from './SearchBox/SearchBox';
import { getComparator } from '@/view/common/funcs/getComparator';
import { useFacilities } from '@/view/hooks/useFacilities';
import { setFacilityDetail } from '@/view/store/actions/facilityDetail/setFacilityDetail';
import { connect, ConnectedProps } from 'react-redux';

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

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    flexDirection: 'row',
    '& > div.actionBar': {
      display: 'flex',
      marginTop: '1rem',
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      '& > div.actionBar': {
        marginTop: 0,
      },
    },
  },
  addBtn: {
    flex: 1,
    height: '40px',
    marginTop: '1rem',
    marginLeft: '1rem',
  },
}));

const fields = ['id', 'name', 'ownerName', 'address', 'facilityTypeId'];

const labels = {
  id: 'ID',
  name: 'Tên cơ sở',
  ownerName: 'Chủ sở hữu',
  address: 'Địa chỉ',
  facilityTypeId: 'Loại hình kinh doanh',
};

const switchSort: Record<SortOrders, SortOrders> = {
  asc: 'desc',
  desc: 'asc',
};

const connector = connect(() => ({}), { setFacilityDetail });

function FacilitiesTable({
  switchSegment,
  setFacilityDetail,
}: ISegmentProps & ConnectedProps<typeof connector>): ReactElement {
  const styles = useStyles();
  const [sort, setSort] = useState({
    order: 'asc',
    column: 'id',
  } as { order: SortOrders; column: string });

  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
  } as { page: number; rowsPerPage: number });

  const [search, setSearch] = useState({ val: '', opt: 'id' });

  let facilities = useFacilities().facilities ?? [];
  if (search.val !== '') {
    facilities = facilities.filter((facility) => {
      if (search.opt === 'id') {
        return facility[search.opt] === +search.val;
      } else {
        return facility[search.opt].toString().match(search.val) !== null;
      }
    });
  }

  console.log(facilities);

  const findFacilities = (searchOpt: string, searchVal: string) => {
    setSearch({ opt: searchOpt, val: searchVal });
  };

  return (
    <Root>
      <Container>
        <Toolbar
          sx={{ justifyContent: 'space-between' }}
          className={styles.toolbar}
        >
          <Typography variant="h6">Danh sách cơ sở</Typography>

          <div className="actionBar">
            <SearchBox findFacilities={findFacilities} />

            <Button
              sx={{ maxWidth: '160px' }}
              variant="contained"
              size="small"
              startIcon={<AddBusinessRounded />}
              className={styles.addBtn}
              onClick={() => switchSegment(2)}
            >
              thêm cơ sở
            </Button>
          </div>
        </Toolbar>

        <CTableContainer>
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
              {facilities
                .sort(getComparator(sort.order, sort.column))
                .slice(
                  pagination.rowsPerPage * pagination.page,
                  pagination.rowsPerPage * pagination.page +
                    pagination.rowsPerPage,
                )
                .map((facility) => (
                  <FacilityItem
                    key={`facility#${facility.id}`}
                    facility={facility}
                    onClick={() => {
                      switchSegment(1);
                      setFacilityDetail(facility);
                      console.log(facility);
                    }}
                  />
                ))}
            </TableBody>
          </Table>
        </CTableContainer>

        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          rowsPerPage={pagination.rowsPerPage}
          count={facilities.length}
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

export default connector(FacilitiesTable);
