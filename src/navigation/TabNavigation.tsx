import React from 'react';
import {
  HomeStackNavigator,
  ProfileStackNavigator,
  AddTransactionNavigator,
  StatisticsStackNavigator,
} from './index';
import {TabStack} from './type';
import {Image, StyleSheet} from 'react-native';
import {ColorConst, ImageConst, hp} from '../utils';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TransactionStackNavigator from './transactionStackNavigator/TransactionStackNavigator';

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
        component={TransactionStackNavigator}
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
        name="AddTransaction"
        component={AddTransactionNavigator}
        options={{
          unmountOnBlur: true,
          tabBarStyle: {
            display: 'none',
          },
          tabBarIcon: ({}) => {
            return (
              <Image
                style={styles.addIconStyle}
                source={ImageConst.add_category_ic}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsStackNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? ImageConst.statitics_focuse_icon
                    : ImageConst.staitics_ic
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
  addIconStyle: {
    width: hp(6),
    height: hp(6),
    marginBottom: hp(5),
  },
});
