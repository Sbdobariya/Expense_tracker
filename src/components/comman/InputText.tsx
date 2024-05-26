import React from 'react';
import {KeyboardType, StyleSheet, TextInput, ViewStyle} from 'react-native';
import {ColorConst, fonts, hp, wp} from '../../theme';

interface props {
  placeholder?: string;
  value?: string | number;
  keyboardType?: KeyboardType;
  inputCustomeStyle?: ViewStyle;
  onChangeText?: (xtx: string) => void;
  secureTextEntry?: boolean | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
}

const InputText = (props: props) => {
  const {
    value,
    placeholder,
    onChangeText,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    inputCustomeStyle,
  } = props;
  return (
    <TextInput
      value={value?.toString()}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      style={[styles.inputFiled, inputCustomeStyle]}
      placeholderTextColor={ColorConst.light_gray}
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
