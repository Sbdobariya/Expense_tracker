import React from 'react';
import Modal from 'react-native-modal';
import ImageText from '../comman/ImageText';
import AmountText from '../comman/AmountText';
import {transactionTimeStamp} from '../../hooks';
import {StyleSheet, Text, View} from 'react-native';
import TouchableIcon from '../comman/TouchableIcon';
import {TransactionData} from '../../interface/Transaction';
import {ColorConst, ImageConst, fontSize, fonts, hp, wp} from '../../utils';

interface props {
  isVisible: boolean;
  toggleModal: () => void;
  items?: TransactionData;
  onEditPress: (item: TransactionData) => void;
  onDeletePress: (item: TransactionData) => void;
}

const EditCategoryModal = ({
  items,
  isVisible,
  toggleModal,
  onEditPress,
  onDeletePress,
}: props) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.6}
      animationIn="slideInUp"
      swipeDirection={['down']}
      onSwipeComplete={toggleModal}
      animationOut="slideOutDown"
      onBackdropPress={toggleModal}>
      <View style={styles.modalContent}>
        <View
          style={[
            styles.headerContainer,
            {
              backgroundColor:
                items?.transaction_mode === 'income' ? 'green' : 'red',
            },
          ]}>
          <View style={styles.headerImageContainer}>
            <TouchableIcon
              onIconPress={() => items && onDeletePress(items)}
              source={ImageConst.delete_ic}
              customeIconStyle={styles.headerImage}
            />
            <TouchableIcon
              onIconPress={() => items && onEditPress(items)}
              source={ImageConst.edit_ic}
              customeIconStyle={styles.headerImage}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.incomeExpenseText}>
              {items?.transaction_mode}
            </Text>
            <AmountText num={items?.transaction_amount} />
          </View>
          <Text style={styles.timeStamp}>
            {transactionTimeStamp(items?.transaction_createdAt)}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomSubContainer}>
            <Text style={styles.bottomHeaderText}>Category</Text>
            <ImageText
              source={items?.transaction_category?.image}
              title={items?.transaction_category?.name}
            />
          </View>
          <View style={styles.bottomSubContainer}>
            <Text style={styles.bottomHeaderText}>Account</Text>
            <ImageText
              source={items?.transaction_account?.image}
              title={items?.transaction_account?.name}
            />
          </View>
          <Text style={styles.notesText}>
            {items?.transaction_note ? items?.transaction_note : 'no Notes'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default EditCategoryModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalContent: {
    overflow: 'hidden',
    borderRadius: hp(2),
    marginHorizontal: wp(5),
    backgroundColor: ColorConst.white,
  },
  headerImageContainer: {
    gap: hp(1),
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  incomeExpenseText: {
    color: '#fff',
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
  },
  timeStamp: {
    color: '#fff',
    marginTop: hp(2),
    textAlign: 'right',
    fontSize: fontSize(15),
  },
  headerImage: {
    tintColor: '#fff',
  },
  headerContainer: {
    padding: hp(2),
  },
  bottomHeaderText: {
    color: '#000',
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
  },
  bottomSubContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    gap: 10,
    padding: hp(2),
  },
  notesText: {
    color: '#438883',
    textAlign: 'center',
    fontSize: fontSize(13),
    fontFamily: fonts.medium,
  },
});
