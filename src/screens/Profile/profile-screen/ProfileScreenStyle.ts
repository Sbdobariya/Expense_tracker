import {StyleSheet} from 'react-native';
import {ColorConst, fontSize, hp, wp} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  userNameText: {
    fontSize: fontSize(25),
    color: ColorConst.dark_black,
  },
  flatlist: {
    flexGrow: 0,
    borderRadius: hp(2),
    marginHorizontal: wp(4),
  },
  userName: {
    color: ColorConst.light_gray,
  },
  editIcon: {
    width: hp(3),
    height: hp(3),
    marginRight: wp(10),
  },
  headerContainer: {
    marginTop: hp(5),
    flexDirection: 'row',
    marginBottom: hp(3),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userNameView: {
    marginLeft: wp(10),
  },
});
