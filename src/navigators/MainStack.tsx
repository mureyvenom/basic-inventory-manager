import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStack as MainStackType } from '../utils/ParamList';
import SigninScreen from '../screens/SigninScreen';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../utils/theme';

const Stack = createNativeStackNavigator<MainStackType>();

const MainStack = () => {
  const theme = useTheme<Theme>();
  const { background, foreground } = theme.colors;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: background,
        },
        headerTitleStyle: {
          color: foreground,
        },
      }}>
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
