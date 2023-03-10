import { Theme } from '../utils/theme';
import { BoxProps, TextProps, useTheme } from '@shopify/restyle';
import React, { ReactNode } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';
import Box from './Box';
import Text from './Text';

interface Props {
  containerProps?: BoxProps<Theme>;
  onPress?: () => void;
  buttonProps?: BoxProps<Theme>;
  displayText?: string;
  children?: ReactNode;
  loading?: boolean;
  style?: ViewStyle;
  textProps?: TextProps<Theme>;
}

const Button = ({
  containerProps,
  onPress,
  buttonProps,
  displayText,
  children,
  loading,
  style,
  textProps,
}: Props) => {
  const theme = useTheme<Theme>();

  return (
    <Box width="100%" {...containerProps}>
      <TouchableOpacity disabled={loading} onPress={onPress}>
        <Box
          height={50}
          backgroundColor="primary"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          borderRadius={6}
          {...buttonProps}
          style={{ ...style }}>
          {loading && (
            <Chase
              color={theme.colors[textProps?.color || 'white']}
              style={{ marginRight: 5 }}
              size={16}
            />
          )}
          <Text variant="medium" color="white" fontSize={16} {...textProps}>
            {displayText}
          </Text>
          {children}
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default Button;
