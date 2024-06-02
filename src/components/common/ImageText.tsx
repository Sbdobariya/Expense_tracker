import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {ColorConst, fontSize, fonts, hp} from '../../theme';

interface Props {
  title: string | undefined;
  source: ImageSourcePropType | undefined;
}

const ImageText: React.FC<Props> = ({title, source}) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.imageStyle} />
      <Text style={styles.txtStyle}>{title}</Text>
    </View>
  );
};

export default ImageText;

const styles = StyleSheet.create({
  container: {
    gap: hp(0.5),
    padding: hp(1),
    borderWidth: 2,
    borderRadius: hp(1),
    flexDirection: 'row',
    borderColor: '#438883',
  },
  imageStyle: {
    width: hp(2.5),
    height: hp(2.5),
  },
  txtStyle: {
    fontSize: fontSize(15),
    fontFamily: fonts.regular,
    color: ColorConst.dark_black,
  },
});
