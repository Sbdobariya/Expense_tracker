import React from 'react';
import {ColorConst, fontSize, fonts, hp} from '../../theme';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MenuItemListProps {
  item: {
    id: number;
    image: number;
    name: string;
    bgColor: string;
  };
  onItemPress: (item: string) => void;
}

const MenuItemList = ({item, onItemPress}: MenuItemListProps) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.conainer}
      onPress={() => onItemPress(item.name)}>
      <View
        style={[
          styles.imageView,
          {
            backgroundColor: item.bgColor,
          },
        ]}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default MenuItemList;

const styles = StyleSheet.create({
  conainer: {
    gap: hp(1),
    padding: hp(1.5),
    marginBottom: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: ColorConst.white,
  },
  image: {
    width: hp(3),
    height: hp(3),
  },
  imageView: {
    padding: hp(1),
    alignSelf: 'flex-start',
    backgroundColor: 'green',
    borderRadius: hp(1.6),
  },
  text: {
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
    color: ColorConst.dark_black,
  },
});
