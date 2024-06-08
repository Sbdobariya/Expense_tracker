import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AuthReducerType,
  DeleteDataType,
  StateProps,
  TransactionData,
  TransactionReducerType,
} from '../../interface';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootPage, TabStack} from '../../navigation/type';
import moment from 'moment';
import {EditTransactionData} from '../../redux/reducer';
import {DeleteTransactions} from '../../redux/actions';

export const useTransactions = () => {
  const {transactionData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );
  const tabNavigation = useNavigation<NavigationProp<TabStack>>();
  const Today = moment(new Date()).format('YYYY-MM-DD');
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );
  const dispatch = useDispatch();
  const [isVisibleEditModal, setIsVisibleEditModal] = useState<StateProps>({
    isVisible: false,
    item: undefined,
  });
  const [applyFilter, setApplyFilter] = useState(false);
  const [allTransactions, setAllTransactions] = useState<TransactionData[]>([]);
  const [selectedDate, setSelectedDate] = useState(Today);

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

  useEffect(() => {
    if (applyFilter) {
      const filterData = transactionData.filter(
        item => item.transaction_createdAt === Today,
      );
      setAllTransactions(filterData);
    } else {
      setAllTransactions(transactionData);
    }
  }, [applyFilter, transactionData, Today]);

  useEffect(() => {
    setAllTransactions(transactionData);
  }, [transactionData]);

  const onDateChanged = (date: string) => {
    const filterData = transactionData.filter(
      item => item.transaction_createdAt === date,
    );
    setAllTransactions(filterData);
    setSelectedDate(date);
  };

  const handleFilterToggle = () => {
    setApplyFilter(!applyFilter);
    if (applyFilter) {
      setAllTransactions(transactionData);
    }
    setSelectedDate('2024-06-03');
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

  const onTransactionPress = (item: TransactionData) => {
    setIsVisibleEditModal({
      isVisible: true,
      item: item,
    });
  };

  const toggleModal = () =>
    setIsVisibleEditModal({isVisible: false, item: undefined});

  return {
    applyFilter,
    onEditPress,
    toggleModal,
    selectedDate,
    onDateChanged,
    onDeletePress,
    allTransactions,
    handleFilterToggle,
    onTransactionPress,
    isVisibleEditModal,
  };
};
