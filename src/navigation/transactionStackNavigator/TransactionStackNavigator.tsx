import React from 'react';
import {TransactionNavigationType} from '../type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransactionScreen from '../../screens/transaction/TransactionScreen';

const TransactionStack =
  createNativeStackNavigator<TransactionNavigationType>();

const TransactionStackNavigator = () => {
  return (
    <TransactionStack.Navigator screenOptions={{headerShown: false}}>
      <TransactionStack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
      />
    </TransactionStack.Navigator>
  );
};

export default TransactionStackNavigator;
