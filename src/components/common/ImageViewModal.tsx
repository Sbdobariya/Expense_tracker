import {ActivityIndicator, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {hp} from '../../theme';

interface Props {
  source: any;
  isVisible: boolean;
  toggleModal: () => void;
}
const ImageViewModal: React.FC<Props> = ({isVisible, toggleModal, source}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.9}
      animationIn="slideInUp"
      onSwipeComplete={toggleModal}
      animationOut="slideOutDown"
      onBackdropPress={toggleModal}>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={'#fff'}
          style={styles.loader}
        />
      ) : null}
      <Image
        source={{uri: source}}
        style={styles.image}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
        onLoadStart={() => {
          setIsLoading(true);
        }}
      />
    </Modal>
  );
};

export default ImageViewModal;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: hp(1),
  },
});
