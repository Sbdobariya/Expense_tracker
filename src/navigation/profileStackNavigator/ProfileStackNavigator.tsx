import React from 'react';
import {ProfileNavigationType, RootPage} from '../type';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ProfileStack = createNativeStackNavigator<ProfileNavigationType>();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        name={RootPage.ProfileScreen}
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
