import React from 'react';
import {ColorConst, ImageConst, fontSize, fonts, hp, wp} from '../../utils';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeNavigationType, MainNavigatorType} from '../../navigation';
import HomeHeader from '../../components/home/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';

type Home = NativeStackScreenProps<HomeNavigationType, 'HomeScreen'> & {
  navigation: () => void;
};

const HomeScreen: React.FC<Home> = (props: Home) => {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <HomeHeader />
      <LinearGradient
        colors={[ColorConst.gradiant_color1, ColorConst.gradiant_color2]}
        style={styles.linearGradient}>
        <Text>Total Balance</Text>
        <Text
          style={{
            color: '#fff',
            fontSize: fontSize(25),
            fontFamily: fonts.bold,
          }}>
          $ 2,548.00
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(3),
          }}>
          <View>
            <Text>Income</Text>
            <Text
              style={{
                color: '#fff',
                fontSize: fontSize(20),
                fontFamily: fonts.semiBold,
              }}>
              $ 1,840.00
            </Text>
          </View>
          <View>
            <Text>Income</Text>
            <Text
              style={{
                color: '#fff',
                fontSize: fontSize(20),
                fontFamily: fonts.semiBold,
              }}>
              $ 1,840.00
            </Text>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity
        style={styles.addTransactionContainer}
        onPress={() => navigation.navigate('AddTransactionScreen')}>
        <Image
          source={ImageConst.add_category_ic}
          style={styles.addTransactionImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  addTransactionImage: {
    height: hp(8),
    width: hp(8),
  },
  addTransactionContainer: {
    right: wp(5),
    bottom: hp(2),
    position: 'absolute',

    //
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  linearGradient: {
    height: hp(22),
    padding: hp(2),
    marginTop: hp(-15),
    borderRadius: hp(3),
    marginHorizontal: wp(3),
    justifyContent: 'center',

    //
    shadowColor: '#D0E5E4',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
});
