import { createTheme } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { breakpoints } from './constants/breakpoints';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5048e5',
      dark: '#3832A0',
      contrastText: '#ffffff',
    },
  },
  breakpoints,
});
