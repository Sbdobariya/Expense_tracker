import {
  HomeCard,
  HomeHeader,
  TransactionList,
  EditCategoryModal,
} from '../../components';
import {
  useIsFocused,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {
  DeleteDataType,
  GetTransaction,
  TransactionData,
  TransactionReducerType,
} from '../../interface/Transaction';
import {styles} from './HomeScreenStyle';
import React, {useEffect, useState} from 'react';
import {HomeStrings} from '../../constants/String';
import {useDispatch, useSelector} from 'react-redux';
import {EditTransactionData} from '../../redux/reducer';
import {RootPage, TabStack} from '../../navigation/type';
import {Alert, FlatList, Text, View} from 'react-native';
import {AuthReducerType} from '../../interface/AuthInterface';
import {DeteleTransactions, GetTransactionAction} from '../../redux/actions';

interface stateProps {
  isVisible: boolean;
  item?: TransactionData;
}

const HomeScreen: React.FC = () => {
  const tabNavigation = useNavigation<NavigationProp<TabStack>>();
  const dispatch = useDispatch();
  const IsFocuse = useIsFocused();

  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );
  const {transactionData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );

  const [isVisibleEditModal, setIsVisibleEditModal] = useState<stateProps>({
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

  const onSeeAllPress = () => {
    tabNavigation.navigate(RootPage.Transaction, {
      screen: RootPage.TransactionScreen,
    });
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText1}>
          {HomeStrings.transactions_history}
        </Text>
        <Text onPress={onSeeAllPress} style={styles.seeAllText}>
          {HomeStrings.see_all}
        </Text>
      </View>
    );
  };

  const onTransactionPress = (item: TransactionData) => {
    setIsVisibleEditModal({
      isVisible: true,
      item: item,
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
  const onDeletePress = (item: TransactionData) => {
    const request: DeleteDataType = {
      item: item,
      id: userData?.userID,
    };
    dispatch(DeteleTransactions(request) as any);
    setIsVisibleEditModal({
      isVisible: false,
      item: undefined,
    });
  };
  return (
    <View style={styles.container}>
      <HomeHeader />
      <HomeCard transactionData={transactionData} />
      <FlatList
        data={transactionData}
        renderItem={({item, index}) => {
          return (
            <TransactionList
              item={item}
              index={index}
              onTransactionPress={onTransactionPress}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        style={styles.flatlistStyle}
      />
      <EditCategoryModal
        onDeletePress={onDeletePress}
        onEditPress={onEditPress}
        isVisible={isVisibleEditModal.isVisible}
        toggleModal={() =>
          setIsVisibleEditModal({isVisible: false, item: undefined})
        }
        items={isVisibleEditModal.item || undefined}
      />
    </View>
  );
};

export default HomeScreen;
