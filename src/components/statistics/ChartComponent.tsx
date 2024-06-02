import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ChartData, TransactionData} from '../../interface';
import {PieChart} from 'react-native-gifted-charts';
import {ColorConst, fontSize, hp, wp} from '../../theme';
import TransactionList from '../home/TransactionList';

interface Props {
  chartData: ChartData[];
  filteredData?: TransactionData[];
}

const ChartComponent: React.FC<Props> = ({chartData, filteredData}) => {
  const focusedData = chartData.filter(i => i.focused)[0];

  const renderDot = (color: string) => {
    return <View style={[styles.dotStyle, {backgroundColor: color}]} />;
  };

  const renderItem = ({item}: {item: ChartData}) => {
    return (
      <View style={styles.renderItemContainer}>
        {renderDot(item.color)}
        <Text style={styles.renderText}>
          {`${item.text} :  ${item.percentage?.toFixed(2)}%`}
        </Text>
      </View>
    );
  };

  const ListHeaderComponent = () => (
    <View style={styles.chartView}>
      <Text style={styles.reportText}>Report</Text>
      <View style={styles.subContainer}>
        <PieChart
          data={chartData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={50}
          innerCircleColor={'#29756e'}
          centerLabelComponent={() => (
            <View style={styles.focusedDataView}>
              <Text style={styles.percentageText}>
                {`${focusedData.percentage?.toFixed(2)}%`}
              </Text>
              <Text style={styles.focusedNameTxt}>{focusedData.text}</Text>
            </View>
          )}
        />
      </View>
      <FlatList
        data={chartData}
        renderItem={renderItem}
        numColumns={2}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.mainFlatlistStyle}
        ListHeaderComponent={ListHeaderComponent}
        data={filteredData}
        renderItem={({item, index}) => (
          <TransactionList item={item} index={index} disabled />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ChartComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorConst.white,
    flex: 1,
  },
  chartView: {
    margin: hp(2),
    padding: hp(1.6),
    borderRadius: hp(2),
    backgroundColor: '#29756e',
  },
  mainFlatlistStyle: {
    marginTop: hp(1),
    flexGrow: 1,
  },
  subContainer: {
    padding: hp(2),
    alignItems: 'center',
  },
  reportText: {
    color: 'white',
    fontSize: fontSize(16),
    fontWeight: 'bold',
  },
  dotStyle: {
    width: hp(2),
    height: hp(2),
    marginRight: wp(3),
    borderRadius: hp(5),
  },
  renderItemContainer: {
    width: wp(40),
    marginRight: wp(6),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  focusedDataView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: fontSize(22),
    color: 'white',
    fontWeight: 'bold',
  },
  focusedNameTxt: {
    fontSize: fontSize(15),
    color: 'white',
  },
  renderText: {
    color: 'white',
    fontSize: fontSize(15),
  },
});
