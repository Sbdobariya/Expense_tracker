import {StyleSheet} from 'react-native';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  onBoardImageStyle: {
    width: hp(38),
    height: hp(30),
    marginTop: hp(3),
    alignSelf: 'center',
  },
  onBoardText: {
    maxWidth: wp(50),
    marginTop: hp(10),
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: fontSize(20),
    fontFamily: fonts.medium,
    color: ColorConst.dark_black,
  },
  onBoardText1: {
    maxWidth: wp(70),
    marginTop: hp(3),
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: fontSize(15),
    fontFamily: fonts.regular,
    color: ColorConst.light_gray,
  },
  loginButton: {
    marginTop: hp(1.9),
  },
  buttonContainer: {
    flex: 1,
    marginBottom: hp(5),
    justifyContent: 'flex-end',
  },
});
