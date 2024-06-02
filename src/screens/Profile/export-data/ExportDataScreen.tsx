import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CommonHeader, CustomStatusBar} from '../../../components';
import {ColorConst} from '../../../theme';
import {useExportData} from './useExportData';

const ExportDataScreen: React.FC = () => {
  const {onBackPress} = useExportData();
  return (
    <View>
      <CustomStatusBar
        backgroundColor={ColorConst.status_bar}
        barStyle="dark-content"
      />
      <CommonHeader title={'Export Data'} onPress={onBackPress} />

      <Text>ExportDataScreen</Text>
    </View>
  );
};

export default ExportDataScreen;

const styles = StyleSheet.create({});
