import React from 'react';
import {TransactionScreen} from '../../screens';
import {RootPage, TransactionNavigationType} from '../type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TransactionStack =
  createNativeStackNavigator<TransactionNavigationType>();

const TransactionStackNavigator = () => {
  return (
    <TransactionStack.Navigator screenOptions={{headerShown: false}}>
      <TransactionStack.Screen
        name={RootPage.TransactionScreen}
        component={TransactionScreen}
      />
    </TransactionStack.Navigator>
  );
};

export default TransactionStackNavigator;
