import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  ChartData,
  TransactionData,
  TransactionReducerType,
} from '../../interface';
import {RandomBGColor} from '../../hooks';
import moment from 'moment';

type CategorySum = {[key: string]: number};

export const useStatistics = () => {
  const {transactionData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );

  const [selectedTab, setSelectedTab] = useState<string>('income');
  const [pieChartData, setPieChartData] = useState<ChartData[]>([]);
  const [filteredData, setFilteredData] = useState<TransactionData[]>([]);
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>('All');

  useEffect(() => {
    if (transactionData) {
      const filteredData = transactionData.filter(
        item => item.transaction_mode === selectedTab,
      );
      setFilteredData(filteredData);

      const intervalFilteredData = filteredData.filter(item => {
        const transactionDate = moment(
          item.transaction_createdAt,
          'YYYY-MM-DD',
        );
        const now = moment();

        switch (subCategoryFilter) {
          case 'Monthly':
            return transactionDate.isSame(now, 'month');
          case 'Weekly':
            return transactionDate.isSame(now, 'week');
          case 'Daily':
            return transactionDate.isSame(now, 'day');
          case 'Yearly':
            return transactionDate.isSame(now, 'year');
          case 'All':
          default:
            return true;
        }
      });

      setFilteredData(intervalFilteredData);

      const categorySum: CategorySum = {};

      filteredData.forEach(item => {
        const categoryName = item.transaction_category?.name;
        const transactionAmount = item.transaction_amount;

        if (categoryName) {
          categorySum[categoryName] =
            (categorySum[categoryName] || 0) + transactionAmount;
        }
      });

      const totalValue = Object.values(categorySum).reduce(
        (sum, value) => sum + value,
        0,
      );

      const modifiedData = Object.keys(categorySum).map(categoryName => ({
        text: categoryName,
        value: categorySum[categoryName],
        percentage: (categorySum[categoryName] / totalValue) * 100,
        color: RandomBGColor(),
      }));

      const maxPercentageData = modifiedData.reduce((prev, current) =>
        prev.percentage! > current.percentage! ? prev : current,
      );

      const finalData = modifiedData.map(data => ({
        ...data,
        focused: data === maxPercentageData,
      }));

      setPieChartData(finalData);
    }
  }, [selectedTab, transactionData, subCategoryFilter]);

  const onTabPress = (props: string) => {
    setSelectedTab(props);
  };
  const onSelectSecondTab = (props: string) => {
    setSubCategoryFilter(props);
  };

  return {
    pieChartData,
    selectedTab,
    onTabPress,
    filteredData,
    subCategoryFilter,
    onSelectSecondTab,
  };
};
