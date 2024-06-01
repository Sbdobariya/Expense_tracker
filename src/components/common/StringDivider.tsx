import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorConst, fonts, hp, wp} from '../../theme';

interface props {
  titleOne?: string;
  titleTwo?: string;
  onPress?: () => void;
}

const StringDivider = (props: props) => {
  const {titleOne, titleTwo, onPress} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.titleOneStyle}>{titleOne}</Text>
      <TouchableOpacity style={styles.titleTwoView} onPress={onPress}>
        <Text style={styles.titleTwoStyle}>{titleTwo}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StringDivider;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  titleTwoStyle: {
    fontWeight: '600',
    fontFamily: fonts.regular,
    color: ColorConst.violet_100,
    textDecorationLine: 'underline',
  },
  titleTwoView: {
    marginLeft: wp(2),
  },
  titleOneStyle: {
    marginLeft: wp(2),
    fontFamily: fonts.regular,
    color: ColorConst?.light_20,
  },
});
