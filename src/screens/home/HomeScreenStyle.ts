import {StyleSheet} from 'react-native';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  headerContainer: {
    marginTop: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    justifyContent: 'space-between',
  },
  itemSubContaine: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText1: {
    color: '#000',
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
  },
  seeAllText: {
    color: 'red',
    fontSize: fontSize(15),
    fontFamily: fonts.regular,
    textDecorationLine: 'underline',
  },
  categoryImge: {
    width: hp(3),
    height: hp(3),
    borderRadius: 10,
  },
  flatlistStyle: {
    marginTop: hp(1.5),
  },
});
