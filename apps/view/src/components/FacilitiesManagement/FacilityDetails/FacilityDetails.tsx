import { ISegmentProps } from '@/view/common/interfaces/Segment';
import styled from '@emotion/styled';
import { ArrowLeft } from '@mui/icons-material';
import { Button, Paper, Toolbar, Typography } from '@mui/material';
import { ReactElement } from 'react';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
`;

const Container = styled(Paper)`
  width: 100%;
`;

function FacilityDetails({ switchSegment }: ISegmentProps): ReactElement {
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
      </Container>
    </Root>
  );
}

export default FacilityDetails;
