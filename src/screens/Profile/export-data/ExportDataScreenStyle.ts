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
  selectDateBox: {
    height: hp(6),
    borderWidth: 1,
    borderRadius: 8,
    marginTop: hp(3),
    borderColor: 'gray',
    marginHorizontal: wp(5),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
  },
  dateTextStyle: {
    color: ColorConst.dark_black,
    fontSize: fontSize(17),
    fontFamily: fonts.medium,
  },
  buttonContainer: {
    marginBottom: hp(7),
  },
});
