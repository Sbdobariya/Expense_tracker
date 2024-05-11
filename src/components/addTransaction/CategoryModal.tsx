import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {expenseArray} from '../../interface/Comman';
import {ColorConst, fontSize, hp, wp} from '../../utils';

interface props {
  isVisible: boolean;
  data: expenseArray[];
  toggleModal: () => void;
  onSelectExpenseCategory: (item: expenseArray) => void;
}

const CategoryModal = ({
  data,
  isVisible,
  toggleModal,
  onSelectExpenseCategory,
}: props) => {
  const renderItem = ({item}: {item: expenseArray}) => {
    return (
      <TouchableOpacity
        onPress={() => onSelectExpenseCategory(item)}
        key={`${item?.id}cc`}
        style={styles.renderItemContainer}>
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor:
                '#' +
                (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0'),
            },
          ]}>
          <Image source={item?.image} style={styles.iconStyle} />
        </View>
        <Text style={styles.textStyle} numberOfLines={3} ellipsizeMode="tail">
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      swipeDirection={['down']}
      onSwipeComplete={toggleModal}
      animationOut="slideOutDown"
      onBackdropPress={toggleModal}>
      <View style={styles.modalContent}>
        <FlatList
          data={data}
          numColumns={3}
          renderItem={renderItem}
          ListFooterComponent={() => {
            return <View style={{height: hp(3)}} />;
          }}
          contentContainerStyle={{alignItems: 'center'}}
        />
      </View>
    </Modal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: hp(2),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: ColorConst.white,
  },
  renderItemContainer: {
    width: hp(10),
    height: hp(8),
    alignItems: 'center',
    marginVertical: hp(2),
    marginHorizontal: wp(5),
  },
  iconStyle: {
    width: hp(4),
    height: hp(4),
  },
  textStyle: {
    color: '#000',
    marginTop: hp(1),
    fontSize: fontSize(12),
  },
  imageContainer: {
    padding: 15,
    borderRadius: 15,
  },
});
