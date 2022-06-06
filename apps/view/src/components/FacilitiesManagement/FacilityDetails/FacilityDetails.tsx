import CustomScrollbar from '@/view/common/components/CustomScrollbar';
import { swrHookKeys } from '@/view/common/constants/swrHookKeys';
import { ISegmentProps } from '@/view/common/interfaces/Segment';
import styled from '@emotion/styled';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import {
  Button,
  Divider,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { ReactElement } from 'react';
import { useSWRConfig } from 'swr';
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
  overflow-y: auto;
`;

function FacilityDetails({ switchSegment }: ISegmentProps): ReactElement {
  const { mutate } = useSWRConfig();

  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            size="small"
            startIcon={<ArrowLeft />}
            onClick={() => {
              switchSegment(1);
              mutate(swrHookKeys.USE_FACILITIES);
            }}
          >
            quay lại danh sách
          </Button>

          <Typography variant="h6">Thông tin chi tiết</Typography>

          <Button
            size="small"
            endIcon={<ArrowRight />}
            onClick={() => {
              switchSegment(3);
            }}
          >
            xem giấy chứng nhận
          </Button>
        </Toolbar>

        <Divider />
        <DetailsContainer>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={7}>
              <FacilityInfo />
            </Grid>
          </Grid>
        </DetailsContainer>
      </Container>
    </Root>
  );
}

export default FacilityDetails;
