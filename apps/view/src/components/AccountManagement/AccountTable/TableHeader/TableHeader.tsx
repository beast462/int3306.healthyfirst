import { ApplicationState } from '@/view/store';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { connect, ConnectedProps } from 'react-redux';

const props = ['id', 'username', 'displayName', 'email', 'role', 'createdAt'];
const propLabels = {
  id: 'ID',
  username: 'Tên đăng nhập',
  displayName: 'Họ và tên',
  email: 'Email',
  role: 'Vai trò',
  createdAt: 'Thời gian tạo',
};

const connector = connect(
  (state: ApplicationState) => ({
    order: state.accountsTable.order,
    orderBy: state.accountsTable.orderBy,
  }),
  {},
);

function TableHeader({ order, orderBy }: ConnectedProps<typeof connector>) {
  return (
    <TableHead>
      <TableRow>
        {props.map((prop) => (
          <TableCell
            key={`head.${prop}`}
            align="left"
            padding="normal"
            sortDirection={orderBy === prop ? order : false}
          >
            <TableSortLabel
              active={orderBy === prop}
              direction={orderBy === prop ? order : 'asc'}
            >
              {propLabels[prop]}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default connector(TableHeader);
