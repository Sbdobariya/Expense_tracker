import React from 'react';
import {TransactionTimeStamp} from '../../hooks';
import {TransactionData} from '../../interface';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fontSize, fonts, hp, wp} from '../../theme';
import CategoryIcons from '../common/CategoryIcons';
import {HomeImages} from '../../../assets';
import TouchableIcon from '../common/TouchableIcon';

interface Props {
  index: number;
  disabled?: boolean;
  item: TransactionData;
  onTransactionPress?: (item: TransactionData) => void;
  onInvoicePress: (item: string) => void;
}

const TransactionList: React.FC<Props> = ({
  item,
  index,
  onTransactionPress,
  disabled = false,
  onInvoicePress,
}) => {
  const color = item.transaction_mode === 'income' ? '#25A969' : 'red';

  const Notes =
    item.transaction_note.length === 0 ? 'Not Added' : item.transaction_note;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.renderItemContainer}
      key={index}
      onPress={() => onTransactionPress && onTransactionPress(item)}>
      <View style={styles.itemSubContainer}>
        {item?.transaction_category?.image && (
          <CategoryIcons imageSource={item?.transaction_category?.image} />
        )}
        <View>
          <Text style={styles.categoryText}>{Notes}</Text>
          <Text style={styles.timeStamp}>
            {TransactionTimeStamp(item.timestamp)}
          </Text>
        </View>
        {item?.transaction_invoice !== '' ? (
          <TouchableIcon
            source={HomeImages.image_ic}
            onIconPress={() => onInvoicePress(item.transaction_invoice)}
          />
        ) : null}
      </View>
      <View style={styles.subContainer}>
        <Text
          style={[
            styles.IEIcon,
            {
              color: color,
            },
          ]}>
          {item.transaction_mode === 'income' ? '+' : '-'}
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
  itemSubContainer: {
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
  categoryImage: {
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
