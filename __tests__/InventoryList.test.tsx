import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemeProvider } from '@shopify/restyle';
import theme from '../src/utils/theme';
import { render, fireEvent, act, screen } from '@testing-library/react-native';
import { MainStack } from '../src/utils/ParamList';
// import RootProvider from '../src/state/root.provider';
import InventoryList from '../src/screens/InventoryListScreen';
import { SettingsContext } from '../src/state/providers/settings.provider';
import { UserContext } from '../src/state/providers/user.provider';
import { InventoryContext } from '../src/state/providers/inventory.provider';
import { ProviderProps } from '../src/utils/types';
import { mockInventoryItems } from '../src/utils/helpers';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from '../src/navigators/MainStack';

// jest.useFakeTimers();
// afterEach(cleanup);

let navigation: NativeStackNavigationProp<MainStack, 'InventoryList'>;

describe('Testing the inventory list screen', () => {
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
            <InventoryList navigation={navigation} />
          </ThemeProvider>
        </RootProvider>,
      )
      .toJSON();
    await renderer.act(async () => expect(tree).toMatchSnapshot());
  });

  it('Renders inventory items and navigates to inventory screen when item pressed', async () => {
    const renderedComponent = render(
      <RootProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </RootProvider>,
    );

    const inventoryItems = renderedComponent.getAllByTestId('inventory-item');
    expect(inventoryItems.length).toBeGreaterThan(0);

    await act(async () => fireEvent.press(inventoryItems[0]));
    screen.getByTestId('Delete');
  });
});
