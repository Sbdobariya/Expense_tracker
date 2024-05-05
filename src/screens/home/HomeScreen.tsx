import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ColorConst, ImageConst, hp, wp} from '../../utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeNavigationType, MainNavigatorType} from '../../navigation';
import {useNavigation} from '@react-navigation/native';

type Home = NativeStackScreenProps<HomeNavigationType, 'HomeScreen'> & {
  navigation: () => void;
};

const HomeScreen: React.FC<Home> = (props: Home) => {
  const {navigation} = props;

  return (
    <View style={styles.container}>
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
});
