import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './StatisticsScreenStyle';
import {ChartComponent, CustomStatusBar, StatisticsTab} from '../../components';
import {ColorConst} from '../../theme';
import {useStatistics} from './useStatistics';
import StatisticsHeader from '../../components/statistics/StatisticsHeader';

const StatisticsScreen: React.FC = () => {
  const {
    pieChartData,
    selectedTab,
    onTabPress,
    filteredData,
    subCategoryFilter,
    onSelectSecondTab,
  } = useStatistics();

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={ColorConst.status_bar}
        barStyle="dark-content"
      />
      <StatisticsHeader />
      <View style={styles.subView}>
        <StatisticsTab
          onSelectSecondTab={onSelectSecondTab}
          onTabPress={onTabPress}
          selectedTab={selectedTab}
          subCategoryFilter={subCategoryFilter}
        />
        {pieChartData?.length !== 0 ? (
          <ChartComponent
            chartData={pieChartData}
            filteredData={filteredData}
          />
        ) : (
          <View style={styles.emptyData}>
            <Text style={styles.noDataText}>No Data</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default StatisticsScreen;
