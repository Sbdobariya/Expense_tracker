import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {hp, wp} from '../../theme';

interface props {
  label: string;
  value: string;
  name: string;
}

interface componentProps {
  onChange: (item: props) => void;
  value: string;
}

const data = [
  {label: 'Income overview', value: '1', name: 'income'},
  {label: 'Expense overview', value: '2', name: 'expense'},
  {label: 'Account analysis', value: '3', name: 'Account analysis'},
];

const DropdownComponent: React.FC<componentProps> = ({onChange, value}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        data={data}
        value={value}
        maxHeight={300}
        labelField="label"
        valueField="value"
        onChange={onChange}
        placeholder={'Select item'}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={[styles.dropdown, isFocus && styles.focusColor]}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  dropdown: {
    height: hp(6),
    width: wp(60),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
    paddingHorizontal: wp(4),
  },
  focusColor: {
    borderColor: 'blue',
  },
});
