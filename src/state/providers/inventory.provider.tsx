import React, { createContext, useState, useContext } from 'react';
import {
  InventoryContextType,
  InventoryItem,
  ProviderProps,
} from '../../utils/types';

const defaultValue: InventoryContextType = {
  items: [],
  saveItems: () => {},
};

const InventoryContext = createContext<InventoryContextType>(defaultValue);

export const InventoryProvider = ({ children }: ProviderProps) => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  const saveItems = (e: InventoryItem[]) => {
    setItems(e);
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        saveItems,
      }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => useContext(InventoryContext);
