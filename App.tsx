import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import MyStore from './src/redux/store/Store';
import SplashScreen from 'react-native-splash-screen';
import MainNavigator from './src/navigation/MainNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={MyStore}>
      <MainNavigator />
      <Toast position="top" />
    </Provider>
  );
};

export default App;
