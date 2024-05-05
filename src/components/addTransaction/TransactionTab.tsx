import React from 'react';
import {ColorConst, fontSize, fonts, hp} from '../../utils';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface props {
  activeTab: string;
  onIncomePress: (val: string) => void;
  onExpensePress: (val: string) => void;
}

const TransactionTab = ({activeTab, onExpensePress, onIncomePress}: props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onIncomePress('income')}
        style={[
          styles.incomeButton,
          {
            backgroundColor: activeTab == 'income' ? '#438883' : 'transparent',
          },
        ]}>
        <Text
          style={[
            styles.incomeTextStyle,
            {
              color:
                activeTab == 'income'
                  ? ColorConst.white
                  : ColorConst.dark_black,
            },
          ]}>
          Income
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onExpensePress('expense')}
        style={[
          styles.expenseButton,
          {
            backgroundColor: activeTab == 'expense' ? '#438883' : 'transparent',
          },
        ]}>
        <Text
          style={[
            styles.expenseTextStyle,
            {
              color:
                activeTab == 'expense'
                  ? ColorConst.white
                  : ColorConst.dark_black,
            },
          ]}>
          Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionTab;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: hp(1),
    marginTop: hp(2),
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#ECF9F8',
  },
  incomeButton: {
    padding: hp(1),
    borderRadius: 10,
    backgroundColor: '#438883',
  },
  expenseButton: {
    padding: hp(1),
    borderRadius: 10,
  },
  incomeTextStyle: {
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  expenseTextStyle: {
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
});
