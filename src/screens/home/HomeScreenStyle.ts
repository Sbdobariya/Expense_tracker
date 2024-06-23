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
  flatListStyle: {
    marginTop: hp(1.5),
  },
  noDataText: {
    fontSize: fontSize(20),
    fontFamily: fonts.bold,
    color: ColorConst.dark_black,
  },
  noDataView: {
    flex: 1,
    marginTop: hp(10),
    alignItems: 'center',
  },
});
