import React from 'react';
import {useSelector} from 'react-redux';
import {AuthImages} from '../../../assets';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AuthReducerType} from '../../interface';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';
import {getTime} from '../../hooks';

const HomeHeader = () => {
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );

  return (
    <LinearGradient
      colors={[ColorConst.gradient_color1, ColorConst.gradient_color2]}
      style={[styles.linearGradient]}>
      <View style={styles.gradientView}>
        <Image style={styles.headerImage} source={AuthImages.header_bg_ic} />
        <Text style={styles.timeStyle}>{getTime()},</Text>
        <Text style={styles.headerText}>{userData?.userName}</Text>
      </View>
    </LinearGradient>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  linearGradient: {
    height: Platform.OS == 'ios' ? hp(35) : hp(30),
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
  },
  headerText: {
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
  gradientView: {
    paddingTop: Platform.OS === 'ios' ? hp(10) : hp(3),
    paddingLeft: wp(3),
  },
});
