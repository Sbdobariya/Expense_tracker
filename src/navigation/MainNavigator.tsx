import {useDispatch} from 'react-redux';
import TabNavigation from './TabNavigation';
import {SignUpAction} from '../redux/reducer';
import React, {useEffect, useState} from 'react';
import {MainNavigatorType, RootPage} from './type';
import {userDataType} from '../interface/AuthInterface';
import {NavigationContainer} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AuthStackNavigator from './authStackNavigator/AuthStackNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainNavigatorType>();

const MainNavigator: React.FC = () => {
  const dispatch = useDispatch();

  const [isUser, setIsUser] = useState(false);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      try {
        const userData: userDataType = {
          userID: user.uid,
          userEmail: user.email || '',
          userName: user.displayName || '',
        };
        dispatch(SignUpAction(userData));
        setIsUser(true);
      } catch (error) {
        console.log('error----------', error);
      }
    } else {
      // setIsUser(false);
    }
  };
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isUser ? (
          <Stack.Screen name={RootPage.TabStack} component={TabNavigation} />
        ) : (
          <Stack.Screen
            name={RootPage.AuthStack}
            component={AuthStackNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
