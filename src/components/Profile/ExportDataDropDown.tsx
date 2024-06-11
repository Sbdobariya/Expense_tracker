import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DropdownComponent from '../common/DropDown';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';

interface Props {
  data: any;
  onChange: (params: any) => void;
  value: string;
  placeholder: string;
  title: string;
}

const ExportDataDropDown: React.FC<Props> = ({
  data,
  onChange,
  value,
  title,
  placeholder,
}) => {
  return (
    <View>
      <Text style={styles.topText}>{title}</Text>
      <DropdownComponent
        placeholder={placeholder}
        data={data}
        onChange={onChange}
        value={value}
        customDropdown={{marginTop: hp(2)}}
      />
    </View>
  );
};

export default ExportDataDropDown;

const styles = StyleSheet.create({
  customDropdown: {
    marginTop: hp(2),
  },
  topText: {
    marginTop: hp(3),
    marginLeft: wp(5),
    fontSize: fontSize(18),
    color: ColorConst.dark_black,
    fontFamily: fonts.bold,
  },
});
