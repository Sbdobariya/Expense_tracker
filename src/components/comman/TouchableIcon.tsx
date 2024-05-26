import {
  Image,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {hp} from '../../theme';

interface props {
  onIconPress?: () => void;
  source: ImageSourcePropType;
  customeIconStyle?: ImageStyle;
  touchableRef?: React.LegacyRef<TouchableOpacity>;
}

const TouchableIcon = ({
  onIconPress,
  source,
  customeIconStyle,
  touchableRef,
}: props) => {
  return (
    <TouchableOpacity ref={touchableRef} onPress={onIconPress}>
      <Image
        source={source}
        style={[styles.iconStyle, customeIconStyle]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default TouchableIcon;

const styles = StyleSheet.create({
  iconStyle: {
    width: hp(2.5),
    height: hp(2.5),
  },
});
