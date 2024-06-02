import {StyleSheet} from 'react-native';
import {ColorConst, fontSize, fonts, hp} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  emailInput: {
    marginTop: hp(6.89),
    fontSize: fontSize(15),
    fontFamily: fonts.regular,
    color: ColorConst.dark_black,
  },
  passwordInput: {
    marginTop: hp(2.95),
    fontSize: fontSize(15),
    fontFamily: fonts.regular,
    color: ColorConst.dark_black,
  },
  loginButtonStyle: {
    marginTop: hp(10),
  },
});
