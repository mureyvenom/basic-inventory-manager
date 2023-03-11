import React from 'react';
import Modal from 'react-native-modal';
import Box from './Box';
import Button from './Button';
import Text from './Text';

interface Props {
  visible: boolean;
  closeModal: () => void;
  confirmAction: () => void;
  title: string;
}

const ConfirmModal = ({ visible, closeModal, confirmAction, title }: Props) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={closeModal}
      propagateSwipe
      testID="confirmation-modal"
      style={{ justifyContent: 'center' }}>
      <Box marginHorizontal="l" padding="l" backgroundColor="background">
        <Text variant="medium" color="foreground" textAlign="center">
          {title}
        </Text>
        <Box
          flexDirection="row"
          gap="l"
          marginTop="xl"
          alignItems="center"
          justifyContent="space-between">
          <Box flex={1}>
            <Button
              displayText="Yes"
              buttonProps={{ backgroundColor: 'success' }}
              onPress={confirmAction}
            />
          </Box>
          <Box flex={1}>
            <Button
              displayText="No"
              onPress={closeModal}
              buttonProps={{ backgroundColor: 'danger' }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
