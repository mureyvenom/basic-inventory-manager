import { Theme } from '../utils/theme';
import { BoxProps, ColorProps, useTheme } from '@shopify/restyle';
import React, { ReactNode } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import Box from './Box';
import Text from './Text';

interface Props extends TextInputProps {
  label?: string;
  containerProps?: BoxProps<Theme>;
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  error?: string;
  disabled?: boolean;
  labelColor?: ColorProps<Theme>['color'];
  borderColor?: ColorProps<Theme>['color'];
}

const Input = ({
  label,
  containerProps,
  leftComponent,
  rightComponent,
  error,
  labelColor,
  borderColor,
  disabled,
  ...props
}: Props) => {
  const theme = useTheme<Theme>();
  const { muted, foreground } = theme.colors;

  return (
    <Box marginBottom="l" {...containerProps}>
      {label && (
        <Text
          variant="regular"
          color={labelColor || 'foreground'}
          marginBottom="s">
          {label}
        </Text>
      )}
      <Box
        backgroundColor="background"
        borderWidth={1}
        borderRadius={6}
        borderColor={borderColor || 'muted'}
        height={50}
        flexDirection="row"
        paddingHorizontal="m"
        alignItems="center">
        {leftComponent}
        <TextInput
          placeholderTextColor={muted}
          editable={disabled || undefined}
          selectTextOnFocus={disabled || undefined}
          style={{
            flex: 1,
            height: '100%',
            color: foreground,
          }}
          {...props}
        />
        {rightComponent}
      </Box>
      {error && (
        <Text
          variant="medium"
          fontSize={10}
          style={{ color: 'red' }}
          marginTop="xs">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default Input;
