import { ApplicationState } from '@/view/store';
import { TableHead, TableRow } from '@mui/material';
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
      <TableRow>weqeqweqweqeqweqweqweqweqeqwewwwwwwwwwwwwwwwwww</TableRow>
    </TableHead>
  );
}

export default connector(TableHeader);
