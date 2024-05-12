import {
  DeleteDataType,
  GetTransaction,
  TransactionData,
  TransactionReducerType,
} from '../../interface/Transaction';
import React, {useEffect, useState} from 'react';
import {HomeNavigationType} from '../../navigation';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {AuthReducerType} from '../../interface/AuthInterface';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ColorConst, StringConst, fontSize, fonts, hp, wp} from '../../utils';
import {
  DeteleTransactions,
  GetTransactionAction,
} from '../../redux/actions/addTransaction/AddTransaction';
import {
  HomeCard,
  HomeHeader,
  TransactionList,
  EditCategoryModal,
} from '../../components';
import {EditTransactionData} from '../../redux/reducer/transactions/TransactionReducer';

type Home = NativeStackScreenProps<HomeNavigationType, 'HomeScreen'> & {
  navigation: () => void;
};

interface stateProps {
  isVisible: boolean;
  item?: TransactionData;
}

const HomeScreen: React.FC<Home> = (props: Home) => {
  const {navigation} = props;
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
    if (userData?.userID && IsFocuse) {
      const transactionData: GetTransaction = {
        data: {
          user_data: userData,
        },
        onSuccess: response => {
          if (response) {
          }
        },
        onFail: error => {
          Alert.alert(JSON.stringify(error));
        },
      };
      dispatch(GetTransactionAction(transactionData) as any);
    }
  }, [userData, IsFocuse]);

  const onSeeAllPress = () => {
    navigation.navigate('Wallet');
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText1}>
          {StringConst.transactions_history}
        </Text>
        <Text onPress={onSeeAllPress} style={styles.seeAllText}>
          {StringConst.see_all}
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
    navigation.navigate('Transaction');
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
        style={{
          marginTop: hp(1.5),
        }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  headerContainer: {
    marginTop: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    justifyContent: 'space-between',
  },
  itemSubContaine: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText1: {
    color: '#000',
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
  },
  seeAllText: {
    color: 'red',
    fontSize: fontSize(15),
    textDecorationLine: 'underline',
    fontFamily: fonts.regular,
  },
  categoryImge: {
    width: hp(3),
    height: hp(3),
    borderRadius: 10,
  },
});
