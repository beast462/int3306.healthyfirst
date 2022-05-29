import { Delete } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

interface AccountData {
  id: number;
  username: string;
  displayName: string;
  email: string;
  role: string;
  createdAt: string;
}

interface IProps {
  accounts: AccountData;
}

function TableItem({ accounts }: IProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <TableRow
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <TableCell>{accounts.id}</TableCell>
      <TableCell>{accounts.username}</TableCell>
      <TableCell>{accounts.displayName}</TableCell>
      <TableCell>{accounts.email}</TableCell>
      <TableCell>{accounts.role}</TableCell>
      <TableCell>{accounts.createdAt}</TableCell>
      <TableCell>
        <IconButton
          size="small"
          disabled={!showActions}
          style={{ width: '34px', height: '34px' }}
          color="error"
          // onClick={() => {
          //   setConfirmCallback((result) => {
          //     console.log(result);
          //   });
          //   openDialog(FORM_INDEX);
          // }}
        >
          {showActions && <Delete />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableItem;
