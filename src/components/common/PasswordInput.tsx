import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import InputText from './InputText';
import {AuthImages} from '../../../assets';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';
import {AuthStrings} from '../../constants/String';

interface PasswordInputProps {
  passwordHide: boolean;
  password?: string;
  setPassword: (value: React.SetStateAction<string>) => void;
  setPasswordHide: (value: React.SetStateAction<boolean>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  passwordHide,
  password,
  setPassword,
  setPasswordHide,
}) => {
  return (
    <View style={styles.passwordView}>
      <InputText
        value={password}
        autoCapitalize="none"
        secureTextEntry={passwordHide}
        placeholder={AuthStrings.Password}
        inputCustomStyle={styles.passwordInput}
        onChangeText={(txt: string) => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.iconStyle}
        onPress={() => setPasswordHide(!passwordHide)}>
        <Image
          resizeMode="contain"
          style={styles.eyeStyle}
          source={passwordHide ? AuthImages.hide_ic : AuthImages.view_ic}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  eyeStyle: {
    height: hp(2.5),
    width: hp(2.5),
  },
  iconStyle: {
    right: wp(10),
    padding: hp(0.5),
    position: 'absolute',
  },
  passwordView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.95),
  },
  passwordInput: {
    fontSize: fontSize(15),
    fontFamily: fonts.regular,
    color: ColorConst.dark_black,
    flex: 1,
  },
});
