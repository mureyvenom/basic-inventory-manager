/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from '@shopify/restyle';
import React, { useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import MainStack from './src/navigators/MainStack';
import { useSettingsContext } from './src/state/providers/settings.provider';
import RootProvider from './src/state/root.provider';
import theme, { lightTheme, Theme } from './src/utils/theme';
import Toast from 'react-native-toast-message';

/* istanbul ignore next */
const RootNav = () => {
  const navigationRef = useRef(null);
  const themex = useTheme<Theme>();
  const { background } = themex.colors;
  const { darkmode } = useSettingsContext();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: background,
        },
      }}
      ref={navigationRef}>
      <StatusBar
        barStyle={
          Platform.OS === 'android'
            ? darkmode
              ? 'light-content'
              : 'dark-content'
            : 'light-content'
        }
        backgroundColor={background}
      />
      <MainStack />
    </NavigationContainer>
  );
};

/* istanbul ignore next */
const ThemeHandler = () => {
  const { darkmode } = useSettingsContext();

  return (
    <ThemeProvider theme={darkmode ? theme : lightTheme}>
      <RootNav />
      <Toast />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <RootProvider>
      <ThemeHandler />
    </RootProvider>
  );
};

export default App;
