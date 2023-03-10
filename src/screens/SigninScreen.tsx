import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Box from '../components/Box';
import Input from '../components/Input';
import Text from '../components/Text';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserContext } from '../state/providers/user.provider';
import Button from '../components/Button';

const schema = yup
  .object({
    email: yup.string().email().max(255).required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const SigninScreen = () => {
  const { setUser } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    // getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = (cred: any) => {
    setUser(cred.email);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Box>
          <Text
            variant="regular"
            fontSize={60}
            textAlign="center"
            marginTop="xxl"
            marginBottom="xl"
            color="foreground">
            Sign In
          </Text>
          <Box paddingHorizontal="l">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={v => onChange(v)}
                  error={errors.email?.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                />
              )}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={v => onChange(v)}
                  error={errors.password?.message}
                  secureTextEntry
                />
              )}
            />
            <Box marginBottom="m" marginTop="l">
              <Button onPress={handleSubmit(submit)} displayText="Sign In" />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SigninScreen;
