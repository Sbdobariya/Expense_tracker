import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {expenseArray} from '../../interface/Comman';

interface props {
  isVisible: boolean;
  data: expenseArray[];
  toggleModal: () => void;
}

const CategoryModal = ({toggleModal, isVisible, data}: props) => {
  const renderItem = ({item}: {item: expenseArray}) => {
    return (
      <View key={`${item?.id}cc`}>
        <Text>{item?.id}</Text>
      </View>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={toggleModal}
      style={styles.modal}
      swipeDirection={['down']}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View style={styles.modalContent}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </Modal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'blue',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
  },
});
