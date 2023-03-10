import { createTheme } from '@shopify/restyle';

const palette = {
  blue: '#6294CD',
  green: '#62CDA6',
  red: '#F92A4C',
  lightgreen: 'rgba(73,217,140,0.25)',
  lightred: 'rgba(255,102,127,0.25)',
  lightBg: 'rgba(255,255,255,0.05)',
  gray: '#2A3B3B',
  darkred: '#DA5757',
  darkgray: '#707070',
  black_: '#0A0A0A',
  lightBlue: '#29B9DC',
  purple: '#ED62F6',
  white: '#DDDDDD',
  muted: '#B0B0B0',
  faint: '#151515',
  transparent: 'transparent',
  constant_white: '#ffffff',
  constant_black: '#000000',
  // light theme colors
  bgLight: '#ffffff',
  faintLight: '#F9F9F9',
};

export const theme = createTheme({
  colors: {
    background: palette.black_,
    foreground: palette.white,
    primary: palette.blue,
    success: palette.green,
    danger: palette.red,
    lightsuccess: palette.lightgreen,
    lightdanger: palette.lightred,
    dangerdark: palette.darkred,
    secondary: palette.gray,
    info: palette.lightBlue,
    light: palette.purple,
    muted: palette.muted,
    muteddark: palette.darkgray,
    faint: palette.faint,
    white: palette.constant_white,
    black: palette.constant_black,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 80,
  },
  textVariants: {
    bold: {
      color: 'foreground',
      fontWeight: '700',
    },
    medium: {
      color: 'foreground',
      fontWeight: '600',
    },
    regular: {
      color: 'foreground',
    },
  },
  breakpoints: {},
});

export type Theme = typeof theme;

export const lightTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.bgLight,
    faint: palette.faintLight,
    foreground: palette.black_,
  },
};

export default theme;
