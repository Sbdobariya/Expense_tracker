import {StyleSheet} from 'react-native';
import {fontSize, hp, wp} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userNameText: {
    fontSize: fontSize(20),
  },
  flatlist: {
    flexGrow: 0,
    borderRadius: hp(2),
    marginHorizontal: wp(4),
  },
});
