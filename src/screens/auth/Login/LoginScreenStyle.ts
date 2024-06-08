import {StyleSheet} from 'react-native';
import {ColorConst, fontSize, fonts, hp, wp} from '../../../theme';

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
  loginButtonStyle: {
    marginTop: hp(10),
  },
  forgotPass: {
    marginTop: hp(2),
    marginRight: wp(8),
    alignSelf: 'flex-end',
  },
  forgotPassText: {
    fontSize: fontSize(16),
    color: ColorConst.dark_black,
    textDecorationLine: 'underline',
  },
});
