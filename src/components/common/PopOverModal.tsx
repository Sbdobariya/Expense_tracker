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

const styles = StyleSheet.create({
  content: {
    padding: 16,
    borderRadius: 8,
  },
});
interface props {
  onPopupPress: () => void;
  popupText: string;
  source: ImageSourcePropType;
}

const PopOverModal = ({source, onPopupPress, popupText}: props) => (
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
              <Text>{popupText}</Text>
            </TouchableOpacity>
          </Popover>
        </View>
      );
    }}
  </PopoverController>
);

export default PopOverModal;
