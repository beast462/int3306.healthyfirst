import styled from '@emotion/styled';
import { ManageAccountsRounded } from '@mui/icons-material';
import {
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { Navigations } from '../Navigations';
import RegisterForm from './RegisterForm/RegisterForm';

const Root = styled.div`
   width: 100%,
   display: flex,
`;

function AccountManagement(): ReactElement {
  return (
    <Root>
      <RegisterForm />
    </Root>
  );
}

export default AccountManagement;

Navigations.getInstance().registerNavigation('/account-management', {
  icon: <ManageAccountsRounded />,
  label: 'Manage Account',
  childOf: null,
})(AccountManagement);
