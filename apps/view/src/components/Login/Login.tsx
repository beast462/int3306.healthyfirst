import { ReactElement } from 'react';
import { Navigations } from '../Navigations';

function Login(): ReactElement {
  return <>This is login</>;
}

Navigations.getInstance().registerNavigation('/login', null)(Login);
