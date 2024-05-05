import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const fontSize = (val: number) => RFValue(val, 812);

export const wp = (val: number) => widthPercentageToDP(val);

export const hp = (val: number) => heightPercentageToDP(val);

// fonts
export const fonts = {
  bold: 'OpenSans-Bold',
  medium: 'OpenSans-Medium',
  regular: 'OpenSans-Regular',
  semiBold: 'OpenSans-SemiBold',
};
