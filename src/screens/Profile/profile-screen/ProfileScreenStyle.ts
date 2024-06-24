import {Platform, StyleSheet} from 'react-native';
import {ColorConst, fontSize, fonts, hp, wp} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  userNameText: {
    fontSize: fontSize(25),
    color: ColorConst.dark_black,
    fontFamily: fonts.bold,
  },
  userEmailText: {
    fontSize: fontSize(20),
    color: ColorConst.dark_black,
    fontFamily: fonts.semiBold,
  },
  flatList: {
    flexGrow: 0,
    borderRadius: hp(2),
    marginHorizontal: wp(4),
    marginTop: hp(5),
  },
  userName: {
    color: ColorConst.light_gray,
  },

  headerContainer: {
    marginTop: Platform.OS === 'ios' ? hp(-8) : hp(-10),
    alignItems: 'center',
  },
  userProfile: {
    height: hp(15),
    width: hp(15),
  },
});
