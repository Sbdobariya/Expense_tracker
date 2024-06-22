import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  CommonHeader,
  CustomStatusBar,
  ExportDataDropDown,
  PrimaryButton,
} from '../../../components';
import {ColorConst} from '../../../theme';
import {useExportData} from './useExportData';
import {ExportDataType} from '../../../constants/StaticData';
import {styles} from './ExportDataScreenStyle';
import CalenderModal from '../../../components/profile/CalenderModal';
import dayjs from 'dayjs';

const ExportDataScreen: React.FC = () => {
  const {
    onBackPress,
    onDataChange,
    selectedData,
    onExportPress,
    toggleModal,
    onDateSelect,
    isCalenderModalVisible,
    range,
    setRange,
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
          <TouchableOpacity style={styles.selectDateBox} onPress={onDateSelect}>
            {range.startDate && range.endDate ? (
              <Text style={styles.dateTextStyle}>{`${dayjs(
                range.startDate,
              ).format('MMM, DD, YYYY')}   To   ${dayjs(range.endDate).format(
                'MMM, DD, YYYY',
              )}`}</Text>
            ) : (
              <Text style={styles.dateTextStyle}>Select Date Range</Text>
            )}
          </TouchableOpacity>
          <CalenderModal
            range={range}
            setRange={setRange}
            isVisible={isCalenderModalVisible}
            toggleModal={toggleModal}
          />
        </View>
        <PrimaryButton
          title="Export Data"
          onPress={onExportPress}
          customGradientStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

export default ExportDataScreen;
