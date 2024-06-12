import {View} from 'react-native';
import React, {useState} from 'react';
import {
  CommonHeader,
  CustomStatusBar,
  ExportDataDropDown,
  PrimaryButton,
} from '../../../components';
import {ColorConst, hp} from '../../../theme';
import {useExportData} from './useExportData';
import {ExportDataType, TimeDuration} from '../../../constants/StaticData';
import {styles} from './ExportDataScreenStyle';

const ExportDataScreen: React.FC = () => {
  const {
    onBackPress,
    onDateChange,
    onDataChange,
    selectedData,
    selectedDate,
    onExportPress,
  } = useExportData();

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={ColorConst.status_bar}
        barStyle="dark-content"
      />
      <CommonHeader title={'Export Data'} onPress={onBackPress} />
      <View style={styles.subContainer}>
        <View>
          <ExportDataDropDown
            placeholder={'Select item'}
            title={'What data do your want to export?'}
            data={ExportDataType}
            onChange={onDataChange}
            value={selectedData.value}
          />
          <ExportDataDropDown
            placeholder={'Select Date Range'}
            title={'When Date Range?'}
            data={TimeDuration}
            onChange={onDateChange}
            value={selectedDate.value}
          />
        </View>
        <PrimaryButton
          title="Export Data"
          onPress={onExportPress}
          customGradientStyle={{marginBottom: hp(7)}}
        />
      </View>
    </View>
  );
};

export default ExportDataScreen;
