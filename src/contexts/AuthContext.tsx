import React, { useContext } from 'react';

import { UserAuth } from '@/types/interfaces';

type AuthContextType = {
  user: UserAuth;
  setUser: (value: { isLoggedIn: boolean; username: string }) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: {
    isLoggedIn: false,
    username: '',
  },
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);
