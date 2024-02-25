import { FC, isValidElement, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { Paths, RouteConditions } from '@/types/enums';

const { loggedOut, loggedIn } = RouteConditions;

interface Props extends PropsWithChildren {
  condition: RouteConditions;
}

const ConditionalRoute: FC<Props> = ({ children, condition }) => {
  const isLoggedIn = !!localStorage.getItem('token');

  if (
    !isValidElement(children) ||
    (condition === loggedOut && isLoggedIn) ||
    (condition === loggedIn && !isLoggedIn)
  ) {
    return <Navigate to={Paths.Home} />;
  }

  return children;
};

export default ConditionalRoute;
