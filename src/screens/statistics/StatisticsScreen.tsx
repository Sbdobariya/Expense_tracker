import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {useSelector} from 'react-redux';
import {TransactionReducerType} from '../../interface';
import DropdownComponent from '../../components/common/DropDown';
import {styles} from './StatisticsScreenStyle';
import {CustomStatusBar} from '../../components';
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
  }, [label, transactionData]);

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={ColorConst.white}
        barStyle="dark-content"
      />
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
