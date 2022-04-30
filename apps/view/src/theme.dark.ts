import { createTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { breakpoints } from './constants/breakpoints';

export const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[800],
      contrastText: '#ffffff',
    },
  },
  breakpoints,
});
