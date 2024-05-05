import React from 'react';
import {TabStack} from '.';
import {Image, StyleSheet} from 'react-native';
import {ColorConst, ImageConst, hp} from '../utils';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './homeStackNavigator/HomeStackNavigator';
import TransactionNavigator from './transactionNavigator/TransactionNavigator';
import ProfileStackNavigator from './profileStackNavigator/ProfileStackNavigator';

const Tab = createBottomTabNavigator<TabStack>();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused ? ImageConst.home_focuse_ic : ImageConst.home_ic
                }
                style={styles.iconStyle}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? ImageConst.transaction_focuse_ic
                    : ImageConst.transaction_ic
                }
                style={styles.iconStyle}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused ? ImageConst.profile_focuse_ic : ImageConst.profile_ic
                }
                style={styles.iconStyle}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorConst.white,
  },
  textStyle: {
    marginTop: hp(1),
  },
  iconStyle: {
    width: hp(3),
    height: hp(3),
  },
});
