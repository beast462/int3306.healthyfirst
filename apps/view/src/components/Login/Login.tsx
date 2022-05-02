import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { Navigations } from '../Navigations';

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  display: flexbox;
  display: -ms-flexbox;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
`;

const RootPaper = styled(Paper)`
  padding: 1rem;
`;

function Login(): ReactElement {
  return (
    <Root>
      <RootPaper>
        <Typography variant="h5">Đăng nhập</Typography>
        <Typography>
          Hệ thống thông tin &middot; Cục an toàn vệ sinh thực phẩm
        </Typography>
      </RootPaper>
    </Root>
  );
}

Navigations.getInstance().registerNavigation('/login', null)(Login);
