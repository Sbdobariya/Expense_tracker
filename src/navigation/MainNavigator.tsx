import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../utils/AuthContext';
import {TransactionAction, userDataAction} from '../redux/reducer';
import {UserDataType} from '../interface';
import {MainNavigatorType, RootPage} from './type';
import TabNavigation from './TabNavigation';
import AuthStackNavigator from './authStackNavigator/AuthStackNavigator';
import {AccountDetails, AccountScreen, ExportDataScreen} from '../screens';

const Stack = createNativeStackNavigator<MainNavigatorType>();

const MainNavigator = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserDataType | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const getUserData = await AsyncStorage.getItem('userData');
      if (getUserData !== null) {
        const parsedUserData = JSON.parse(getUserData);
        setUserData(parsedUserData);
        dispatch(userDataAction(parsedUserData));
      }
    } catch (error) {
      console.error('Error fetching user data from AsyncStorage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: UserDataType) => {
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(data));
          setUserData(data);
        } catch (error) {
          console.error('Error saving user data to AsyncStorage:', error);
        }
      },
      signOut: () => {
        try {
          AsyncStorage.removeItem('userData');
          setUserData(undefined);
          dispatch(userDataAction({}));
          dispatch(TransactionAction([]));
        } catch (error) {
          console.error('Error clearing user data from AsyncStorage:', error);
        }
      },
      signUp: async (data: UserDataType) => {
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(data));
          setUserData(data);
        } catch (error) {
          console.error('Error saving user data to AsyncStorage:', error);
        }
      },
    }),
    [],
  );

  if (isLoading) {
    return null;
  }

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
              <Stack.Screen
                name={RootPage.AccountDetails}
                component={AccountDetails}
              />
              <Stack.Screen
                name={RootPage.ExportDataScreen}
                component={ExportDataScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default MainNavigator;
