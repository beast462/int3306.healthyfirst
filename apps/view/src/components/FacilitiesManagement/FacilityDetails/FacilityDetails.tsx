import CustomScrollbar from '@/view/common/components/CustomScrollbar';
import { ISegmentProps } from '@/view/common/interfaces/Segment';
import styled from '@emotion/styled';
import { ArrowLeft } from '@mui/icons-material';
import { Button, Grid, Paper, Theme, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactElement } from 'react';
import FacilityInfo from './FacilityInfo/FacilityInfo';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
`;

const Container = styled(Paper)`
  width: 100%;
  height: 100%;
`;

const DetailsContainer = styled(CustomScrollbar)`
  box-sizing: border-box;
  height: 100%;
  margin: 0 1rem;
`;

const useStyles = makeStyles((theme: Theme) => ({}));

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
            onClick={() => switchSegment(0)}
          >
            quay lại danh sách
          </Button>

          <Typography variant="h6">Thông tin chi tiết</Typography>
        </Toolbar>

        <DetailsContainer>
          <Grid container spacing={2}>
            <Grid item md={12} lg={7}>
              <FacilityInfo />
            </Grid>
          </Grid>
        </DetailsContainer>
      </Container>
    </Root>
  );
}

export default FacilityDetails;
