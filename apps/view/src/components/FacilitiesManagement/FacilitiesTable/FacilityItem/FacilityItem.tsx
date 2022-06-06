import { ReactElement } from 'react';

import NowrapCell from '@/view/common/components/NowrapCell';
import { Grid, TableRow, Typography } from '@mui/material';
import { useFacilityTypes } from '@/view/hooks/useFacilityTypes';
import { FacilityDetails } from '@/view/common/types/Facility';
import {
  CheckCircleOutlineRounded,
  Info,
  NewReleases,
  PriorityHigh,
} from '@mui/icons-material';

interface IProps {
  facility: FacilityDetails;
  onClick: () => void;
}

function FacilityItem({ facility, onClick }: IProps): ReactElement {
  const { facilityTypes } = useFacilityTypes();

  const expiredDate = facility.expiredDate
    ? new Date(facility.expiredDate)
    : null;

  const show = (expiredDate, revoke): ReactElement => {
    let order = 0;
    let text = '';

    if (expiredDate === null && revoke === null) {
      text = 'Chưa cấp';
      order = 1;
    } else if (revoke === 1) {
      text = 'Đã thu hồi, chưa cấp mới';
      order = 2;
    } else if (expiredDate) {
      if (expiredDate < new Date()) {
        text = 'Hết hạn, chưa thu hồi';
        order = 3;
      } else {
        text = 'Còn hiệu lực';
        order = 4;
      }
    }

    return (
      <Grid container spacing={1}>
        <Grid item xs={2}>
          {order === 4 ? (
            <CheckCircleOutlineRounded color="success" />
          ) : order === 3 ? (
            <NewReleases color="error" />
          ) : order === 2 ? (
            <Info color="info" />
          ) : (
            <PriorityHigh color="warning" />
          )}
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body2" fontWeight="bold" mt="0.25rem" noWrap>
            {text}
          </Typography>
        </Grid>
      </Grid>
    );
  };

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
      <NowrapCell>{show(expiredDate, facility.revoked)}</NowrapCell>
    </TableRow>
  );
}

export default FacilityItem;
