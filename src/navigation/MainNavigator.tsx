import React from 'react';
import {MainNavigatorType} from '.';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './authStackNavigator/AuthStackNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainNavigatorType>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
