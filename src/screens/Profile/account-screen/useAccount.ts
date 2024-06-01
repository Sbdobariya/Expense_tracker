import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainNavigatorType} from '../../../navigation/type';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {
  CategorySum,
  ModifiedData,
  TransactionReducerType,
} from '../../../interface';

export const useAccount = () => {
  const navigation = useNavigation<NavigationProp<MainNavigatorType>>();
  const {transactionData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );
  let totalIncome = 0;
  let totalExpense = 0;

  transactionData.forEach(transaction => {
    if (transaction.transaction_mode === 'income') {
      totalIncome += transaction.transaction_amount;
    } else if (transaction.transaction_mode === 'expense') {
      totalExpense += transaction.transaction_amount;
    }
  });
  const totalIncomeExpense = totalIncome - totalExpense;

  const [accountData, setAccountData] = useState<ModifiedData[]>([]);

  useEffect(() => {
    if (transactionData) {
      const categorySum: CategorySum = {};

      transactionData.forEach(item => {
        const accountName = item.transaction_account?.name;
        const transactionAmount = item.transaction_amount;
        const accountImage: ImageSourcePropType | null =
          item.transaction_account?.image ?? null;

        if (accountName) {
          if (!categorySum[accountName]) {
            categorySum[accountName] = {
              value: 0,
              image: accountImage,
            };
          }
          categorySum[accountName].value += transactionAmount;
        }
      });

      const modifiedData = Object.keys(categorySum).map(categoryName => ({
        accountName: categoryName,
        transactionAmount: categorySum[categoryName].value,
        accountImage: categorySum[categoryName].image,
      }));
      setAccountData(modifiedData);
    }
  }, [transactionData]);

  const onBackPress = () => {
    navigation.goBack();
  };

  return {
    onBackPress,
    accountData,
    transactionData,
    totalIncomeExpense,
  };
};
