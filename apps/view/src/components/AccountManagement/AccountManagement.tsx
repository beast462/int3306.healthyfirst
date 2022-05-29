import styled from '@emotion/styled';
import { ManageAccountsRounded } from '@mui/icons-material';
import { ReactElement } from 'react';
import { Navigations } from '../Navigations';
import AccountTable from './AccountTable/AccountTable';
import RegisterForm from './RegisterForm/RegisterForm1';
import RegistrationForm from './RegisterForm/RegistrationForm';

const Root = styled.div`
   width: 100%,
   display: flex,
`;

function AccountManagement(): ReactElement {
  return (
    <Root>
      <AccountTable />
      <RegistrationForm />
    </Root>
  );
}

export default AccountManagement;

Navigations.getInstance().registerNavigation('/account-management', {
  icon: <ManageAccountsRounded />,
  label: 'Quản lý tài khoản',
  childOf: null,
})(AccountManagement);
