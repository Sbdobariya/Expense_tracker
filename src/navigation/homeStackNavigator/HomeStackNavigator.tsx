import React from 'react';
import {HomeNavigationType} from '..';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/HomeScreen';

const HomeStack = createNativeStackNavigator<HomeNavigationType>();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
