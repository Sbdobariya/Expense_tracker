import React from 'react';
import AmountText from '../common/AmountText';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TransactionData} from '../../interface';
import {HomeImages} from '../../../assets';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';
import {HomeStrings} from '../../constants/String';

const HomeCard = ({transactionData}: {transactionData: TransactionData[]}) => {
  let totalIncome = 0;
  let totalExpense = 0;

  transactionData.forEach(transaction => {
    if (transaction.transaction_mode === 'income') {
      totalIncome += transaction.transaction_amount;
    } else if (transaction.transaction_mode === 'expense') {
      totalExpense += transaction.transaction_amount;
    }
  });

  const totalIncomeExpense = totalIncome - totalExpense;

  return (
    <LinearGradient
      colors={[ColorConst.gradient_color1, ColorConst.gradient_color2]}
      style={styles.linearGradient}>
      <View style={styles.subIncomeView}>
        <Text style={styles.totalBalance}>{HomeStrings.total_balance}</Text>
        <Image source={HomeImages.chevron_down_ic} style={styles.rupeesIcon} />
      </View>
      <AmountText
        customNumStyle={{
          fontFamily: fonts.bold,
          fontSize: fontSize(22),
        }}
        num={totalIncomeExpense}
      />
      <View style={styles.subContainer}>
        <View>
          <View style={styles.incomeView}>
            <Image source={HomeImages.downArrow_ic} style={styles.arrowImage} />
            <Text style={styles.incomeExpense}>{HomeStrings.income}</Text>
          </View>
          <AmountText num={totalIncome} customNumStyle={styles.expenseNum} />
        </View>
        <View>
          <View style={styles.incomeView}>
            <Image source={HomeImages.upArrow_ic} style={styles.arrowImage} />
            <Text style={styles.incomeExpense}>{HomeStrings.expense}</Text>
          </View>
          <AmountText num={totalExpense} customNumStyle={styles.expenseNum} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  linearGradient: {
    height: hp(22),
    padding: hp(2),
    marginTop: hp(-15),
    borderRadius: hp(3),
    marginHorizontal: wp(3),
    justifyContent: 'center',

    //
    shadowColor: '#D0E5E4',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },

  subContainer: {
    marginTop: hp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseNum: {
    color: '#fff',
    fontSize: fontSize(18),
    fontFamily: fonts.semiBold,
  },
  rupeesIcon: {
    width: hp(2),
    height: hp(2),
  },
  arrowImage: {
    width: hp(3.2),
    height: hp(3.2),
  },
  subIncomeView: {
    marginTop: hp(0.8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  incomeView: {
    gap: hp(1),
    alignItems: 'center',
    flexDirection: 'row',
  },
  totalBalance: {
    color: '#fff',
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
  },
  incomeExpense: {
    color: '#D0E5E4',
    fontSize: fontSize(15),
    fontFamily: fonts.regular,
  },
});
