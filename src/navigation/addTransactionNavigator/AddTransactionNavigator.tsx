import React from 'react';
import {AddTransactionNavigationType} from '../type';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTransactionScreen from '../../screens/addTransaction/AddTransactionScreen';

const TransactionStack =
  createNativeStackNavigator<AddTransactionNavigationType>();

const AddTransactionNavigator = () => {
  return (
    <TransactionStack.Navigator screenOptions={{headerShown: false}}>
      <TransactionStack.Screen
        name="AddTransactionScreen"
        component={AddTransactionScreen}
      />
    </TransactionStack.Navigator>
  );
};

export default AddTransactionNavigator;
