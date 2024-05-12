import React from 'react';
import {StatisticsNavigationType} from '..';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StatisticsScreen from '../../screens/statistics/StatisticsScreen';

const StatisticsStack = createNativeStackNavigator<StatisticsNavigationType>();

const StatisticsStackNavigator = () => {
  return (
    <StatisticsStack.Navigator screenOptions={{headerShown: false}}>
      <StatisticsStack.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
      />
    </StatisticsStack.Navigator>
  );
};

export default StatisticsStackNavigator;
