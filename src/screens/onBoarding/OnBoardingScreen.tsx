import React from 'react';
import {PrimaryButton} from '../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {AuthNavigationType, RootPage} from '../../navigation/type';
import {AuthImages} from '../../../assets';
import {fontSize, ColorConst, fonts, hp, wp} from '../../theme';
import {AuthStrings} from '../../constants/String';

const OnBoardingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthNavigationType>>();

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Image
        style={styles.onBoardImageStyle}
        source={AuthImages.onBoading_ic}
      />
      <Text style={styles.onBoardText}>{AuthStrings.on_board_text}</Text>
      <Text style={styles.onBoardText1}>{AuthStrings.on_board_text1}</Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title={'Sign Up'}
          onPress={() => navigation.navigate(RootPage.SignUpScreen)}
        />
        <PrimaryButton
          title={'Login'}
          customeGradientStyle={styles.loginButton}
          onPress={() => navigation.navigate(RootPage.LoginScreen)}
        />
      </View>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  onBoardImageStyle: {
    width: hp(38),
    height: hp(30),
    marginTop: hp(3),
    alignSelf: 'center',
  },
  onBoardText: {
    maxWidth: wp(50),
    marginTop: hp(10),
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: fontSize(20),
    fontFamily: fonts.medium,
    color: ColorConst.dark_black,
  },
  onBoardText1: {
    maxWidth: wp(70),
    marginTop: hp(3),
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: fontSize(15),
    fontFamily: fonts.regular,
    color: ColorConst.light_gray,
  },
  loginButton: {
    marginTop: hp(1.9),
  },
  buttonContainer: {
    flex: 1,
    marginBottom: hp(5),
    justifyContent: 'flex-end',
  },
});
