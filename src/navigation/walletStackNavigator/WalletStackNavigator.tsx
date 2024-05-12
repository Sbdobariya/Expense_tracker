import React from 'react';
import {WalletNavigationType} from '..';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WalletScreen from '../../screens/wallet/WalletScreen';

const WalletStack = createNativeStackNavigator<WalletNavigationType>();

const WalletStackNavigator = () => {
  return (
    <WalletStack.Navigator screenOptions={{headerShown: false}}>
      <WalletStack.Screen name="WalletScreen" component={WalletScreen} />
    </WalletStack.Navigator>
  );
};

export default WalletStackNavigator;
