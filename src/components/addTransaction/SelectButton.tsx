import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {fontSize, fonts, hp, wp} from '../../theme';
import {IsImageURl} from '../../hooks';

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
  const isURL = IsImageURl(imagesSource as string);

  return (
    <TouchableOpacity style={styles.selectCategoryButton} onPress={onPress}>
      <Image
        source={isURL ? {uri: imagesSource as string} : imagesSource}
        style={styles.categoryIcon}
      />
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
    height: hp(4),
    width: hp(4),
    borderRadius: 12,
  },
  selectCategory: {
    color: '#FFFFFF',
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
});
