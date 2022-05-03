import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useUser } from '../../hooks/useUser';

function AuthGuard(): ReactElement {
  const { user, isLoading, error } = useUser();
  const location = useLocation();

  if (!isLoading && error && !location.pathname.match(/^\/login(\/)?$/))
    return <Navigate to="/login" />;

  if (!isLoading && !error && user && location.pathname.match(/^\/login(\/)?$/))
    return <Navigate to="/" />;

  return null;
}

export default AuthGuard;
