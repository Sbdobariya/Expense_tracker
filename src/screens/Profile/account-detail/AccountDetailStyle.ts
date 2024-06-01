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
  headerContainer: {
    alignItems: 'center',
    marginTop: hp(5),
  },
  balanceText: {
    marginTop: hp(1),
    fontSize: fontSize(20),
    fontFamily: fonts.medium,
    color: ColorConst.dark_black,
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
  customCategoryImageView: {
    padding: hp(2),
    borderRadius: hp(2),
  },

  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionImage: {
    marginRight: wp(5),
  },
  image: {
    width: hp(4),
    height: hp(4),
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontWeight: 'bold',
    fontSize: fontSize(16),
    color: ColorConst.dark_black,
  },
  transactionNote: {
    color: '#999',
  },
  transactionTime: {
    color: '#999',
  },
  transactionAmount: {
    fontSize: fontSize(16),
    fontFamily: fonts.semiBold,
  },
  date: {
    fontWeight: 'bold',
    fontSize: fontSize(16),
    padding: hp(1),
    backgroundColor: '#eee',
  },
  flatlistStyle: {
    marginTop: hp(5),
  },
  footerComponent: {
    height: hp(5),
  },
});
