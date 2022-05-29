import { connect, ConnectedProps } from 'react-redux';
import { Route, Routes } from 'react-router';

import { ThemeProvider } from '@mui/material';

import AuthGuard from './components/AuthGuard/AuthGuard';
import Dashboard from './components/Dashboard/Dashboard';
import MasterDialog from './components/MasterDialog/MasterDialog';
import NotFound from './components/NotFound/NotFound';
import { ApplicationState } from './store';
import { theme as darkTheme } from './theme.dark';
import { theme as lightTheme } from './theme.light';

const themes = [lightTheme, darkTheme];

const connector = connect(
  (state: ApplicationState) => ({
    viewMode: state.app.viewMode,
  }),
  {},
);

function App({ viewMode }: ConnectedProps<typeof connector>) {
  return (
    <ThemeProvider theme={themes[viewMode]}>
      <MasterDialog />

      <Routes>
        <Route
          path="*"
          element={
            <>
              <AuthGuard />
              <Dashboard />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default connector(App);
