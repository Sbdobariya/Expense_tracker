import React from 'react';
import {StatisticsScreen} from '../../screens';
import {RootPage, StatisticsNavigationType} from '../type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const StatisticsStack = createNativeStackNavigator<StatisticsNavigationType>();

const StatisticsStackNavigator = () => {
  return (
    <StatisticsStack.Navigator screenOptions={{headerShown: false}}>
      <StatisticsStack.Screen
        name={RootPage.StatisticsScreen}
        component={StatisticsScreen}
      />
    </StatisticsStack.Navigator>
  );
};

export default StatisticsStackNavigator;
