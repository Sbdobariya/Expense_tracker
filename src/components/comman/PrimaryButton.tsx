import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorConst, fontSize, fonts, hp, wp} from '../../utils';

interface props {
  title: string;
  onPress?: () => void;
  customeGradientStyle?: ViewStyle;
}

const PrimaryButton = ({title, onPress, customeGradientStyle}: props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <LinearGradient
        colors={[ColorConst.gradiant_color1, ColorConst.gradiant_color2]}
        style={[styles.linearGradient, customeGradientStyle]}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: hp(40),
    alignItems: 'center',
    paddingVertical: hp(2),
    marginHorizontal: wp(5.33),
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
    color: ColorConst.white,
  },
});
