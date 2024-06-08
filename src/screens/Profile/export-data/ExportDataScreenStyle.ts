import {StyleSheet} from 'react-native';
import {ColorConst, fontSize, fonts, hp, wp} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  topText: {
    marginTop: hp(3),
    marginLeft: wp(5),
    fontSize: fontSize(18),
    color: ColorConst.dark_black,
    fontFamily: fonts.bold,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
