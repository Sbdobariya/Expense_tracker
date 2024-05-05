import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TransactionNavigationType} from '..';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransactionScreen from '../../screens/transaction/TransactionScreen';

const TransactionStack =
  createNativeStackNavigator<TransactionNavigationType>();

const TransactionNavigator = () => {
  return (
    <TransactionStack.Navigator screenOptions={{headerShown: false}}>
      <TransactionStack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
      />
    </TransactionStack.Navigator>
  );
};

export default TransactionNavigator;

const styles = StyleSheet.create({});
