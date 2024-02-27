import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { UserAuth } from '@/types/interfaces';

type AuthContextType = {
  user: UserAuth;
  setUser: (value: UserAuth) => void;
};

const initialUser: UserAuth = {
  isLoggedIn: null,
  username: '',
};

const AuthContext = createContext<AuthContextType>({
  user: initialUser,
  setUser: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserAuth>(initialUser);
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
