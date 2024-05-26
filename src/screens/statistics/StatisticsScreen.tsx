import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {useSelector} from 'react-redux';
import {TransactionReducerType} from '../../interface/Transaction';
import DropdownComponent from '../../components/comman/DropDown';
import {ColorConst} from '../../theme';

interface chartData {
  text: string;
  value: any;
}

type CategorySum = {[key: string]: number};

const StatisticsScreen: React.FC = () => {
  const {transactionData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );
  const [value, setValue] = useState<string>('1');
  const [label, setLabel] = useState<string>('income');
  const [pieChartData, setPieChartData] = useState<chartData[]>([]);

  useEffect(() => {
    if (transactionData) {
      const filteredData = transactionData.filter(
        item => item.transaction_mode === label,
      );

      const categorySum: CategorySum = {};

      filteredData.forEach(item => {
        const categoryName = item.transaction_category?.name;
        const transactionAmount = item.transaction_amount;

        if (categoryName) {
          categorySum[categoryName] =
            (categorySum[categoryName] || 0) + transactionAmount;
        }
      });

      const modifiedData = Object.keys(categorySum).map(categoryName => ({
        text: categoryName,
        value: categorySum[categoryName],
      }));
      setPieChartData(modifiedData);
    }
  }, [label]);
  const pieData = [
    {value: 54, color: '#177AD5'},
    {value: 40, color: '#79D2DE'},
    {value: 20, color: '#ED6665'},
  ];
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <DropdownComponent
        value={value}
        onChange={({value, name}) => {
          setValue(value);
          setLabel(name);
        }}
      />
      {pieChartData && <PieChart data={pieChartData} donut />}
    </View>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
});
