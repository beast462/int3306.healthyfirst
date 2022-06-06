import styled from '@emotion/styled';
import { ArrowLeft } from '@mui/icons-material';
import { Button, Paper, Toolbar, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { ISegmentProps } from '../../AccountManagement';

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

function CertificateManagement({ switchSegment }: ISegmentProps): ReactElement {
  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            size="small"
            startIcon={<ArrowLeft />}
            onClick={() => {
              switchSegment();
            }}
          >
            quay lại danh sách
          </Button>

          <Typography variant="h6">Giấy chứng nhận</Typography>
        </Toolbar>
      </Container>
    </Root>
  );
}

export default CertificateManagement;
