import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fontSize, fonts, hp, wp} from '../../theme';
import {IsImageURl, RandomBGColor} from '../../hooks';

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
      {imagesSource ? (
        <Image
          source={isURL ? {uri: imagesSource as string} : imagesSource}
          style={styles.categoryIcon}
        />
      ) : (
        <View style={styles.selectImageCategory}>
          <Text style={styles.selectTextCategory}>{title?.slice(0, 2)}</Text>
        </View>
      )}
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
  selectTextCategory: {
    color: '#FFFFFF',
    fontSize: fontSize(20),
    fontFamily: fonts.medium,
  },
  selectImageCategory: {
    fontSize: fontSize(17),
    fontFamily: fonts.medium,
    backgroundColor: RandomBGColor(),
    padding: hp(1.2),
    borderRadius: hp(1),
  },
});
