import styled from '@emotion/styled';
import { ReactElement } from 'react';

import '../Overview';
import Contents from './Contents/Contents';
import Header from './Header/Header';
import Menu from './Menu/Menu';

const Root = styled.div`
  display: flex;
  display: flexbox;
  display: -ms-flexbox;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Body = styled.div`
  flex: 1;
`;

function Dashboard(): ReactElement {
  return (
    <Root>
      <Header />

      <Body>
        <Menu />
        <Contents />
      </Body>
    </Root>
  );
}

export default Dashboard;
