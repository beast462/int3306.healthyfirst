import '../Overview';
import '../Login';
import '../AccountManagement';

import { ReactElement } from 'react';

import Flexbox from '@/view/common/components/Flexbox';
import styled from '@emotion/styled';

import Contents from './Contents/Contents';
import Header from './Header/Header';
import Menu from './Menu/Menu';

const Root = styled(Flexbox)`
  flex-direction: row;
  -ms-flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Body = styled(Flexbox)`
  flex: 1;
  flex-direction: column;
  -ms-flex-direction: column;
  overflow: hidden;
`;

function Dashboard(): ReactElement {
  return (
    <Root>
      <Menu />
      <Body>
        <Header />
        <Contents />
      </Body>
    </Root>
  );
}

export default Dashboard;
