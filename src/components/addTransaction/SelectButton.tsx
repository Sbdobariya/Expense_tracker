import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HomeImages} from '../../../assets';
import {fontSize, fonts, hp, wp} from '../../theme';

interface SelectButtonProps {
  title: string;
  imagesSource: ImageSourcePropType;
  onPress: () => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({
  title,
  imagesSource,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.selectCategoryButton} onPress={onPress}>
      <Image source={imagesSource} style={styles.categoryIcon} />
      <Text style={styles.selectCategory}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SelectButton;

const styles = StyleSheet.create({
  selectCategoryButton: {
    gap: 10,
    marginTop: hp(2),
    padding: hp(1.5),
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    backgroundColor: '#29756F',
  },
  categoryIcon: {
    height: hp(3),
    width: hp(3),
  },
  selectCategory: {
    color: '#FFFFFF',
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
});
