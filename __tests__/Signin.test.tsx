import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemeProvider } from '@shopify/restyle';
import theme from '../src/utils/theme';
// import { render, fireEvent, act } from '@testing-library/react-native';
// import { MainStack } from '../src/utils/ParamList';
// import RootProvider from '../src/state/root.provider';
import Signin from '../src/screens/SigninScreen';
import { SettingsContext } from '../src/state/providers/settings.provider';
import { UserContext } from '../src/state/providers/user.provider';
import { InventoryContext } from '../src/state/providers/inventory.provider';
import { ProviderProps } from '../src/utils/types';

jest.useFakeTimers();

// let navigation: NativeStackNavigationProp<MainStack, 'Signin'>;

it('renders correctly', async () => {
  const RootProvider = ({ children }: ProviderProps) => {
    const darkmode = true;
    const toggleDarkMode = jest.fn();
    const addItem = jest.fn();
    const deleteItem = jest.fn();
    const getItems = jest.fn();
    const saveItems = jest.fn();
    const updateItem = jest.fn();
    const setUser = jest.fn();

    return (
      <SettingsContext.Provider
        value={{
          darkmode,
          toggleDarkMode,
        }}>
        <UserContext.Provider
          value={{
            setUser,
            user: {
              email: '',
            },
          }}>
          <InventoryContext.Provider
            value={{
              addItem,
              deleteItem,
              getItems,
              saveItems,
              updateItem,
              items: [],
            }}>
            {children}
          </InventoryContext.Provider>
        </UserContext.Provider>
      </SettingsContext.Provider>
    );
  };
  const tree = renderer
    .create(
      <RootProvider>
        <ThemeProvider theme={theme}>
          <Signin />
        </ThemeProvider>
      </RootProvider>,
    )
    .toJSON();
  await renderer.act(async () => expect(tree).toMatchSnapshot());
});
