import React, { createContext, useState, useContext } from 'react';
import { UserContextType, ProviderProps } from '../../utils/types';

const defaultValue: UserContextType = {
  user: {
    email: '',
  },
  setUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultValue);

export const UserProvider = ({ children }: ProviderProps) => {
  const [email, setEmail] = useState('');

  const setUser = (e: string) => {
    setEmail(e);
  };

  return (
    <UserContext.Provider
      value={{
        user: {
          email,
        },
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
