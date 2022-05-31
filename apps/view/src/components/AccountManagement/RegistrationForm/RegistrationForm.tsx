import { SyntheticEvent } from 'react';

import styled from '@emotion/styled';
import { ArrowLeft } from '@mui/icons-material';
import { Button, Divider, Paper, Toolbar, Typography } from '@mui/material';

import { ISegmentProps } from '../AccountManagement';
import Inputs from './Inputs/Inputs';
import Flexbox from '@/view/common/components/Flexbox';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
`;

const Container = styled(Paper)`
  width: 100%;
`;

const BtnContainer = styled(Flexbox)`
  justify-content: flex-end;
  padding: 1rem 2rem;
`;

function RegistrationForm({ switchSegment }: ISegmentProps) {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const { username, displayName, email, roleId } = target;

    console.log(username, displayName, email, roleId);
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

          <Typography variant="h6">Tạo tài khoản mới</Typography>
        </Toolbar>

        <form onSubmit={handleSubmit}>
          <Inputs />

          <br />

          <Divider />

          <BtnContainer>
            <Button variant="contained" size="small" type="submit">
              tạo tài khoản
            </Button>
          </BtnContainer>
        </form>
      </Container>
    </Root>
  );
}

export default RegistrationForm;
