import moment from 'moment';
import {
  PopOverModal,
  TouchableIcon,
  TransactionList,
  EditCategoryModal,
} from '../../components';
import {styles} from './TransactionScreenStyle';
import {TransactionImages} from '../../../assets';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteTransactions} from '../../redux/actions';
import {EditTransactionData} from '../../redux/reducer';
import {RootPage, TabStack} from '../../navigation/type';
import {Text, View, Image, FlatList, SafeAreaView} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CalendarProvider, ExpandableCalendar} from 'react-native-calendars';
import {
  AuthReducerType,
  DeleteDataType,
  StateProps,
  TransactionData,
  TransactionReducerType,
} from '../../interface';
import {CalendarProviderDate} from '../../hooks';

const TransactionScreen: React.FC = () => {
  const tabNavigation = useNavigation<NavigationProp<TabStack>>();
  const {transactionData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );
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
  const Today = moment(new Date()).format('YYYY-MM-DD');

  useEffect(() => {
    setAllTransactions(transactionData);
  }, [transactionData]);

  useEffect(() => {
    if (applyFilter) {
      const filterdata = transactionData.filter(
        item => item.transaction_createdAt === Today,
      );
      setAllTransactions(filterdata);
    }
  }, [applyFilter, transactionData, Today]);

  const onDateChanged = (newDate: string) => {
    const filterdata = transactionData.filter(
      item => item.transaction_createdAt === newDate,
    );
    setAllTransactions(filterdata);
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentContainer}>
        <Image
          source={TransactionImages.empty_transaction_ic}
          style={styles.emptyImageStyle}
          resizeMode="contain"
        />
        <Text style={styles.emptyContainerText}>
          No analysis for this month
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
    dispatch(DeleteTransactions(request) as any);
    setIsVisibleEditModal({
      isVisible: false,
      item: undefined,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CalendarProvider
        date={CalendarProviderDate()}
        onDateChanged={onDateChanged}>
        <View style={styles.headerContainer}>
          <Text style={styles.myMoney}>My Money</Text>
          <View style={styles.popoverView}>
            <PopOverModal
              popupText={applyFilter ? 'Reset Filter ' : 'Apply Filter'}
              onPopupPress={() => {
                setApplyFilter(!applyFilter);
                if (applyFilter) {
                  setAllTransactions(transactionData);
                }
              }}
              source={TransactionImages.menu_ic}
            />
            <TouchableIcon source={TransactionImages.search_ic} />
          </View>
        </View>
        {applyFilter && (
          <ExpandableCalendar firstDay={1} style={styles.calenderStyle} />
        )}
        <FlatList
          data={allTransactions}
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
          ListEmptyComponent={ListEmptyComponent}
        />
      </CalendarProvider>
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

export default TransactionScreen;
