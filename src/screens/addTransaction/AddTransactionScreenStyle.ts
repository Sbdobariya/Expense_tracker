import {StyleSheet} from 'react-native';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';

export const styles = StyleSheet.create({
  bottomAddButton: {
    marginTop: hp(5),
  },
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  selectCaegoryButton: {
    gap: 10,
    marginTop: hp(2),
    padding: hp(1.5),
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    backgroundColor: '#29756F',
  },
  centerView: {
    flex: 1,
    borderRadius: 20,
    marginTop: hp(-15),
    marginBottom: hp(8),
    marginHorizontal: wp(7),
    backgroundColor: '#FFFFFF',

    // shado
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  categoryIcon: {
    height: hp(3),
    width: hp(3),
  },
  selectCategory: {
    color: '#FFFFFF',
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  amountInputStyle: {
    height: hp(6),
    color: '#000',
    marginTop: hp(2),
    fontSize: fontSize(12),
    marginHorizontal: wp(4),
    fontFamily: fonts.medium,
  },
  invoiceContainer: {
    height: hp(6),
    borderWidth: 1,
    marginTop: hp(2),
    padding: hp(1.5),
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'dashed',
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
  },
  addButton: {
    width: hp(3),
    height: hp(3),
  },
  addInvoiceText: {
    color: '#000',
    fontSize: fontSize(13),
    fontFamily: fonts.medium,
  },
  plusButton: {
    gap: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedInvoiceImage: {
    width: hp(6),
    height: hp(4),
    borderRadius: 10,
  },
});
