import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {RandomBGColor} from '../../hooks';
import {hp} from '../../theme';

interface CategoryIconsProps {
  imageSource: ImageSourcePropType;
  customCategoryImageView?: ViewStyle;
  customCategoryImage?: ImageStyle;
}

const CategoryIcons = ({
  imageSource,
  customCategoryImageView,
  customCategoryImage,
}: CategoryIconsProps) => {
  return (
    <View
      style={[
        customCategoryImageView
          ? customCategoryImageView
          : styles.categoryImageView,
        {
          backgroundColor: RandomBGColor(),
        },
      ]}>
      {imageSource && (
        <Image
          source={imageSource}
          resizeMode="contain"
          style={[styles.categoryImage, customCategoryImage]}
        />
      )}
    </View>
  );
};

export default CategoryIcons;

const styles = StyleSheet.create({
  categoryImageView: {
    width: hp(5),
    height: hp(5),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: hp(3),
    height: hp(3),
    borderRadius: 10,
  },
});
