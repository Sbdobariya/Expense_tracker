import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AuthImages} from '../../../assets';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';

interface props {
  title: string;
  onPress?: () => void;
}

const CommonHeader = ({title, onPress}: props) => {
  return (
    <LinearGradient
      colors={[ColorConst.gradient_color1, ColorConst.gradient_color2]}
      style={[styles.linearGradient]}>
      <Image style={styles.headerImage} source={AuthImages.header_bg_ic} />
      <TouchableOpacity onPress={onPress}>
        <Image source={AuthImages.left_icon_ic} style={styles.leftIconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.leftIconStyle} />
    </LinearGradient>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  headerImage: {
    left: wp(-5),
    position: 'absolute',
  },
  leftIconStyle: {
    width: hp(5),
    height: hp(5),
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSize(18),
    color: ColorConst.white,
    fontFamily: fonts.bold,
  },
  linearGradient: {
    height: Platform.OS == 'ios' ? hp(18) : hp(13),
    paddingTop: Platform.OS == 'ios' ? hp(7) : hp(3),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    justifyContent: 'space-between',
  },
});
