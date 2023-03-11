import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import {
  InventoryContextType,
  InventoryItem,
  ProviderProps,
} from '../../utils/types';
import Toast from 'react-native-toast-message';
import { useUserContext } from './user.provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appConstants } from '../../utils/helpers';

const defaultValue: InventoryContextType = {
  items: null,
  saveItems: () => {},
  addItem: () => false,
  deleteItem: () => {},
  updateItem: () => false,
  getItems: () => [],
};

export const InventoryContext =
  createContext<InventoryContextType>(defaultValue);

export const InventoryProvider = ({ children }: ProviderProps) => {
  const [items, setItems] = useState<InventoryItem[] | null>(null);
  const { user } = useUserContext();
  const { inventoryItemsKey } = appConstants();

  const saveItems = (e: InventoryItem[]) => {
    setItems(e);
  };

  const addItem = useCallback(
    (item: InventoryItem) => {
      const nameTaken = items!?.find(i => i.name === item.name);
      if (nameTaken) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Item name taken',
        });
        return false;
      }
      const newItems = [...items!, item];
      setItems(newItems);
      return true;
    },
    [items],
  );

  const updateItem = useCallback(
    (original: InventoryItem, replace: InventoryItem) => {
      const nameTaken = items!?.find(i => i.name === replace.name);
      const noNameChange = original.name === replace.name;
      if (nameTaken && !noNameChange) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Item name taken',
        });
        return false;
      }

      const newItems = [...items!];
      const itemIndex = newItems.findIndex(i => i.name === original.name);
      newItems[itemIndex].name = replace.name;
      newItems[itemIndex].price = replace.price;
      newItems[itemIndex].stock = replace.stock;
      newItems[itemIndex].description = replace.description;
      newItems[itemIndex].last_modified = replace.last_modified;
      setItems(newItems);
      return true;
    },
    [items],
  );

  const deleteItem = useCallback(
    (item: InventoryItem) => {
      const newItems = [...items!].filter(i => i.name !== item.name);
      setItems(newItems);
    },
    [items],
  );

  const getItems = useCallback(() => {
    return items!?.filter(i => i.owner === user.email) || [];
  }, [items, user]);

  useEffect(() => {
    const retrieveItems = async () => {
      const itemsExist = await AsyncStorage.getItem(inventoryItemsKey);
      if (itemsExist !== null) {
        setItems(JSON.parse(itemsExist));
      } else {
        setItems([]);
      }
    };

    retrieveItems();
  }, [inventoryItemsKey]);

  useEffect(() => {
    const update = async () => {
      if (items !== defaultValue.items) {
        await AsyncStorage.setItem(inventoryItemsKey, JSON.stringify(items));
      }
    };

    update();
  }, [items, inventoryItemsKey]);

  return (
    <InventoryContext.Provider
      value={{
        items,
        saveItems,
        addItem,
        deleteItem,
        getItems,
        updateItem,
      }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => useContext(InventoryContext);
