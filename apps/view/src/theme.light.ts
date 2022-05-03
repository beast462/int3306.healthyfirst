import { createTheme } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { breakpoints } from './constants/breakpoints';

export const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[500],
      contrastText: '#ffffff',
    },
  },
  breakpoints,
});
