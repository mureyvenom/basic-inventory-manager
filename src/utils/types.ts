import { ReactNode } from 'react';

export interface InventoryItem {
  name: string;
  stock: number;
  price: number;
  description: string;
  owner: string;
}

export interface UserContextType {
  user: {
    email: string;
  };
  setUser: (e: string) => void;
}

export interface InventoryContextType {
  items: InventoryItem[];
  saveItems: (items: InventoryItem[]) => void;
}

export interface SettingsContextType {
  darkmode: boolean;
  toggleDarkMode: () => void;
}

export interface ProviderProps {
  children: ReactNode;
}
