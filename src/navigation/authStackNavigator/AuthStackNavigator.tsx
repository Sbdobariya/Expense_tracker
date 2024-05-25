import React from 'react';
import {AuthNavigationType, RootPage} from '../type';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignUpScreen from '../../screens/auth/SignUpScreen';
import OnBoardingScreen from '../../screens/onBoarding/OnBoardingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator<AuthNavigationType>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name={RootPage.OnBoarding}
        component={OnBoardingScreen}
      />
      <AuthStack.Screen name={RootPage.LoginScreen} component={LoginScreen} />
      <AuthStack.Screen name={RootPage.SignUpScreen} component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
