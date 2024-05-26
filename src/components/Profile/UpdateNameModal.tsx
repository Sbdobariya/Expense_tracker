import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {ColorConst, hp} from '../../theme';

interface UpdateNameModalProps {
  isVisible: boolean;
  toggleModal: () => void;
}

const UpdateNameModal = ({isVisible, toggleModal}: UpdateNameModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      swipeDirection={['down']}
      onSwipeComplete={toggleModal}
      animationOut="slideOutDown"
      onBackdropPress={toggleModal}>
      <View style={styles.modalContent}>
        <Text>Enter name</Text>
      </View>
    </Modal>
  );
};

export default UpdateNameModal;

const styles = StyleSheet.create({
  modalContent: {
    padding: hp(2),
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: ColorConst.white,
  },
});
