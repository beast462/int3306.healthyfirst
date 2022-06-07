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

import CustomScrollbar from '@/view/common/components/CustomScrollbar';
import { Assignment } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import { getComparator } from '@/view/common/funcs/getComparator';
import { setFacilityDetail } from '@/view/store/actions/facilityDetail/setFacilityDetail';
import { connect, ConnectedProps } from 'react-redux';
import PlanItem from './PlanItem/PlanItem';
import { useCheckingPlans } from '@/view/hooks/useCheckingPlans';
import PlanSearchBox from './PlanSearchBox/PlanSearchBox';

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

const fields = [
  'planId',
  'id',
  'name',
  'ownerName',
  'address',
  'createdAt',
  'checkedAt',
];

const labels = {
  planId: 'ID',
  id: 'ID cơ sở',
  name: 'Tên cơ sở',
  ownerName: 'Chủ sở hữu',
  address: 'Địa chỉ',
  createdAt: 'Thời gian tạo',
  checkedAt: 'Thời gian kết thúc',
};

const switchSort: Record<SortOrders, SortOrders> = {
  asc: 'desc',
  desc: 'asc',
};

const connector = connect(() => ({}), { setFacilityDetail });

function PlansTable({
  switchSegment,
  setFacilityDetail,
}: ISegmentProps & ConnectedProps<typeof connector>): ReactElement {
  const styles = useStyles();
  const [sort, setSort] = useState({
    order: 'asc',
    column: 'planId',
  } as { order: SortOrders; column: string });

  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
  } as { page: number; rowsPerPage: number });

  const [search, setSearch] = useState({ val: '', opt: 'id' });

  let plans = useCheckingPlans().plans ?? [];
  if (search.val !== '') {
    plans = plans.filter((plan) => {
      if (search.opt === 'id') {
        return plan[search.opt] === +search.val;
      } else {
        return plan[search.opt].toString().match(search.val) !== null;
      }
    });
  }

  const findPlans = (searchOpt: string, searchVal: string) => {
    setSearch({ opt: searchOpt, val: searchVal });
  };

  return (
    <Root>
      <Container>
        <Toolbar
          sx={{ justifyContent: 'space-between' }}
          className={styles.toolbar}
        >
          <Typography variant="h6">Danh sách kế hoạch</Typography>

          <div className="actionBar">
            <PlanSearchBox findPlans={findPlans} />

            <Button
              sx={{ maxWidth: '160px' }}
              variant="contained"
              size="small"
              startIcon={<Assignment />}
              className={styles.addBtn}
              onClick={() => switchSegment(0)}
            >
              Tạo kế hoạch
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
              {plans
                .sort(getComparator(sort.order, sort.column))
                .slice(
                  pagination.rowsPerPage * pagination.page,
                  pagination.rowsPerPage * pagination.page +
                    pagination.rowsPerPage,
                )
                .map((plan) => (
                  <PlanItem
                    key={`plan#${plan.id}`}
                    plan={plan}
                    onClick={() => {
                      switchSegment(2);
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
          count={plans.length}
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

export default connector(PlansTable);
