import React, { ReactNode } from 'react';
import { UserProvider } from './providers/user.provider';
import { InventoryProvider } from './providers/inventory.provider';
import { SettingsProvider } from './providers/settings.provider';

type Props = {
  children: ReactNode;
};

const RootProvider = ({ children }: Props) => {
  return (
    <SettingsProvider>
      <UserProvider>
        <InventoryProvider>{children}</InventoryProvider>
      </UserProvider>
    </SettingsProvider>
  );
};

export default RootProvider;
