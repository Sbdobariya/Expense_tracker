import React, {useEffect, useState} from 'react';
import {MainNavigatorType} from '.';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './authStackNavigator/AuthStackNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {userDataType} from '../interface/AuthInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {GetData} from '../utils';
import {SignUpAction} from '../redux/reducer/auth/AuthReducer';
import TabNavigation from './TabNavigation';
import {AuthContext} from '../utils/AuthContext';

const Stack = createNativeStackNavigator<MainNavigatorType>();

const MainNavigator = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState<userDataType | undefined>();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const getUserData = await GetData('userData');
    if (getUserData !== undefined) {
      setUserData(JSON.parse(getUserData));
      dispatch(SignUpAction(JSON.parse(getUserData)));
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: userDataType) => {
        setUserData(data);
      },
      signOut: () => {
        setUserData(undefined);
        AsyncStorage.clear();
      },
      signUp: async (data: userDataType) => {
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
            <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
          ) : (
            <>
              <Stack.Screen name="TabStack" component={TabNavigation} />
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default MainNavigator;
