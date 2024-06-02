import {
  HomeStackNavigator,
  ProfileStackNavigator,
  AddTransactionNavigator,
  StatisticsStackNavigator,
} from './index';
import React from 'react';
import {ColorConst, hp} from '../theme';
import {RootPage, TabStack} from './type';
import {Image, Platform, StyleSheet} from 'react-native';
import {AuthImages, HomeImages} from '../../assets';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TransactionStackNavigator from './transactionStackNavigator/TransactionStackNavigator';

const Tab = createBottomTabNavigator<TabStack>();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: hp(9),
        },
      }}>
      <Tab.Screen
        name={RootPage.Home}
        component={HomeStackNavigator}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={focused ? AuthImages.home_focus_ic : AuthImages.home_ic}
                style={styles.iconStyle}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={RootPage.Transaction}
        component={TransactionStackNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? AuthImages.transaction_focus_ic
                    : AuthImages.transaction_ic
                }
                style={styles.iconStyle}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={RootPage.AddTransaction}
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
                source={HomeImages.add_category_ic}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={RootPage.Statistics}
        component={StatisticsStackNavigator}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? AuthImages.statistics_focus_icon
                    : AuthImages.statistics_ic
                }
                style={styles.iconStyle}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={RootPage.Profile}
        component={ProfileStackNavigator}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused ? AuthImages.profile_focus_ic : AuthImages.profile_ic
                }
                style={styles.iconStyle}
                resizeMode="contain"
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
    width: hp(4),
    height: hp(4),
  },
  addIconStyle: {
    width: hp(7),
    height: hp(7),
    marginBottom: Platform.OS === 'ios' ? hp(5) : hp(10),
  },
});
