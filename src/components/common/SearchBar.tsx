import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {ColorConst, fontSize, hp} from '../../theme';

interface SearchBarProps {
  onChangeText?: (text: string) => void;
  value: string;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const styles = stylesFN(isFocus);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholderTextColor={ColorConst.dark_black}
      />
    </View>
  );
};

export default SearchBar;

const stylesFN = (isFocus: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: hp(6),
      borderWidth: 1.5,
      borderRadius: hp(1),
      fontSize: fontSize(17),
      color: ColorConst.dark_black,
      borderColor: isFocus ? ColorConst.gradient_color1 : ColorConst.dark_black,
    },
  });
