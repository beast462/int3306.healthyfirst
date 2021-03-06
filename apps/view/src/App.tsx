import { ThemeProvider } from '@mui/material';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Routes } from 'react-router';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import { ApplicationState } from './store';
import { theme as lightTheme } from './theme.light';
import { theme as darkTheme } from './theme.dark';
import AuthGuard from './components/AuthGuard/AuthGuard';

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
