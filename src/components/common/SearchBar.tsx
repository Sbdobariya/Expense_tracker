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
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const stylesFN = (isFocus: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      height: hp(5.5),
      padding: hp(1.5),
      borderWidth: 1.5,
      borderRadius: hp(1),
      fontSize: fontSize(16),
      color: ColorConst.dark_black,
      borderColor: isFocus ? ColorConst.gradient_color1 : ColorConst.dark_black,
    },
  });
