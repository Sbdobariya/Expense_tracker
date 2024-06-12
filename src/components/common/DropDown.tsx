import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';

interface props {
  label: string;
  value: string;
  name: string;
}

interface componentProps {
  onChange: (item: props) => void;
  value: string;
  placeholder: string;
  data: any;
  customDropdown?: any;
}

const DropdownComponent: React.FC<componentProps> = ({
  onChange,
  value,
  data,
  customDropdown,
  placeholder,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      data={data}
      value={value}
      maxHeight={300}
      labelField="label"
      valueField="value"
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      itemTextStyle={styles.itemTextStyle}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      style={[styles.dropdown, isFocus && styles.focusColor, customDropdown]}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: hp(6),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
    paddingHorizontal: wp(4),
    marginHorizontal: wp(5),
  },
  focusColor: {
    borderColor: 'blue',
  },
  placeholderStyle: {
    color: ColorConst.dark_black,
    fontSize: fontSize(17),
    fontFamily: fonts.medium,
  },
  itemTextStyle: {
    fontSize: fontSize(17),
    color: ColorConst.dark_black,
    fontFamily: fonts.regular,
  },
  selectedTextStyle: {
    color: ColorConst.dark_black,
    fontSize: fontSize(18),
    fontFamily: fonts.medium,
  },
});
