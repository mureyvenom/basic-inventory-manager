import { ReactNode } from 'react';

export interface InventoryItem {
  name: string;
  stock: number;
  price: number;
  description: string;
  owner: string;
  date_created: string;
  last_modified: string;
}

export interface UserContextType {
  user: {
    email: string;
  };
  setUser: (e: string) => void;
}

export interface InventoryContextType {
  items: InventoryItem[] | null;
  saveItems: (items: InventoryItem[]) => void;
  addItem: (item: InventoryItem) => boolean;
  updateItem: (original: InventoryItem, replace: InventoryItem) => boolean;
  deleteItem: (item: InventoryItem) => void;
  getItems: () => InventoryItem[];
}

export interface SettingsContextType {
  darkmode: boolean;
  toggleDarkMode: () => void;
}

export interface ProviderProps {
  children: ReactNode;
}
