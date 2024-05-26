import {StyleSheet} from 'react-native';
import {ColorConst, hp} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  emailInput: {
    marginTop: hp(6.89),
  },
  passwordInput: {
    marginTop: hp(2.95),
  },
  loginButtonStyle: {
    marginTop: hp(10),
  },
});
