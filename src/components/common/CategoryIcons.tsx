import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {RandomBGColor} from '../../hooks';
import {ColorConst, fontSize, fonts, hp} from '../../theme';

interface Props {
  imageSource: ImageSourcePropType;
  customCategoryImageView?: ViewStyle;
  customCategoryImage?: ImageStyle;
  text?: string;
}

const CategoryIcons: React.FC<Props> = ({
  imageSource,
  customCategoryImageView,
  customCategoryImage,
  text,
}) => {
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
      {imageSource ? (
        <Image
          source={imageSource}
          resizeMode="contain"
          style={[styles.categoryImage, customCategoryImage]}
        />
      ) : (
        <Text style={styles.textStyle}>{text?.slice(0, 2)}</Text>
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
  textStyle: {
    fontSize: fontSize(22),
    fontFamily: fonts.bold,
    color: ColorConst.white,
  },
});
