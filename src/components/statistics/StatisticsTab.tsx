import React from 'react';
import {FilterDataProps} from '../../interface';
import {FilterData} from '../../constants/StaticData';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  selectedTab?: string;
  subCategoryFilter?: string;
  onTabPress: (props: string) => void;
  onSelectSecondTab: (props: string) => void;
}

const StatisticsTab: React.FC<Props> = ({
  selectedTab,
  onTabPress,
  subCategoryFilter,
  onSelectSecondTab,
}) => {
  const styles = styling(selectedTab);

  const renderItem = ({item}: {item: FilterDataProps}) => {
    return (
      <TouchableOpacity
        onPress={() => onSelectSecondTab(item.label)}
        style={[
          styles.secondContainer,
          {
            backgroundColor:
              subCategoryFilter === item.label ? '#3f918b' : '#42c9ab',
          },
        ]}>
        <Text
          style={[
            styles.labelStyle,
            {
              color:
                subCategoryFilter === item.label
                  ? ColorConst.white
                  : ColorConst.dark_black,
            },
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.incomeButtonStyle}
          onPress={() => onTabPress('income')}>
          <Text style={styles.incomeText}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.expenseButtonStyle}
          onPress={() => onTabPress('expense')}>
          <Text style={styles.expenseText}>Expense</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={FilterData}
        renderItem={renderItem}
        style={styles.secondFlatList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default StatisticsTab;

const styling = (selectedTab?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#42c9ab',
      flexDirection: 'row',
      marginHorizontal: wp(5),
      padding: hp(1),
      borderRadius: hp(10),
    },
    secondContainer: {
      // flexDirection: 'row',
      marginHorizontal: wp(3),
      padding: hp(2),
      borderRadius: hp(2),
    },
    secondFlatList: {
      marginTop: hp(1),
      marginHorizontal: wp(2),
    },
    labelStyle: {
      fontSize: fontSize(15),
      fontFamily: fonts.semiBold,
    },
    incomeButtonStyle: {
      backgroundColor: selectedTab === 'income' ? '#3f918b' : 'transparent',
      flex: 1,
      alignItems: 'center',
      padding: hp(1),
      borderRadius: hp(10),
    },
    expenseButtonStyle: {
      backgroundColor: selectedTab === 'expense' ? '#3f918b' : 'transparent',
      flex: 1,
      alignItems: 'center',
      padding: hp(1),
      borderRadius: hp(10),
    },
    incomeText: {
      fontSize: fontSize(20),
      color:
        selectedTab === 'income' ? ColorConst.white : ColorConst.dark_black,
      fontFamily: fonts.semiBold,
    },
    expenseText: {
      fontSize: fontSize(20),
      color:
        selectedTab === 'expense' ? ColorConst.white : ColorConst.dark_black,
      fontFamily: fonts.semiBold,
    },
  });
