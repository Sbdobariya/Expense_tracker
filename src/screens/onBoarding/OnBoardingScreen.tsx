import React from 'react';
import {AuthImages} from '../../../assets';
import {PrimaryButton} from '../../components';
import {styles} from './OnBoardingScreenStyle';
import {AuthStrings} from '../../constants/String';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {AuthNavigationType, RootPage} from '../../navigation/type';
import {NavigationProp, useNavigation} from '@react-navigation/native';

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
