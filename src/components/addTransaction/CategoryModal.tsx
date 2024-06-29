import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {ColorConst, fontSize, hp, wp} from '../../theme';
import {ExpenseArray} from '../../interface';
import CategoryIcons from '../common/CategoryIcons';

interface Props {
  isVisible: boolean;
  data: ExpenseArray[];
  toggleModal: () => void;
  onSelectExpenseCategory: (item: ExpenseArray) => void;
}

const RenderItem = ({
  item,
  onSelectExpenseCategory,
}: {
  item: ExpenseArray;
  onSelectExpenseCategory: (item: ExpenseArray) => void;
}) => (
  <TouchableOpacity
    onPress={() => onSelectExpenseCategory(item)}
    key={`${item?.id}cc`}
    style={styles.renderItemContainer}>
    <CategoryIcons
      imageSource={item?.image}
      customCategoryImageView={styles.imageContainer}
      customCategoryImage={styles.iconStyle}
    />
    <Text style={styles.textStyle} numberOfLines={3} ellipsizeMode="tail">
      {item?.name}
    </Text>
  </TouchableOpacity>
);

const CategoryModal: React.FC<Props> = ({
  data,
  isVisible,
  toggleModal,
  onSelectExpenseCategory,
}) => (
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
        renderItem={({item}) => (
          <RenderItem
            item={item}
            onSelectExpenseCategory={onSelectExpenseCategory}
          />
        )}
        ListFooterComponent={() => <View style={styles.footerStyle} />}
      />
    </View>
  </Modal>
);

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

  footerStyle: {
    height: hp(3),
  },
});
