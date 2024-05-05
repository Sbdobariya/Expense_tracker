export interface UserSignUpActionRequest {
  data: {
    userName: string;
    userEmail: string;
    userPassword: string;
  };
  onSuccess?: (res: any) => void;
  onFail?: (err: any) => void;
}

export interface UserSignInActionRequest {
  data: {
    userEmail: string;
    userPassword: string;
  };
  onSuccess?: (res: any) => void;
  onFail?: (err: any) => void;
}

export interface userDataType {
  userEmail?: string;
  userID?: string;
  userName?: string;
}

export interface AuthReducerType {
  userData?: userDataType;
  isLoading: boolean;
}
