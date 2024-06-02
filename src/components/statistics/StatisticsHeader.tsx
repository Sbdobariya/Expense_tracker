import {Image, Platform, StyleSheet, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';
import {AuthImages} from '../../../assets';

const StatisticsHeader = () => {
  return (
    <LinearGradient
      colors={[ColorConst.gradient_color1, ColorConst.gradient_color2]}
      style={[styles.linearGradient]}>
      <Image style={styles.headerImage} source={AuthImages.header_bg_ic} />
      <Text style={styles.headerText}>{'Financial Report'}</Text>
    </LinearGradient>
  );
};

export default StatisticsHeader;

const styles = StyleSheet.create({
  headerImage: {
    left: wp(-5),
    position: 'absolute',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: fontSize(20),
    color: ColorConst.white,
    fontFamily: fonts.bold,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS == 'ios' ? hp(18) : hp(10),
    paddingTop: Platform.OS == 'ios' ? hp(5) : hp(0),
  },
});
