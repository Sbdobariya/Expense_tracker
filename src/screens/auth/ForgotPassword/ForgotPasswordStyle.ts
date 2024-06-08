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
  bottomButton: {
    marginBottom: hp(5),
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
