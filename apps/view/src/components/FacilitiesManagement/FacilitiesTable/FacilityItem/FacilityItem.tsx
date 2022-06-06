import { ReactElement } from 'react';

import NowrapCell from '@/view/common/components/NowrapCell';
import { TableRow } from '@mui/material';
import { FacilityEntity } from '@/common/entities/facility.entity';
import { useFacilityTypes } from '@/view/hooks/useFacilityTypes';

interface IProps {
  facility: FacilityEntity;
  onClick: () => void;
}

function FacilityItem({ facility, onClick }: IProps): ReactElement {
  const { facilityTypes } = useFacilityTypes();

  return (
    <TableRow onClick={onClick} hover sx={{ cursor: 'pointer' }}>
      <NowrapCell>{facility.id}</NowrapCell>
      <NowrapCell>{facility.name}</NowrapCell>
      <NowrapCell>{facility.ownerName}</NowrapCell>
      <NowrapCell>{facility.address}</NowrapCell>
      <NowrapCell>{facilityTypes[facility.facilityTypeId - 1].name}</NowrapCell>
    </TableRow>
  );
}

export default FacilityItem;
