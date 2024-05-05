import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ColorConst, ImageConst, fontSize, hp, wp} from '../../utils';

interface props {
  title: string;
  onPress?: () => void;
}

const CommanHeader = ({title, onPress}: props) => {
  return (
    <ImageBackground
      source={ImageConst.header_bg_ic}
      style={styles.headerBgImage}>
      <TouchableOpacity onPress={onPress} style={styles.flex}>
        <Image source={ImageConst.left_icon_ic} style={styles.leftIconStyle} />
      </TouchableOpacity>
      <Text style={styles.heraderText}>{title}</Text>
      <View style={styles.flex} />
    </ImageBackground>
  );
};

export default CommanHeader;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  headerBgImage: {
    height: hp(18),
    paddingTop: hp(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6.4),
  },
  leftIconStyle: {
    width: hp(3.44),
    height: hp(3.44),
  },
  heraderText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSize(18),
    color: ColorConst.white,
    flex: 1,
  },
});
