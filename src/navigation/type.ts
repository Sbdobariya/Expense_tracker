export enum RootPage {
  OnBoarding = 'onBoarding',
  LoginScreen = 'LoginScreen',
  SignUpScreen = 'SignUpScreen',
  HomeScreen = 'HomeScreen',
  ProfileScreen = 'ProfileScreen',
  StatisticsScreen = 'StatisticsScreen',
  TransactionScreen = 'TransactionScreen',
  AddTransactionScreen = 'AddTransactionScreen',
}

export type AuthNavigationType = {
  [RootPage.OnBoarding]: undefined;
  [RootPage.LoginScreen]: undefined;
  [RootPage.SignUpScreen]: undefined;
};

export type MainNavigatorType = {
  TabStack: TabStack;
  AuthStack: AuthNavigationType;
  AddTransactionScreen: undefined;
};

export type HomeNavigationType = {
  [RootPage.HomeScreen]: undefined;
};
export type ProfileNavigationType = {
  [RootPage.ProfileScreen]: undefined;
};
export type StatisticsNavigationType = {
  [RootPage.StatisticsScreen]: undefined;
};
export type TransactionNavigationType = {
  [RootPage.TransactionScreen]: undefined;
};
export type AddTransactionNavigationType = {
  [RootPage.AddTransactionScreen]: undefined;
};

export type TabStack = {
  Home: HomeNavigationType;
  Profile: ProfileNavigationType;
  Statistics: StatisticsNavigationType;
  Transaction: TransactionNavigationType;
  AddTransaction: AddTransactionNavigationType;
};
