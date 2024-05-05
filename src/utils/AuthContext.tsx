import * as React from 'react';
import {userDataType} from '../interface/AuthInterface';

interface authContext {
  signIn: (data: userDataType) => Promise<void>;
  signOut: () => void;
  signUp: (data: userDataType) => Promise<void>;
}

export const AuthContext = React.createContext<authContext>({} as authContext);
