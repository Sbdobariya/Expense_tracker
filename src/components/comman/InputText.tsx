import {StyleSheet, Text, TextInput, View, ViewStyle} from 'react-native';
import React from 'react';
import {ColorConst, fonts, hp, wp} from '../../utils';

interface props {
  value?: string;
  placeholder?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  inputCustomeStyle?: ViewStyle;
  onChangeText?: (xtx: string) => void;
  secureTextEntry?: boolean | undefined;
}

const InputText = (props: props) => {
  const {
    value,
    onChangeText,
    placeholder,
    inputCustomeStyle,
    secureTextEntry,
    autoCapitalize,
  } = props;
  return (
    <TextInput
      value={value}
      autoCapitalize={autoCapitalize}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[styles.inputFiled, inputCustomeStyle]}
      placeholderTextColor={ColorConst?.light_gray}
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputFiled: {
    borderWidth: 1,
    height: hp(6.89),
    borderRadius: 14,
    paddingLeft: wp(3),
    marginHorizontal: wp(5.33),
    fontFamily: fonts.regular,
    color: ColorConst?.dark_black,
    backgroundColor: ColorConst?.white,
    borderColor: ColorConst.light_gray,
  },
});
