import React, { createContext, useState, useContext } from 'react';
import { SettingsContextType, ProviderProps } from '../../utils/types';

const defaultValue: SettingsContextType = {
  darkmode: true,
  toggleDarkMode: () => {},
};

const SettingsContext = createContext<SettingsContextType>(defaultValue);

export const SettingsProvider = ({ children }: ProviderProps) => {
  const [darkmode, setDarkMode] = useState(true);

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
