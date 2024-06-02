import {
  Image,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {hp} from '../../theme';

interface Props {
  onIconPress?: () => void;
  source: ImageSourcePropType;
  customIconStyle?: ImageStyle;
  touchableRef?: React.LegacyRef<TouchableOpacity>;
  customTouchableStyle?: ViewStyle;
}

const TouchableIcon: React.FC<Props> = ({
  onIconPress,
  source,
  customIconStyle,
  touchableRef,
  customTouchableStyle,
}) => {
  return (
    <TouchableOpacity
      ref={touchableRef}
      onPress={onIconPress}
      style={[customTouchableStyle]}>
      <Image
        source={source}
        style={[styles.iconStyle, customIconStyle]}
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
