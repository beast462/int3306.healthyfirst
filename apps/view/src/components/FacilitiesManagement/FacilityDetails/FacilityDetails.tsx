import { ISegmentProps } from '@/view/common/interfaces/Segment';
import styled from '@emotion/styled';
import { ArrowLeft } from '@mui/icons-material';
import {
  Button,
  Divider,
  Grid,
  Paper,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactElement } from 'react';
import FacilityImages from './FacilityImages/FacilityImages';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.5rem;
`;

const Container = styled(Paper)`
  width: 100%;
  height: 100%;
`;

const useStyles = makeStyles((theme: Theme) => ({
  details: {
    width: '100%',
    margin: '0 auto',
  },
}));

function FacilityDetails({ switchSegment }: ISegmentProps): ReactElement {
  const styles = useStyles();
  // This is a mock data for testing UI
  const facilityDetails = {
    id: '1',
    facilityName: 'Phở 10 Lý Quốc Sư',
    ownerName: 'Phạm Ngọc Lân',
    phone: '0562470562',
    address: '10 Phố Lý Quốc Sư, Hàng Trống, Hoàn Kiếm, Hà Nội',
    facilityType: 'Cơ sở kinh doanh dịch vụ ăn uống',
    certificateCode: 'Số hiệu 3123',
    certificateStatus: 'Còn hiệu lực đến ngày 01/01/2023',
  };

  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            size="small"
            startIcon={<ArrowLeft />}
            onClick={switchSegment}
          >
            quay lại danh sách
          </Button>

          <Typography variant="h6">Thông tin chi tiết</Typography>
        </Toolbar>
        <Divider />

        <Grid container spacing={1} className={styles.details}>
          <Grid item xs={6}>
            <FacilityImages />
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
}

export default FacilityDetails;
