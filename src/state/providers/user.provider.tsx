import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { appConstants } from '../../utils/helpers';
import { UserContextType, ProviderProps } from '../../utils/types';

const defaultValue: UserContextType = {
  user: {
    email: '',
  },
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);

export const UserProvider = ({ children }: ProviderProps) => {
  const [email, setEmail] = useState('');
  const { inventoryUserKey } = appConstants();

  const setUser = (e: string) => {
    setEmail(e);
  };

  useEffect(() => {
    const retrieveUser = async () => {
      const itemsExist = await AsyncStorage.getItem(inventoryUserKey);
      if (itemsExist !== null) {
        setEmail(itemsExist);
      }
    };

    retrieveUser();
  }, [inventoryUserKey]);

  useEffect(() => {
    const update = async () => {
      await AsyncStorage.setItem(inventoryUserKey, email);
    };

    update();
  }, [email, inventoryUserKey]);

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
