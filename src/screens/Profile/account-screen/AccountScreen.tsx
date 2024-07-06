import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './AccountScreenStyle';
import {useAccount} from './useAccount';
import {ProfileStrings} from '../../../constants/String';
import {
  AmountText,
  CategoryIcons,
  CommonHeader,
  CustomStatusBar,
} from '../../../components';
import {ModifiedData} from '../../../interface';
import {ColorConst, hp} from '../../../theme';
import {IsImageURl} from '../../../hooks';

const AccountScreen: React.FC = () => {
  const {onBackPress, totalIncomeExpense, accountData, onAccountListPress} =
    useAccount();

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={ColorConst.status_bar}
        barStyle="dark-content"
      />
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
          style={styles.flatListStyle}
          renderItem={({item}: {item: ModifiedData}) => {
            const isURL = IsImageURl(item.accountImage as string);
            return (
              <TouchableOpacity
                style={styles.listContainer}
                onPress={() => onAccountListPress(item)}>
                <View style={styles.listSubContainer}>
                  {isURL ? (
                    <Image
                      source={{uri: item.accountImage as string}}
                      style={styles.imageURL}
                    />
                  ) : item.accountImage ? (
                    <CategoryIcons imageSource={item.accountImage} />
                  ) : null}

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
