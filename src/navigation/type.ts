import {ModifiedData} from '../interface';

export enum RootPage {
  Home = 'Home',
  Profile = 'Profile',
  TabStack = 'TabStack',
  AuthStack = 'AuthStack',
  HomeScreen = 'HomeScreen',
  OnBoarding = 'onBoarding',
  Statistics = 'Statistics',
  LoginScreen = 'LoginScreen',
  Transaction = 'Transaction',
  SignUpScreen = 'SignUpScreen',
  AccountScreen = 'AccountScreen',
  ProfileScreen = 'ProfileScreen',
  AccountDetails = 'AccountDetails',
  AddTransaction = 'AddTransaction',
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
  [RootPage.TabStack]: TabStack;
  [RootPage.AccountScreen]: undefined;
  [RootPage.AccountDetails]: {
    params: ModifiedData;
  };
  [RootPage.AuthStack]: AuthNavigationType;
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
  [RootPage.TransactionScreen]: {someParam: string};
};
export type AddTransactionNavigationType = {
  [RootPage.AddTransactionScreen]: undefined;
};

export type TabStack = {
  [RootPage.Home]: HomeNavigationType;
  [RootPage.Profile]: ProfileNavigationType;
  [RootPage.Statistics]: StatisticsNavigationType;
  [RootPage.Transaction]: {
    screen: keyof TransactionNavigationType;
  };
  [RootPage.AddTransaction]: {
    screen: keyof AddTransactionNavigationType;
  };
};
