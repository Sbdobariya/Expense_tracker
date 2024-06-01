import {createSlice} from '@reduxjs/toolkit';
import {AuthReducerType} from '../../../interface';

const initialState: AuthReducerType = {
  userData: {},
  isLoading: false,
};

const AuthReducer = createSlice({
  name: 'AuthReducer',
  initialState,
  reducers: {
    SignUpAction: (state, action) => {
      state.userData = action.payload;
    },
    AuthLoader: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {SignUpAction, AuthLoader} = AuthReducer.actions;

export default AuthReducer.reducer;
