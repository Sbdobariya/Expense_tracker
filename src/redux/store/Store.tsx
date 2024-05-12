import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from '../reducer/auth/AuthReducer';
import TransactionReducer from '../reducer/transactions/TransactionReducer';

const MyStore = configureStore({
  reducer: {
    authReducer: AuthReducer as any,
    transactionReducer: TransactionReducer as any,
  },
});

export default MyStore;
