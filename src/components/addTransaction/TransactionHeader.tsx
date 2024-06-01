import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthImages} from '../../../assets';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';

const TransactionHeader = ({onBackPress}: {onBackPress: () => void}) => {
  return (
    <LinearGradient
      colors={[ColorConst.gradient_color1, ColorConst.gradient_color2]}
      style={[styles.linearGradient]}>
      <Image style={styles.headerImage} source={AuthImages.header_bg_ic} />
      <TouchableOpacity onPress={onBackPress}>
        <Image source={AuthImages.left_icon_ic} style={styles.leftIconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Add Transaction</Text>
      <View style={styles.leftIconStyle} />
    </LinearGradient>
  );
};

export default TransactionHeader;

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'row',
    height: Platform.OS == 'ios' ? hp(35) : hp(30),
    paddingTop: Platform.OS === 'ios' ? hp(10) : hp(5),
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
    color: ColorConst.white,
  },
  headerImage: {
    left: wp(-5),
    position: 'absolute',
  },
  leftIconStyle: {
    width: hp(5),
    height: hp(5),
  },
});
