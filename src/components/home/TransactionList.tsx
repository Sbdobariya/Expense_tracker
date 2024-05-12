import React from 'react';
import {transactionTimeStamp} from '../../hooks';
import {fontSize, fonts, hp, wp} from '../../utils';
import {TransactionData} from '../../interface/Transaction';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface props {
  index: number;
  item: TransactionData;
  onTransactionPress: (item: TransactionData) => void;
}

const TransactionList = ({item, index, onTransactionPress}: props) => {
  const bgColor =
    '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0');
  const color = item.transaction_mode == 'income' ? '#25A969' : 'red';
  return (
    <TouchableOpacity
      style={styles.renderItemContainer}
      key={index}
      onPress={() => onTransactionPress(item)}>
      <View style={styles.itemSubContaine}>
        <View
          style={[
            styles.categoryImageView,
            {
              backgroundColor: bgColor,
            },
          ]}>
          <Image
            source={item?.transaction_category?.image}
            style={styles.categoryImge}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.categoryText}>
            {item.transaction_category?.name}
          </Text>
          <Text style={styles.timeStamp}>
            {transactionTimeStamp(item.transaction_createdAt)}
          </Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <Text
          style={[
            styles.IEIcon,
            {
              color: color,
            },
          ]}>
          {item.transaction_mode == 'income' ? '+' : '-'}
        </Text>
        <Text
          style={[
            styles.IEIcon,
            {
              color: color,
            },
          ]}>
          {item.transaction_amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  renderItemContainer: {
    padding: hp(1),
    flexDirection: 'row',
    marginVertical: hp(0.5),
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
  },
  itemSubContaine: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    color: '#000',
    fontSize: fontSize(18),
    fontFamily: fonts.semiBold,
  },
  timeStamp: {
    color: '#666666',
    marginTop: hp(0.6),
    fontFamily: fonts.regular,
  },
  categoryImageView: {
    width: hp(5),
    height: hp(5),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImge: {
    width: hp(3),
    height: hp(3),
    borderRadius: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(0.4),
  },
  IEIcon: {
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
  },
});
