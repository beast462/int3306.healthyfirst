import { PublicUser } from '@/common/models/public-user';
import NowrapCell from '@/view/common/components/NowrapCell';
import { TableRow } from '@mui/material';

interface IProps {
  account: PublicUser;
}

function stringifyDate(dateString: string): string {
  const date = new Date(Date.parse(dateString));

  return `${date.getDate()} Tháng ${
    date.getMonth() + 1
  } ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

function AccountItem({ account }: IProps) {
  return (
    <TableRow>
      <NowrapCell>{account.id}</NowrapCell>
      <NowrapCell>{account.username}</NowrapCell>
      <NowrapCell>{account.displayName}</NowrapCell>
      <NowrapCell>{account.email}</NowrapCell>
      <NowrapCell>{account.role.description}</NowrapCell>
      <NowrapCell>
        {stringifyDate(account.createdAt as unknown as string)}
      </NowrapCell>
    </TableRow>
  );
}

export default AccountItem;
