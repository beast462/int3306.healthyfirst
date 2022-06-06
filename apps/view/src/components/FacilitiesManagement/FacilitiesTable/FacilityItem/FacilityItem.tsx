import { ReactElement } from 'react';

import NowrapCell from '@/view/common/components/NowrapCell';
import { TableRow } from '@mui/material';
import { useFacilityTypes } from '@/view/hooks/useFacilityTypes';
import { FacilityDetails } from '@/view/common/types/Facility';

interface IProps {
  facility: FacilityDetails;
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
      <NowrapCell>
        {facilityTypes
          ? facilityTypes[facility.facilityTypeId - 1].name
          : 'Đang tải'}
      </NowrapCell>
      <NowrapCell>
        {facility.expiredDate
          ? new Date(facility.expiredDate).toLocaleDateString()
          : 'Chưa cấp'}
      </NowrapCell>
    </TableRow>
  );
}

export default FacilityItem;
