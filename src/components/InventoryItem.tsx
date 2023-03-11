import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { addAlpha, numberWithCommas } from '../utils/helpers';
import { MainStack } from '../utils/ParamList';
import { Theme } from '../utils/theme';
import { InventoryItem as InventoryItemType } from '../utils/types';
import Box from './Box';
import Text from './Text';

interface Props {
  item: InventoryItemType;
}

const InventoryItem = ({ item }: Props) => {
  const theme = useTheme<Theme>();
  const { foreground } = theme.colors;
  const navigation = useNavigation<NativeStackNavigationProp<MainStack, any>>();

  return (
    <Box marginBottom="m">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Inventory', {
            mode: 'edit',
            item,
          })
        }>
        <Box
          borderBottomColor="muted"
          borderBottomWidth={1}
          flexDirection="row"
          padding="m"
          justifyContent="space-between"
          alignItems="center"
          style={{
            backgroundColor: addAlpha(foreground, 0.1),
          }}>
          <Box flex={1} marginRight="l">
            <Box>
              <Box marginBottom="l">
                <Text variant="bold" fontSize={16} marginBottom="s">
                  {item.name.length > 35
                    ? item.name.substring(0, 35) + '...'
                    : item.name}
                </Text>
                <Text variant="regular">
                  Price: {numberWithCommas(item.price)}
                </Text>
                <Text variant="regular">
                  Stock: {numberWithCommas(item.stock)}
                </Text>
              </Box>
              <Text variant="regular" fontSize={10}>
                Last Modified: {new Date(item.last_modified).toDateString()} @{' '}
                {new Date(item.last_modified).toTimeString()}
              </Text>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default InventoryItem;
