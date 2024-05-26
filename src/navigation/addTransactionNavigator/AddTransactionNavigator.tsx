import React from 'react';
import {AddTransactionScreen} from '../../screens';
import {AddTransactionNavigationType, RootPage} from '../type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TransactionStack =
  createNativeStackNavigator<AddTransactionNavigationType>();

const AddTransactionNavigator = () => {
  return (
    <TransactionStack.Navigator screenOptions={{headerShown: false}}>
      <TransactionStack.Screen
        name={RootPage.AddTransactionScreen}
        component={AddTransactionScreen}
      />
    </TransactionStack.Navigator>
  );
};

export default AddTransactionNavigator;
