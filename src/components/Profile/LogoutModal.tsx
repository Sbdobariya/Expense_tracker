import React from 'react';
import Modal from 'react-native-modal';
import {ProfileStrings} from '../../constants/String';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  isVisible: boolean;
  onNoPress: () => void;
  onYesPress: () => void;
  toggleModal: () => void;
}
const LogoutModal = ({
  isVisible,
  onNoPress,
  onYesPress,
  toggleModal,
}: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      swipeDirection={['down']}
      onSwipeComplete={toggleModal}
      animationOut="slideOutDown"
      onBackdropPress={toggleModal}>
      <View style={styles.modalContent}>
        <View style={styles.topBorder} />
        <Text style={styles.logout}>{ProfileStrings.logout}?</Text>
        <Text style={styles.subTitile}>{ProfileStrings.wanna_logout}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.noButton} onPress={onNoPress}>
            <Text style={styles.noText}>{ProfileStrings.no}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.yesButton} onPress={onYesPress}>
            <Text style={styles.yesText}>{ProfileStrings.yes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: hp(2),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: ColorConst.white,
    alignItems: 'center',
  },
  yesButton: {
    flex: 1,
    borderRadius: hp(2),
    alignItems: 'center',
    paddingVertical: hp(2),
    backgroundColor: ColorConst.violet_100,
  },
  noButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: hp(2),
    paddingVertical: hp(2),
    backgroundColor: ColorConst.menu_ic,
  },
  buttonContainer: {
    gap: hp(1.7),
    flexDirection: 'row',
    marginVertical: hp(3),
  },
  topBorder: {
    width: wp(10),
    borderWidth: 2,
    borderRadius: hp(2),
    alignSelf: 'center',
    borderColor: ColorConst.menu_ic,
  },
  logout: {
    marginTop: hp(1),
    fontSize: fontSize(20),
    fontFamily: fonts.semiBold,
    color: ColorConst.dark_black,
  },
  subTitile: {
    marginTop: hp(1.5),
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
    color: ColorConst.light_gray,
  },
  noText: {
    fontSize: fontSize(18),
    fontFamily: fonts.semiBold,
    color: ColorConst.violet_100,
  },
  yesText: {
    fontSize: fontSize(18),
    color: ColorConst.white,
    fontFamily: fonts.semiBold,
  },
});
