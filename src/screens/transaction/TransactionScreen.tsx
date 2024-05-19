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
  PopOverModal,
  TouchableIcon,
  TransactionList,
  EditCategoryModal,
} from '../../components';
import {
  DeleteDataType,
  TransactionData,
  TransactionReducerType,
} from '../../interface/Transaction';
import {TabStack} from '../../navigation/type';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DeteleTransactions} from '../../redux/actions';
import {EditTransactionData} from '../../redux/reducer';
import {ImageConst, fontSize, fonts, hp} from '../../utils';
import {calendarProviderDate} from '../../hooks/CommanHooks';
import {AuthReducerType} from '../../interface/AuthInterface';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CalendarProvider, ExpandableCalendar} from 'react-native-calendars';

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
          source={ImageConst.empty_transaction_ic}
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
        <View style={styles.headerContainer}>
          <Text>My Money</Text>
          <View style={styles.popoverView}>
            <PopOverModal
              popupText={applyFilter ? 'Reset Filter ' : 'Apply Filter'}
              onPopupPress={() => {
                setApplyFilter(!applyFilter);
                if (applyFilter) {
                  setAllTransactions(transactionData);
                }
              }}
              source={ImageConst.menu_ic}
            />
            <TouchableIcon source={ImageConst.search_ic} />
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
  emptyComponentContainer: {
    marginTop: hp(10),
    alignItems: 'center',
  },
  emptyImageStyle: {
    width: hp(10),
    height: hp(10),
  },
  calenderStyle: {
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
    shadowRadius: 1.0,
    shadowOpacity: 0.18,
  },
  customeIconStyle: {
    width: hp(2),
    height: hp(2),
  },
  rightArrowContainer: {
    gap: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    padding: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popoverView: {
    gap: hp(2),
    flexDirection: 'row',
  },
});
