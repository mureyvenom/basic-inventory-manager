import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStack as MainStackType } from '../utils/ParamList';
import SigninScreen from '../screens/SigninScreen';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../utils/theme';
import InventoryListScreen from '../screens/InventoryListScreen';
import { useUserContext } from '../state/providers/user.provider';
import InventoryScreen from '../screens/InventoryScreen';

const Stack = createNativeStackNavigator<MainStackType>();

const MainStack = () => {
  const theme = useTheme<Theme>();
  const { background, foreground } = theme.colors;
  const { user } = useUserContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: background,
        },
        headerTitleStyle: {
          color: foreground,
        },
        headerBackTitleVisible: false,
        headerTintColor: foreground,
      }}>
      {!user.email ? (
        <Stack.Screen
          name="Signin"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="InventoryList"
            component={InventoryListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Inventory"
            component={InventoryScreen}
            // options={{ headerTitle: () => null }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
