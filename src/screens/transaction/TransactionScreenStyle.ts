import {StyleSheet} from 'react-native';
import {hp, fontSize, fonts, ColorConst} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainerText: {
    marginTop: hp(2),
    fontSize: fontSize(20),
    fontFamily: fonts.medium,
  },
  emptyComponentContainer: {
    marginTop: hp(10),
    alignItems: 'center',
  },
  emptyImageStyle: {
    width: hp(10),
    height: hp(10),
  },
  calenderStyle: {
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
    shadowRadius: 1.0,
    shadowOpacity: 0.18,
  },
  customeIconStyle: {
    width: hp(2),
    height: hp(2),
  },
  rightArrowContainer: {
    gap: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    padding: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popoverView: {
    gap: hp(2),
    flexDirection: 'row',
  },
  myMoney: {
    color: ColorConst.dark_black,
    fontSize: fontSize(17),
  },
  filterImage: {
    height: hp(5),
    width: hp(5),
  },
});
