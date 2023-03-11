import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemeProvider } from '@shopify/restyle';
import theme from '../src/utils/theme';
import { render, fireEvent, act } from '@testing-library/react-native';
import { MainStack } from '../src/utils/ParamList';
import InventoryScreen from '../src/screens/InventoryScreen';
import { RouteProp } from '@react-navigation/native';
import { SettingsContext } from '../src/state/providers/settings.provider';
import { UserContext } from '../src/state/providers/user.provider';
import { InventoryContext } from '../src/state/providers/inventory.provider';
import { ProviderProps } from '../src/utils/types';
import { mockInventoryItems } from '../src/utils/helpers';

jest.useFakeTimers();

let navigation: NativeStackNavigationProp<MainStack, 'Inventory'>;
let route: RouteProp<MainStack, 'Inventory'>;

describe('Testing the inventory screen', () => {
  const RootProvider = ({ children }: ProviderProps) => {
    const darkmode = true;
    const toggleDarkMode = jest.fn();
    const addItem = jest.fn();
    const deleteItem = jest.fn();
    const getItems = () => mockInventoryItems;
    const saveItems = jest.fn();
    const updateItem = jest.fn();
    const setUser = (_: string) => {};

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
              email: 'holuwamurewa@gmail.com',
            },
          }}>
          <InventoryContext.Provider
            value={{
              addItem,
              deleteItem,
              getItems,
              saveItems,
              updateItem,
              items: mockInventoryItems,
            }}>
            {children}
          </InventoryContext.Provider>
        </UserContext.Provider>
      </SettingsContext.Provider>
    );
  };

  it('Create a snapshot of the screen', async () => {
    const tree = renderer
      .create(
        <RootProvider>
          <ThemeProvider theme={theme}>
            <InventoryScreen
              navigation={navigation}
              route={{
                ...route,
                params: {
                  mode: 'add',
                },
              }}
            />
          </ThemeProvider>
        </RootProvider>,
      )
      .toJSON();

    await renderer.act(async () => expect(tree).toMatchSnapshot());
  });

  it('Shows the confirmation modal when trying to delete item', async () => {
    const renderedComponent = render(
      <RootProvider>
        <ThemeProvider theme={theme}>
          <InventoryScreen
            navigation={navigation}
            route={{
              ...route,
              params: {
                mode: 'edit',
                item: mockInventoryItems[0],
              },
            }}
          />
        </ThemeProvider>
      </RootProvider>,
    );

    const deleteButton = renderedComponent.getByTestId('Delete');

    await act(async () => fireEvent.press(deleteButton));
    renderedComponent.getByTestId('confirmation-modal');
  });
});
