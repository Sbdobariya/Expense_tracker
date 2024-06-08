import {StyleSheet} from 'react-native';
import {ColorConst, fontSize, fonts, hp} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.profile_header,
  },
  subView: {
    flex: 1,
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
    backgroundColor: ColorConst.white,
    paddingTop: hp(5),
  },
  emptyData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    color: ColorConst.dark_black,
    fontSize: fontSize(25),
    fontFamily: fonts.bold,
  },
});
