import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorConst, fontSize, fonts, hp} from '../../theme';

interface Props {
  activeTab: string;
  onIncomePress: (val: string) => void;
  onExpensePress: (val: string) => void;
}

const TransactionTab: React.FC<Props> = ({
  activeTab,
  onExpensePress,
  onIncomePress,
}) => {
  const styles = styling(activeTab);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onIncomePress('income')}
        style={styles.incomeButton}>
        <Text style={styles.incomeTextStyle}>Income</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onExpensePress('expense')}
        style={styles.expenseButton}>
        <Text style={styles.expenseTextStyle}>Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionTab;

const styling = (activeTab: string) => {
  return StyleSheet.create({
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
      backgroundColor: activeTab === 'income' ? '#438883' : 'transparent',
    },
    expenseButton: {
      padding: hp(1),
      borderRadius: 10,
      backgroundColor: activeTab === 'expense' ? '#438883' : 'transparent',
    },
    incomeTextStyle: {
      fontSize: fontSize(15),
      fontFamily: fonts.medium,
      color: activeTab === 'income' ? ColorConst.white : ColorConst.dark_black,
    },
    expenseTextStyle: {
      fontSize: fontSize(15),
      fontFamily: fonts.medium,
      color: activeTab === 'expense' ? ColorConst.white : ColorConst.dark_black,
    },
  });
};
