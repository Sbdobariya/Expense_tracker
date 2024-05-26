import React from 'react';
import {useSelector} from 'react-redux';
import {AuthImages} from '../../../assets';
import {getTime} from '../../hooks/CommanHooks';
import {Image, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AuthReducerType} from '../../interface/AuthInterface';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';

const HomeHeader = () => {
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );

  return (
    <LinearGradient
      colors={[ColorConst.gradiant_color1, ColorConst.gradiant_color2]}
      style={[styles.linearGradient]}>
      <Image style={styles.headerImage} source={AuthImages.header_bg_ic} />
      <Text style={styles.timeStyle}>{getTime()},</Text>
      <Text style={styles.heraderText}>{userData?.userName}</Text>
    </LinearGradient>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: hp(35),
    paddingTop: hp(10),
    borderBottomEndRadius: hp(5),
    borderBottomStartRadius: hp(5),
    paddingLeft: wp(3),
  },
  heraderText: {
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
    color: ColorConst.white,
  },
  headerImage: {
    left: wp(-5),
    position: 'absolute',
  },
  timeStyle: {
    fontSize: fontSize(13),
    color: ColorConst.white,
    fontFamily: fonts.medium,
  },
});
