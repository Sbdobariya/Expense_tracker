import {
  UserSignInActionRequest,
  UserSignUpActionRequest,
} from '../../../interface/AuthInterface';
import {StoreData} from '../../../utils';
import auth from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthLoader, SignUpAction} from '../../reducer/auth/AuthReducer';

export const UserSignUpAction = createAsyncThunk(
  'user/signup',
  async (request: UserSignUpActionRequest, {dispatch}) => {
    dispatch(AuthLoader(true));
    auth()
      .createUserWithEmailAndPassword(
        request?.data?.userEmail,
        request?.data?.userPassword,
      )
      .then(({user}) => {
        let userData = {
          userName: request?.data?.userName,
          userEmail: user?.email,
          userID: user?.uid,
        };
        StoreData('userData', JSON.stringify(userData));
        dispatch(AuthLoader(false));
        request?.onSuccess && request?.onSuccess(userData);
        dispatch(SignUpAction(userData));
        return user.updateProfile({
          displayName: request?.data?.userName,
        });
      })
      .catch(error => {
        dispatch(AuthLoader(false));
        if (error.code === 'auth/email-already-in-use') {
          request?.onFail &&
            request?.onFail('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          request?.onFail && request?.onFail('That email address is invalid!');
        }
      });
  },
);

export const UserSignInActions = createAsyncThunk(
  'user/signin',
  async (request: UserSignInActionRequest, {dispatch}) => {
    dispatch(AuthLoader(true));
    auth()
      .signInWithEmailAndPassword(
        request?.data?.userEmail,
        request?.data?.userPassword,
      )
      .then(({user}) => {
        let userData = {
          userName: user?.displayName,
          userEmail: user?.email,
          userID: user?.uid,
        };
        StoreData('userData', JSON.stringify(userData));
        request?.onSuccess && request?.onSuccess(userData);
        dispatch(SignUpAction(userData));
        dispatch(AuthLoader(false));
      })
      .catch(error => {
        dispatch(AuthLoader(false));
        request?.onFail && request?.onFail('invalid-credential');
      });
  },
);
