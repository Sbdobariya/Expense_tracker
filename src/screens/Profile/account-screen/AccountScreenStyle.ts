import {StyleSheet} from 'react-native';
import {ColorConst, fontSize, fonts, hp, wp} from '../../../theme';

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
  flatlistStyle: {
    marginTop: hp(7),
  },
  listContainer: {
    flexDirection: 'row',
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    borderBottomColor: '#F1F1FA',
  },
  listSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(1),
  },
  listImage: {
    width: hp(3),
    height: hp(3),
  },
  accountName: {
    fontSize: fontSize(15),
    fontFamily: fonts.semiBold,
    color: ColorConst.dark_black,
  },
  transactionAmount: {
    fontSize: fontSize(17),
    fontFamily: fonts.semiBold,
    color: ColorConst.dark_black,
  },
});
