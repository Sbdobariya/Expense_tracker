import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {MainNavigatorType, RootPage, TabStack} from '../../../navigation/type';
import {useDispatch, useSelector} from 'react-redux';
import {
  AuthReducerType,
  DeleteDataType,
  GroupedTransactions,
  StateProps,
  TransactionData,
  TransactionReducerType,
} from '../../../interface';
import {AccountDetailTimeStamp} from '../../../hooks';
import moment from 'moment';
import {useState} from 'react';
import {DeleteTransactions} from '../../../redux/actions';
import {EditTransactionData} from '../../../redux/reducer';

export const useAccountDetail = () => {
  const navigation = useNavigation<NavigationProp<MainNavigatorType>>();
  const tabNavigation = useNavigation<NavigationProp<TabStack>>();
  const route =
    useRoute<RouteProp<MainNavigatorType, RootPage.AccountDetails>>();
  const dispatch = useDispatch();
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );
  const {params} = route.params;
  const {transactionData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );
  const filteredData: TransactionData[] = transactionData.filter(
    item => item.transaction_account?.name === params.accountName,
  );

  const [isVisibleEditModal, setIsVisibleEditModal] = useState<StateProps>({
    isVisible: false,
    item: undefined,
  });

  const groupTransactionsByDate = (
    transactions: TransactionData[],
  ): GroupedTransactions => {
    return transactions.reduce(
      (acc: GroupedTransactions, transaction: TransactionData) => {
        const formattedDate = AccountDetailTimeStamp(
          transaction.transaction_createdAt,
        );
        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate].push({
          transaction_category: transaction.transaction_category,
          transaction_amount: transaction.transaction_amount,
          transaction_note: transaction.transaction_note,
          transaction_createdAt: moment(transaction.timestamp).format('h:mm A'),
          transaction_mode: transaction.transaction_mode,
          transaction_invoice: transaction.transaction_invoice,
          transaction_account: transaction.transaction_account,
          timestamp: transaction.timestamp,
          transaction_id: transaction.transaction_id,
        });
        return acc;
      },
      {},
    );
  };

  const groupedTransactions = groupTransactionsByDate(filteredData);

  const formattedData = Object.keys(groupedTransactions).map(date => ({
    date,
    transactions: groupedTransactions[date],
  }));

  const onBackPress = () => {
    navigation.goBack();
  };

  const onTransactionPress = (item: TransactionData) => {
    setIsVisibleEditModal({
      isVisible: true,
      item: item,
    });
  };
  const onDeletePress = (item: TransactionData) => {
    const request: DeleteDataType = {
      item: item,
      id: userData?.userID,
    };
    dispatch(DeleteTransactions(request) as any);
    setIsVisibleEditModal({
      isVisible: false,
      item: undefined,
    });
  };

  const onEditPress = (item: TransactionData) => {
    dispatch(EditTransactionData(item));
    setIsVisibleEditModal({
      isVisible: false,
      item: undefined,
    });
    tabNavigation.navigate(RootPage.AddTransaction, {
      screen: RootPage.AddTransactionScreen,
    });
  };

  const toggleModal = () =>
    setIsVisibleEditModal({isVisible: false, item: undefined});

  return {
    params,
    onBackPress,
    onEditPress,
    toggleModal,
    formattedData,
    onDeletePress,
    onTransactionPress,
    isVisibleEditModal,
  };
};
