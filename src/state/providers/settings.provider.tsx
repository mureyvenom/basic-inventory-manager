import React, { createContext, useState, useContext, useEffect } from 'react';
import { SettingsContextType, ProviderProps } from '../../utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appConstants } from '../../utils/helpers';

const defaultValue: SettingsContextType = {
  darkmode: true,
  toggleDarkMode: () => {},
};

export const SettingsContext = createContext<SettingsContextType>(defaultValue);

export const SettingsProvider = ({ children }: ProviderProps) => {
  const [darkmode, setDarkMode] = useState(true);
  const { inventorySettingsKey } = appConstants();

  useEffect(() => {
    const retrieveSettings = async () => {
      const itemsExist = await AsyncStorage.getItem(inventorySettingsKey);
      if (itemsExist !== null) {
        setDarkMode(Boolean(itemsExist));
      }
    };

    retrieveSettings();
  }, [inventorySettingsKey]);

  useEffect(() => {
    const update = async () => {
      if (darkmode !== defaultValue.darkmode) {
        await AsyncStorage.setItem(
          inventorySettingsKey,
          JSON.stringify(darkmode),
        );
      }
    };

    update();
  }, [darkmode, inventorySettingsKey]);

  return (
    <SettingsContext.Provider
      value={{
        darkmode,
        toggleDarkMode: () => setDarkMode(prevState => !prevState),
      }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
