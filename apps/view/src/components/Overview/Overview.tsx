import { Info } from '@mui/icons-material';
import { ReactElement } from 'react';
import { Navigations } from '../Navigations';

function Overview(): ReactElement {
  return <>abcdeffwfhwrhfwihgwhrwughiuwrhgwhgui</>;
}

Navigations.getInstance().registerNavigation('/overview', {
  icon: <Info />,
  label: 'Overview',
  childOf: null,
})(Overview);
