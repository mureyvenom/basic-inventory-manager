import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Box from '../components/Box';
import { MainStack } from '../utils/ParamList';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserContext } from '../state/providers/user.provider';
import Button from '../components/Button';
import { InventoryItem } from '../utils/types';
import { useInventoryContext } from '../state/providers/inventory.provider';
import Input from '../components/Input';
import ConfirmModal from '../components/ConfirmModal';
import Toast from 'react-native-toast-message';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    description: yup
      .string()
      .required('Description is required')
      .min(3, 'Add a description of at least 3 characters'),
    price: yup.string().required('Price is required'),
    stock: yup.string().required('Stock count is required'),
  })
  .required();

interface Props {
  navigation: NativeStackNavigationProp<MainStack, 'Inventory'>;
  route: RouteProp<MainStack, 'Inventory'>;
}

const InventoryScreen = ({ navigation, route }: Props) => {
  const { user } = useUserContext();
  const { addItem, updateItem, deleteItem } = useInventoryContext();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { item } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
    // getValues,
  } = useForm({
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      price: item?.price || '0',
      stock: item?.stock || '0',
    },
    resolver: yupResolver(schema),
  });

  const submit = (cred: any) => {
    if (isNaN(parseInt(cred.stock)) || isNaN(Number(cred.price))) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Stock and price must be valid numbers',
      });
      return;
    }
    if (route.params.mode === 'add') {
      const newItem: InventoryItem = {
        ...cred,
        date_created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
        owner: user.email,
        price: Number(cred.price),
        stock: Number(cred.stock),
      };
      const response = addItem(newItem);
      if (response) {
        navigation.pop();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Unable to add item',
        });
      }
    } else {
      const replace = {
        ...route.params?.item!,
        name: cred.name,
        description: cred.name,
        price: Number(cred.price),
        stock: Number(cred.stock),
        last_modified: new Date().toISOString(),
      };
      const response = updateItem(route.params?.item!, replace);
      if (response) {
        navigation.pop();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Unable to edit item',
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Box paddingTop="xxl" paddingHorizontal="l" paddingBottom="xxl">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter item name"
                value={value}
                onChangeText={v => onChange(v)}
                error={errors.name?.message}
                autoCapitalize="sentences"
                autoCorrect={false}
                label="Name"
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter item description"
                value={value}
                onChangeText={v => onChange(v)}
                error={errors.description?.message}
                autoCapitalize="sentences"
                autoCorrect={false}
                label="Description"
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter item price"
                value={value.toString()}
                onChangeText={v => onChange(v)}
                error={errors.price?.message}
                autoCapitalize="sentences"
                autoCorrect={false}
                keyboardType="number-pad"
                label="Price"
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="stock"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter item stock"
                value={value.toString()}
                onChangeText={v => onChange(v)}
                error={errors.stock?.message}
                autoCapitalize="sentences"
                autoCorrect={false}
                keyboardType="number-pad"
                label="Stock"
              />
            )}
          />
          <Box marginBottom="l">
            <Button
              displayText={`${
                route.params.mode === 'add' ? 'Add' : 'Save'
              } Item`}
              onPress={handleSubmit(submit)}
            />
          </Box>
          {route.params.mode === 'edit' && (
            <Button
              displayText="Delete Item"
              buttonProps={{
                backgroundColor: 'danger',
              }}
              onPress={() => setConfirmDelete(true)}
            />
          )}
        </Box>
      </ScrollView>
      <ConfirmModal
        closeModal={() => setConfirmDelete(false)}
        confirmAction={() => {
          deleteItem(route.params.item!);
          navigation.pop();
        }}
        title="Are you sure you want to delete this item?"
        visible={confirmDelete}
      />
    </SafeAreaView>
  );
};

export default InventoryScreen;
