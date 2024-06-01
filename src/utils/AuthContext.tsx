import * as React from 'react';
import {UserDataType} from '../interface';

interface authContext {
  signIn: (data: UserDataType) => Promise<void>;
  signOut: () => void;
  signUp: (data: UserDataType) => Promise<void>;
}

export const AuthContext = React.createContext<authContext>({} as authContext);
