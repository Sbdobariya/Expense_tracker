import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {ColorConst, hp, wp} from '../../theme';
import Modal from 'react-native-modal';

interface Props {
  isVisible: boolean;
  toggleModal: () => void;
}

const AddCategoryModal: React.FC<Props> = ({isVisible, toggleModal}) => {
  console.log('isVisible----------', isVisible);
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.6}
      animationIn="slideInUp"
      onSwipeComplete={toggleModal}
      onBackdropPress={toggleModal}>
      <View style={styles.modalContent}>
        <Text>sd</Text>
      </View>
    </Modal>
  );
};

export default memo(AddCategoryModal);

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalContent: {
    overflow: 'hidden',
    borderRadius: hp(2),
    marginHorizontal: wp(5),
    backgroundColor: ColorConst.white,
  },
});
