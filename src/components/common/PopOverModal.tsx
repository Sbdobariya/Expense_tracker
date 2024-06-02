import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import TouchableIcon from './TouchableIcon';
import {Popover, PopoverController} from 'react-native-modal-popover';
import {ColorConst, fontSize, hp} from '../../theme';

interface Props {
  onPopupPress: () => void;
  popupText: string;
  source: ImageSourcePropType;
}

const PopOverModal: React.FC<Props> = ({source, onPopupPress, popupText}) => (
  <PopoverController>
    {({
      openPopover,
      closePopover,
      popoverVisible,
      setPopoverAnchor,
      popoverAnchorRect,
    }) => {
      return (
        <View>
          <TouchableIcon
            source={source}
            customIconStyle={styles.customIconStyle}
            touchableRef={setPopoverAnchor}
            onIconPress={openPopover}
          />
          <Popover
            contentStyle={styles.content}
            visible={popoverVisible}
            onClose={closePopover}
            fromRect={popoverAnchorRect}
            supportedOrientations={['portrait', 'landscape']}>
            <TouchableOpacity
              onPress={() => {
                closePopover();
                onPopupPress();
              }}>
              <Text style={styles.text}>{popupText}</Text>
            </TouchableOpacity>
          </Popover>
        </View>
      );
    }}
  </PopoverController>
);

export default PopOverModal;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize(15),
    color: ColorConst.dark_black,
  },
  content: {
    padding: 16,
    borderRadius: 8,
  },
  customIconStyle: {
    height: hp(3),
    width: hp(3),
  },
});
