import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {HomeImages} from '../../../assets';
import {fontSize, fonts, hp} from '../../theme';

const AmountText = ({
  num,
  customNumStyle,
  customRupeeIcon,
}: {
  num: number | undefined;
  customNumStyle?: TextStyle;
  customRupeeIcon?: ImageStyle;
}) => {
  return (
    <View style={styles.subIncomeView}>
      <Image
        source={HomeImages.rupee_ic}
        style={[styles.rupeesIcon, customRupeeIcon]}
      />
      <Text style={[styles.incomeNum, customNumStyle]}>{num}.00</Text>
    </View>
  );
};

export default AmountText;

const styles = StyleSheet.create({
  subIncomeView: {
    marginTop: hp(0.8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupeesIcon: {
    width: hp(2),
    height: hp(2),
  },
  incomeNum: {
    color: '#fff',
    fontSize: fontSize(20),
    fontFamily: fonts.semiBold,
  },
});
