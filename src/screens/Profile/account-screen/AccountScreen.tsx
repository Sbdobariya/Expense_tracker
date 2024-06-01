import {FlatList, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './AccountScreenStyle';
import {useAccount} from './useAccount';
import {ProfileStrings} from '../../../constants/String';
import {CommonHeader} from '../../../components';
import AmountText from '../../../components/common/AmountText';
import {TransactionAccountData} from '../../../utils';

const AccountScreen: React.FC = () => {
  const {onBackPress, totalIncomeExpense, transactionData} = useAccount();

  return (
    <View style={styles.container}>
      <CommonHeader title={'Accounts'} onPress={onBackPress} />
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.balanceText}>
            {ProfileStrings.account_balance}
          </Text>
          <AmountText
            num={totalIncomeExpense}
            customRupeeIcon={styles.customRupeeIcon}
            customNumStyle={styles.totalBalanceText}
          />
        </View>
        <FlatList
          data={TransactionAccountData}
          renderItem={({index, item}) => {
            return (
              <View>
                <Text>{item.name}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default AccountScreen;
