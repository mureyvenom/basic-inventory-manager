import { InventoryItem } from './types';

export type MainStack = {
  Signin: undefined;
  InventoryList: undefined;
  Inventory: {
    mode: 'add' | 'edit';
    inventory?: InventoryItem;
  };
};
