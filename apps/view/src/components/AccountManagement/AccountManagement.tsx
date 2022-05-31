import { ReactElement, useState } from 'react';

import Flexbox from '@/view/common/components/Flexbox';
import styled from '@emotion/styled';
import { ManageAccountsRounded } from '@mui/icons-material';

import { Navigations } from '../Navigations';
import AccountsTable from './AccountsTable/AccountsTable';
import RegistrationForm from './RegistrationForm/RegistrationForm';

export interface ISegmentProps {
  switchSegment: () => void;
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled(Flexbox)`
  width: 200%;
  height: 100%;
  overflow: hidden;
  transition: margin 0.2s ease-out;

  &.next {
    margin-left: -100%;
  }
`;

const Segment = styled.div`
  height: 100%;
  width: 50%;
  overflow: hidden;
`;

function AccountManagement(): ReactElement {
  const [viewingSegment, setViewingSegment] = useState(1);

  return (
    <Root>
      <Content className={viewingSegment === 0 ? '' : 'next'}>
        <Segment>
          <AccountsTable switchSegment={() => setViewingSegment(1)} />
        </Segment>

        <Segment>
          <RegistrationForm switchSegment={() => setViewingSegment(0)} />
        </Segment>
      </Content>
    </Root>
  );
}

export default AccountManagement;

Navigations.getInstance().registerNavigation('/account-management', {
  icon: <ManageAccountsRounded />,
  label: 'Quản lý tài khoản',
  childOf: null,
})(AccountManagement);
