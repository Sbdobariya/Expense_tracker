import {GetData} from '../utils';
import {useDispatch} from 'react-redux';
import {UserDataType} from '../interface';
import TabNavigation from './TabNavigation';
import {SignUpAction} from '../redux/reducer';
import React, {useEffect, useState} from 'react';
import {AuthContext} from '../utils/AuthContext';
import {MainNavigatorType, RootPage} from './type';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStackNavigator from './authStackNavigator/AuthStackNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AccountScreen} from '../screens';

const Stack = createNativeStackNavigator<MainNavigatorType>();

const MainNavigator = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState<UserDataType | undefined>();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const getUserData = await GetData('userData');
    if (getUserData !== undefined) {
      const parsedUserData = JSON.parse(getUserData);
      setUserData(parsedUserData);
      dispatch(SignUpAction(parsedUserData));
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: UserDataType) => {
        setUserData(data);
      },
      signOut: () => {
        try {
          setUserData(undefined);
          AsyncStorage.clear();
        } catch (error) {
          console.log('error----------', error);
        }
      },
      signUp: async (data: UserDataType) => {
        setUserData(data);
      },
    }),
    [],
  );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {userData === undefined ? (
            <Stack.Screen
              name={RootPage.AuthStack}
              component={AuthStackNavigator}
            />
          ) : (
            <>
              <Stack.Screen
                name={RootPage.TabStack}
                component={TabNavigation}
              />
              <Stack.Screen
                name={RootPage.AccountScreen}
                component={AccountScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default MainNavigator;
