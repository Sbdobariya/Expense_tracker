import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './AccountScreenStyle';
import {useAccount} from './useAccount';
import {ProfileStrings} from '../../../constants/String';
import {AmountText, CategoryIcons, CommonHeader} from '../../../components';
import {ModifiedData} from '../../../interface';

const AccountScreen: React.FC = () => {
  const {onBackPress, totalIncomeExpense, accountData, onAccountListPress} =
    useAccount();

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
          bounces={false}
          data={accountData}
          style={styles.flatlistStyle}
          renderItem={({item}: {item: ModifiedData}) => {
            return (
              <TouchableOpacity
                style={styles.listContainer}
                onPress={() => onAccountListPress(item)}>
                <View style={styles.listSubContainer}>
                  {item.accountImage && (
                    <CategoryIcons imageSource={item.accountImage} />
                  )}
                  <Text style={styles.accountName}>{item.accountName}</Text>
                </View>
                <AmountText
                  num={item.transactionAmount}
                  customNumStyle={styles.transactionAmount}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default AccountScreen;
