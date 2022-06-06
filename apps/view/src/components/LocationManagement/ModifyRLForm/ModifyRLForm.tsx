import Flexbox from '@/view/common/components/Flexbox';
import styled from '@emotion/styled';
import { ArrowLeft } from '@mui/icons-material';
import { Button, Paper, Toolbar, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { ISegmentProps } from '../../AccountManagement';
import LocationSelector from '../../AccountManagement/RegistrationForm/Inputs/LocationSelector/LocationSelector';

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
const Row = styled(Flexbox)`
  padding: 1rem 2rem 0.5rem 2rem;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
`;

function ModifyRLForm({ switchSegment }: ISegmentProps): ReactElement {
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

          <Typography variant="h6">Phân vùng quản lý</Typography>
        </Toolbar>
        <Row>
          <LocationSelector selectedRoleId={0} />
        </Row>
      </Container>
    </Root>
  );
}

export default ModifyRLForm;
