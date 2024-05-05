import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from '../reducer/auth/AuthReducer';

const MyStore = configureStore({
  reducer: {
    authReducer: AuthReducer as any,
  },
});

export default MyStore;
