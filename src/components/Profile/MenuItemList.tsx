import React from 'react';
import {ColorConst, fontSize, fonts, hp} from '../../theme';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  item: {
    id: number;
    image: number;
    name: string;
    bgColor: string;
  };
  onItemPress: (item: string) => void;
}

const MenuItemList: React.FC<Props> = ({item, onItemPress}) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.container}
      onPress={() => onItemPress(item.name)}>
      <View
        style={[
          styles.imageView,
          {
            backgroundColor: item.bgColor,
          },
        ]}>
        {item.id == 4 ? (
          <Image
            source={item.image}
            style={[
              styles.image,
              {
                tintColor: '#fff',
              },
            ]}
          />
        ) : (
          <Image source={item.image} style={styles.image} />
        )}
      </View>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default MenuItemList;

const styles = StyleSheet.create({
  container: {
    gap: hp(1),
    padding: hp(1.5),
    marginBottom: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: ColorConst.white,
  },
  image: {
    width: hp(4),
    height: hp(4),
  },
  imageView: {
    padding: hp(1),
    alignSelf: 'flex-start',
    backgroundColor: 'green',
    borderRadius: hp(1.6),
  },
  text: {
    fontSize: fontSize(18),
    fontFamily: fonts.medium,
    color: ColorConst.dark_black,
  },
});
