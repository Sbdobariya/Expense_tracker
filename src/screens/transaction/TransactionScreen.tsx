import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CalendarProvider, ExpandableCalendar} from 'react-native-calendars';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import {
  DeleteDataType,
  TransactionData,
  TransactionReducerType,
} from '../../interface/Transaction';
import {TabStack} from '../../navigation/type';
import {DeteleTransactions} from '../../redux/actions';
import {ImageConst, fontSize, fonts, hp} from '../../utils';
import {calendarProviderDate} from '../../hooks/CommanHooks';
import {AuthReducerType} from '../../interface/AuthInterface';
import {EditCategoryModal, TransactionList} from '../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {EditTransactionData, TransactionAction} from '../../redux/reducer';
interface stateProps {
  isVisible: boolean;
  item?: TransactionData;
}
const TransactionScreen = () => {
  const tabNavigation = useNavigation<NavigationProp<TabStack>>();

  const {transactionData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );

  const dispatch = useDispatch();
  const [isVisibleEditModal, setIsVisibleEditModal] = useState<stateProps>({
    isVisible: false,
    item: undefined,
  });

  const onDateChanged = (newDate: string) => {
    const filterdata = transactionData.filter(
      item =>
        moment.unix(item.transaction_createdAt.seconds).format('YYYY-MM-DD') ===
        newDate,
    );
    dispatch(TransactionAction(filterdata));
  };

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          marginTop: hp(10),
          alignItems: 'center',
        }}>
        <Image
          source={ImageConst.empty_transaction_ic}
          style={{height: hp(10), width: hp(10)}}
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
    tabNavigation.navigate('AddTransaction');
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
      <SafeAreaView />
      <CalendarProvider
        date={calendarProviderDate()}
        onDateChanged={onDateChanged}>
        <ExpandableCalendar firstDay={1} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainerText: {
    marginTop: hp(2),
    fontSize: fontSize(20),
    fontFamily: fonts.medium,
  },
});
