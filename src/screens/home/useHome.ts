import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditTransactionData} from '../../redux/reducer';
import {RootPage, TabStack} from '../../navigation/type';
import {DeleteTransactions, GetTransactionAction} from '../../redux/actions';
import {
  AuthReducerType,
  DeleteDataType,
  GetTransaction,
  StateProps,
  TransactionData,
  TransactionReducerType,
} from '../../interface';

export const useHome = () => {
  const IsFocuse = useIsFocused();
  const dispatch = useDispatch();
  const tabNavigation = useNavigation<NavigationProp<TabStack>>();

  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );
  const {transactionData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );

  const [isVisibleEditModal, setIsVisibleEditModal] = useState<StateProps>({
    isVisible: false,
    item: undefined,
  });
  useEffect(() => {
    const fetchData = async () => {
      if (userData?.userID && IsFocuse) {
        const data: GetTransaction = {
          data: {
            user_data: userData,
          },
          onSuccess: _response => {},
          onFail: error => {
            Alert.alert(JSON.stringify(error));
          },
        };
        dispatch(GetTransactionAction(data) as any);
      }
    };

    fetchData();
  }, [userData, IsFocuse, dispatch]);

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

  const toggleModal = () =>
    setIsVisibleEditModal({isVisible: false, item: undefined});

  return {
    onEditPress,
    toggleModal,
    onDeletePress,
    transactionData,
    isVisibleEditModal,
    onTransactionPress,
  };
};
