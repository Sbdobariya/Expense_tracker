import React from 'react';
import {HomeNavigationType, RootPage} from '../type';

import HomeScreen from '../../screens/home/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator<HomeNavigationType>();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={RootPage.HomeScreen} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
