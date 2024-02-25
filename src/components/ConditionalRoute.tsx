import { FC, isValidElement, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';
import { Paths, RouteConditions } from '@/types/enums';

const { loggedOut, loggedIn } = RouteConditions;

interface Props extends PropsWithChildren {
  condition: RouteConditions;
}

const ConditionalRoute: FC<Props> = ({ children, condition }) => {
  const { user } = useAuth();

  if (
    !isValidElement(children) ||
    (condition === loggedOut && user.isLoggedIn) ||
    (condition === loggedIn && !user.isLoggedIn)
  ) {
    return <Navigate to={Paths.Home} />;
  }

  return children;
};

export default ConditionalRoute;
