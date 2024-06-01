import {StyleSheet} from 'react-native';
import {ColorConst, fontSize, fonts, hp} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.profile_header,
  },
  subContainer: {
    flex: 1,
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
    backgroundColor: ColorConst.white,
  },
  balanceText: {
    marginTop: hp(5),
    fontSize: fontSize(20),
    color: ColorConst.gray_1,
  },
  totalBalanceText: {
    fontSize: fontSize(30),
    fontFamily: fonts.bold,
    color: ColorConst.dark_black,
  },
  customRupeeIcon: {
    width: hp(3),
    height: hp(3),
  },
  headerContainer: {
    alignItems: 'center',
  },
});
