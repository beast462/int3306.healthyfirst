import { ReactElement } from 'react';

import NowrapCell from '@/view/common/components/NowrapCell';
import { TableRow } from '@mui/material';

interface IProps {
  facility: {
    id: number;
    facilityName: string;
    ownerName: string;
    address: string;
    facilityType: string;
  };
  onClick: () => void;
}

function FacilityItem({ facility, onClick }: IProps): ReactElement {
  return (
    <TableRow onClick={onClick} hover>
      <NowrapCell>{facility.id}</NowrapCell>
      <NowrapCell>{facility.facilityName}</NowrapCell>
      <NowrapCell>{facility.ownerName}</NowrapCell>
      <NowrapCell>{facility.address}</NowrapCell>
      <NowrapCell>{facility.facilityType}</NowrapCell>
    </TableRow>
  );
}

export default FacilityItem;
