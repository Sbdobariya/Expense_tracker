export type AuthNavigationType = {
  onBoarding: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

export type MainNavigatorType = {
  TabStack: TabStack;
  AuthStack: AuthNavigationType;
  AddTransactionScreen: undefined;
};

export type HomeNavigationType = {
  HomeScreen: undefined;
};
export type TransactionNavigationType = {
  TransactionScreen: undefined;
};
export type ProfileNavigationType = {
  ProfileScreen: undefined;
};

export type TabStack = {
  Home: HomeNavigationType;
  Profile: ProfileNavigationType;
  Transaction: TransactionNavigationType;
};
