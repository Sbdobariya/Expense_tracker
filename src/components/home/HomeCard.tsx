import {
  hp,
  wp,
  fonts,
  fontSize,
  ColorConst,
  ImageConst,
  StringConst,
} from '../../utils';
import React from 'react';
import AmountText from '../comman/AmountText';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TransactionData} from '../../interface/Transaction';

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

  return (
    <LinearGradient
      colors={[ColorConst.gradiant_color1, ColorConst.gradiant_color2]}
      style={styles.linearGradient}>
      <View style={styles.subIncomeView}>
        <Text style={styles.totalBalance}>{StringConst.total_balance}</Text>
        <Image source={ImageConst.chevron_down_ic} style={styles.rupeesIcon} />
      </View>
      <AmountText num={totalExpense + totalIncome} />
      <View style={styles.subContainer}>
        <View>
          <View style={styles.incomeView}>
            <Image source={ImageConst.downArrow_ic} style={styles.arrowImage} />
            <Text style={styles.incomeExpense}>{StringConst.income}</Text>
          </View>
          <AmountText num={totalIncome} customeNumStyle={styles.expenseNum} />
        </View>
        <View>
          <View style={styles.incomeView}>
            <Image source={ImageConst.upArrow_ic} style={styles.arrowImage} />
            <Text style={styles.incomeExpense}>{StringConst.expense}</Text>
          </View>
          <AmountText num={totalExpense} customeNumStyle={styles.expenseNum} />
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
