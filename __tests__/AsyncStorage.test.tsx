import 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

beforeEach(() => AsyncStorage.clear());

describe('Testing async storage CRUD actions', () => {
  it('Can read and write', async () => {
    await AsyncStorage.setItem('testItem', 'testValue');
    const value = await AsyncStorage.getItem('testItem');

    expect(value).toBe('testValue');
  });

  it('Can update', async () => {
    await AsyncStorage.setItem('testItem', 'testValue');
    expect(await AsyncStorage.getItem('testItem')).toBe('testValue');
    await AsyncStorage.setItem('testItem', 'testValue2');
    const value = await AsyncStorage.getItem('testItem');

    expect(value).toBe('testValue2');
  });

  it('Can delete', async () => {
    await AsyncStorage.setItem('testItem', 'testValue');
    expect(await AsyncStorage.getItem('testItem')).toBe('testValue');
    await AsyncStorage.removeItem('testItem');
    const value = await AsyncStorage.getItem('testItem');

    expect(value).toBe(null);
  });
});
