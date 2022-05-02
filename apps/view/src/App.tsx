import { ThemeProvider } from '@mui/material';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Routes } from 'react-router';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import { ApplicationState } from './store';
import { theme as lightTheme } from './theme.light';
import { theme as darkTheme } from './theme.dark';
import { useUser } from './hooks/useUser';
import { setUser as _setUser } from './store/actions/app/setUser';
import { useEffect } from 'react';

const themes = [lightTheme, darkTheme];

const connector = connect(
  (state: ApplicationState) => ({
    viewMode: state.app.viewMode,
    storedUser: state.app.user,
  }),
  {
    setUser: _setUser,
  },
);

function App({
  viewMode,
  storedUser,
  setUser,
}: ConnectedProps<typeof connector>) {
  const { user, isLoading, isError } = useUser();

  useEffect(() => {
    if (isLoading && storedUser) setUser(null);
    if (isError && storedUser) setUser(null);

    storedUser !== user && setUser(user);
  }, [isLoading, isError]);

  return (
    <ThemeProvider theme={themes[viewMode]}>
      <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default connector(App);
