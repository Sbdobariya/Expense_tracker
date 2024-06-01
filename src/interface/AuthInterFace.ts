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

export interface UserDataType {
  userID?: string;
  userName?: string;
  userEmail?: string;
}

export interface AuthReducerType {
  isLoading: boolean;
  userData?: UserDataType;
}
