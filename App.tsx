import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import MyStore from './src/redux/store/Store';
import SplashScreen from 'react-native-splash-screen';
import MainNavigator from './src/navigation/MainNavigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={MyStore}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
