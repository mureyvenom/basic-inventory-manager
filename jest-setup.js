import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { cleanup } from '@testing-library/react-native';

afterEach(cleanup);

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

jest.mock('@shopify/restyle', () => {
  const RealModule = jest.requireActual('@shopify/restyle');
  const RN = jest.requireActual('react-native');
  RealModule.createText = () => RN.Text;
  RealModule.createBox = () => RN.View;
  RealModule.createRestyleComponent = (f, c) => c || RN.View;
  return RealModule;
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
