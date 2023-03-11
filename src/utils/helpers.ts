export const numberWithCommas = (x: number, decimals?: number) => {
  return x.toFixed(decimals || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const addAlpha = (color: string, opacity: number) => {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};

export const appConstants = () => {
  return {
    inventoryItemsKey: 'inventory-app-items',
    inventoryUserKey: 'inventory-app-user',
    inventorySettingsKey: 'inventory-app-settings',
  };
};

export const mockInventoryItems = [
  {
    date_created: '2023-03-11T02:27:30.776Z',
    description: 'Testing this out',
    last_modified: '2023-03-11T02:46:15.243Z',
    name: 'Testing this out',
    owner: 'holuwamurewa@gmail.com',
    price: 250,
    stock: 10,
  },
  {
    date_created: '2023-03-11T02:42:41.800Z',
    description: 'Second test',
    last_modified: '2023-03-11T02:48:05.826Z',
    name: 'Second test',
    owner: 'holuwamurewa@gmail.com',
    price: 1200,
    stock: 50,
  },
  {
    date_created: '2023-03-11T02:45:20.812Z',
    description: 'description',
    last_modified: '2023-03-11T02:45:20.812Z',
    name: 'Fourth entry',
    owner: 'holuwamurewa@gmail.com',
    price: 780,
    stock: 1000,
  },
];
