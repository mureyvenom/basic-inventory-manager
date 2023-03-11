import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Switch } from 'react-native';
import Box from '../components/Box';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';
import InventoryItem from '../components/InventoryItem';
import Text from '../components/Text';
import { useInventoryContext } from '../state/providers/inventory.provider';
import { useSettingsContext } from '../state/providers/settings.provider';
import { useUserContext } from '../state/providers/user.provider';
import { MainStack } from '../utils/ParamList';

interface Props {
  navigation: NativeStackNavigationProp<MainStack, 'InventoryList'>;
}

const InventoryListScreen = ({ navigation }: Props) => {
  const { getItems } = useInventoryContext();
  const { user, setUser } = useUserContext();
  const [signoutAlert, setSignoutAlert] = useState(false);
  const { darkmode, toggleDarkMode } = useSettingsContext();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} justifyContent="space-between">
        <Box
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="l"
          justifyContent="space-between"
          marginTop="l">
          <Box marginRight="l" flexDirection="row" alignItems="center">
            <Box>
              <Button
                displayText={'Add Item'}
                onPress={() =>
                  navigation.navigate('Inventory', {
                    mode: 'add',
                  })
                }
              />
            </Box>
          </Box>
          <Box alignItems="center">
            <Text variant="regular">Dark Mode</Text>
            <Switch value={darkmode} onValueChange={() => toggleDarkMode()} />
          </Box>
        </Box>
        <Box paddingHorizontal="l" marginTop="s">
          <Text variant="regular">Items Count: {getItems()?.length || 0}</Text>
        </Box>
        <Box flex={1} marginVertical="m" paddingHorizontal="l">
          <ScrollView>
            {getItems()
              .sort(
                (a, b) =>
                  new Date(b.last_modified).getTime() -
                  new Date(a.last_modified).getTime(),
              )
              .map(i => (
                <InventoryItem
                  key={i.date_created}
                  item={i}
                  navigation={navigation}
                />
              ))}
          </ScrollView>
        </Box>
        <Box height={90} paddingHorizontal="l" justifyContent="center">
          <Button
            displayText={`Sign out of ${user.email}`}
            buttonProps={{ backgroundColor: 'danger' }}
            onPress={() => setSignoutAlert(true)}
          />
        </Box>
      </Box>
      <ConfirmModal
        visible={signoutAlert}
        closeModal={() => setSignoutAlert(false)}
        title="Are you sure you want to sign out?"
        confirmAction={() => setUser('')}
      />
    </SafeAreaView>
  );
};

export default InventoryListScreen;
