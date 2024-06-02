import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';

interface Props {
  title: string;
  onPress?: () => void;
  customGradientStyle?: ViewStyle;
}

const PrimaryButton: React.FC<Props> = ({
  title,
  onPress,
  customGradientStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[customGradientStyle]}>
      <LinearGradient
        colors={[ColorConst.gradient_color1, ColorConst.gradient_color2]}
        style={styles.linearGradient}>
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
