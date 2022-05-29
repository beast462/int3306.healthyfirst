import { ApplicationState } from '@/view/store';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TablePagination,
} from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import TableHeader from './TableHeader/TableHeader';
import { useUser } from '@/view/hooks/useUser';
import TableItem from './TableItem/TableItem';
import { changePage as _changePage } from '@/view/store/actions/accountTable/changePage';
import { changeRpp as _changeRpp } from '@/view/store/actions/accountTable/changeRPP';
import { getAccounts as _getAccounts } from '@/view/store/actions/accountsData/getAccounts';
import { changeShowRegisForm } from '@/view/store/actions/app/changeShowRegisForm';

const connector = connect(
  (state: ApplicationState) => ({
    rowsPerPage: state.accountsTable.rowsPerPage,
    page: state.accountsTable.page,
    itemsCount: state.accountsTable.itemsCount,
    accounts: state.accountsData,
  }),
  {
    changePage: _changePage,
    changeRpp: _changeRpp,
    getAccounts: _getAccounts,
    changeShowRegisForm,
  },
);

function AccountTable({
  rowsPerPage,
  page,
  itemsCount,
  accounts,
  changePage,
  changeRpp,
  getAccounts,
  changeShowRegisForm,
}: ConnectedProps<typeof connector>): ReactElement {
  const user = useUser().user;

  useEffect(() => {
    getAccounts(user.id);
  }, []);

  return (
    <Box width="100%">
      <Paper>
        <Box
          display="flex"
          padding="0.5rem"
          width="100%"
          justifyContent="flex-end"
        >
          <Button variant="contained" onClick={() => changeShowRegisForm(true)}>
            <Add /> Thêm tài khoản
          </Button>
        </Box>

        <Table>
          <TableHeader />
          <TableBody>
            {accounts.map((account) => (
              <TableItem key={`account#${account.id}`} account={account} />
            ))}
          </TableBody>
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
