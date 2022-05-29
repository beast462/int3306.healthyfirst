import { ApplicationState } from '@/view/store';
import { changePage as _changePage } from '@/view/store/actions/accountTable/changePage';
import { changeRpp as _changeRpp } from '@/view/store/actions/accountTable/changeRPP';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TablePagination,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import TableHeader from './TableHeader/TableHeader';

const connector = connect(
  (state: ApplicationState) => ({
    rowsPerPage: state.accountsTable.rowsPerPage,
    page: state.accountsTable.page,
    itemsCount: state.accountsTable.itemsCount,
  }),
  {
    changePage: _changePage,
    changeRpp: _changeRpp,
  },
);

function AccountTable({
  rowsPerPage,
  page,
  itemsCount,
  changePage,
  changeRpp,
}: ConnectedProps<typeof connector>): ReactElement {
  return (
    <Box width="100%">
      <Paper>
        <Box
          display="flex"
          padding="0.5rem"
          width="100%"
          justifyContent="flex-end"
        >
          <Button variant="contained">
            <Add /> Thêm tài khoản
          </Button>
        </Box>

        <Table>
          <TableHeader />
          <TableBody></TableBody>
        </Table>

        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          rowsPerPage={rowsPerPage}
          count={itemsCount}
          page={page}
          // onPageChange={async (_, newPage) => {
          //   await getStudents(rowsPerPage, newPage);
          //   changePage(newPage);
          // }}
          // onRowsPerPageChange={async (event) => {
          //   const newRpp = event.target.value as unknown as number;
          //   await getStudents(newRpp, page);
          //   changeRpp(newRpp);
          // }}
          onPageChange={(event: unknown, page: number) => {
            changePage(page);
          }}
          onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newRpp = +event.target.value;
            changeRpp(newRpp);
          }}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`
          }
          labelRowsPerPage="Số dòng trong 1 trang"
          nextIconButtonProps={{
            title: 'Trang tiếp',
          }}
          backIconButtonProps={{ title: 'Trang trước' }}
        />
      </Paper>
    </Box>
  );
}

export default connector(AccountTable);
