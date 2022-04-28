import { ReactElement } from 'react';
import { useUser } from '../../hooks/useUser';

interface IProps {
  children?: ReactElement | ReactElement[];
  userShouldExist: boolean;
  fallback: ReactElement;
}

function AuthGuard({
  children,
  userShouldExist,
  fallback,
}: IProps): ReactElement {
  const { user } = useUser();

  if (userShouldExist && !user) return fallback;
  if (!userShouldExist && user) return fallback;

  return <>{children}</>;
}

export default AuthGuard;
