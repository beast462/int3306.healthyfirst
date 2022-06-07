import NowrapCell from '@/view/common/components/NowrapCell';
import { Plan } from '@/view/common/types/Plan';
import { TableRow } from '@mui/material';

interface IProps {
  plan?: Plan;
  onClick: () => void;
}

function stringifyDate(dateString: string): string {
  const date = new Date(Date.parse(dateString));

  return `${date.getDate()} Tháng ${
    date.getMonth() + 1
  }, ${date.getFullYear()}`;
}

function PlanItem({ plan, onClick }: IProps) {
  return (
    <TableRow onClick={onClick} hover>
      <NowrapCell>{plan?.planId}</NowrapCell>
      <NowrapCell>{plan?.id}</NowrapCell>
      <NowrapCell>{plan?.name}</NowrapCell>
      <NowrapCell>{plan?.ownerName}</NowrapCell>
      <NowrapCell>{plan?.address}</NowrapCell>
      <NowrapCell>
        {stringifyDate(plan?.createdAt as unknown as string)}
      </NowrapCell>
      <NowrapCell>
        {stringifyDate(plan?.checkedAt as unknown as string)}
      </NowrapCell>
    </TableRow>
  );
}

export default PlanItem;
