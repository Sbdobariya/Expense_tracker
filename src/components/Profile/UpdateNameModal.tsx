import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {ColorConst, fontSize, fonts, hp} from '../../theme';
import InputText from '../common/InputText';
import PrimaryButton from '../common/PrimaryButton';

interface Props {
  userName: string;
  isVisible: boolean;
  toggleModal: () => void;
  onSubmitPress: () => void;
  onChangeText: (txt: string) => void;
}

const UpdateNameModal: React.FC<Props> = ({
  isVisible,
  toggleModal,
  userName,
  onChangeText,
  onSubmitPress,
}) => {
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
        <Text style={styles.text}>Enter new user name</Text>
        <InputText
          placeholder="Name"
          value={userName}
          onChangeText={onChangeText}
        />
        <PrimaryButton
          title="Submit"
          onPress={onSubmitPress}
          disabled={userName.length == 0}
          customGradientStyle={styles.customGradientStyle}
        />
      </View>
    </Modal>
  );
};

export default UpdateNameModal;

const styles = StyleSheet.create({
  modalContent: {
    padding: hp(2),
    borderRadius: 20,
    backgroundColor: ColorConst.white,
  },
  text: {
    textAlign: 'center',
    paddingBottom: hp(2),
    fontSize: fontSize(20),
    color: ColorConst.dark_black,
    fontFamily: fonts.medium,
  },
  customGradientStyle: {
    marginTop: hp(3),
  },
});
