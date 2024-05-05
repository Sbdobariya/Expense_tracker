import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ColorConst, ImageConst, fontSize, fonts, hp, wp} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';

interface props {
  title: string;
  onPress?: () => void;
}

const CommanHeader = ({title, onPress}: props) => {
  return (
    <LinearGradient
      colors={[ColorConst.gradiant_color1, ColorConst.gradiant_color2]}
      style={[styles.linearGradient]}>
      <Image style={styles.headerImage} source={ImageConst.header_bg_ic} />
      <TouchableOpacity onPress={onPress}>
        <Image source={ImageConst.left_icon_ic} style={styles.leftIconStyle} />
      </TouchableOpacity>
      <Text style={styles.heraderText}>{title}</Text>
      <View style={styles.leftIconStyle} />
    </LinearGradient>
  );
};

export default CommanHeader;

const styles = StyleSheet.create({
  headerImage: {
    left: wp(-5),
    position: 'absolute',
  },
  leftIconStyle: {
    width: hp(3.44),
    height: hp(3.44),
  },
  heraderText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSize(18),
    color: ColorConst.white,
    fontFamily: fonts.bold,
  },
  linearGradient: {
    height: hp(18),
    paddingTop: hp(7),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(6.4),
    justifyContent: 'space-between',
  },
});
