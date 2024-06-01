import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  InputText,
  CategoryModal,
  PrimaryButton,
  TransactionTab,
  TransactionHeader,
} from '../../components';
import {
  IncomeCategoryData,
  ExpenseCategoryData,
  TransactionAccountData,
} from '../../utils';
import React from 'react';
import {HomeImages} from '../../../assets';
import {styles} from './AddTransactionScreenStyle';

import {useAddTransaction} from './useAddTransaction';

const AddTransactionScreen: React.FC = () => {
  const {
    activeTab,
    noteValue,
    EditedData,
    amountValue,
    onBackPress,
    setNoteValue,
    onTabChange,
    isImageLoader,
    onToggleModal,
    onUpDatePress,
    setAmountValue,
    selectedInvoice,
    onAddButtonPress,
    onAddInvoicePress,
    showCategoryModal,
    selectedExpenseItem,
    setShowCategoryModal,
    setSelectedExpenseItem,
    selectedTransactionWay,
    setSelectedTransactionWay,
  } = useAddTransaction();

  return (
    <View style={styles.container}>
      <TransactionHeader onBackPress={onBackPress} />
      <View style={styles.centerView}>
        <View>
          <TransactionTab
            activeTab={activeTab}
            onIncomePress={onTabChange}
            onExpensePress={onTabChange}
          />
          <View>
            <TouchableOpacity
              style={styles.selectCaegoryButton}
              onPress={() =>
                setShowCategoryModal({isVisible: true, mode: 'TransactionWay'})
              }>
              <Image
                source={
                  selectedTransactionWay
                    ? selectedTransactionWay.image
                    : HomeImages.transfer_ic
                }
                style={styles.categoryIcon}
              />
              <Text style={styles.selectCategory}>
                {selectedTransactionWay
                  ? selectedTransactionWay.name
                  : 'Select Account'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectCaegoryButton}
              onPress={() =>
                setShowCategoryModal({isVisible: true, mode: 'category'})
              }>
              <Image
                source={
                  selectedExpenseItem
                    ? selectedExpenseItem.image
                    : HomeImages.category_ic
                }
                style={styles.categoryIcon}
              />
              <Text style={styles.selectCategory}>
                {selectedExpenseItem
                  ? selectedExpenseItem?.name
                  : 'Select Category'}
              </Text>
            </TouchableOpacity>
          </View>
          <InputText
            value={amountValue}
            keyboardType="number-pad"
            placeholder="Enter Amount"
            onChangeText={text => {
              const numericValue = parseFloat(text);

              if (!isNaN(numericValue)) {
                setAmountValue(numericValue);
              }
            }}
            inputCustomStyle={styles.amountInputStyle}
          />
          <InputText
            value={noteValue}
            keyboardType="default"
            placeholder="Add Notes"
            onChangeText={text => setNoteValue(text)}
            inputCustomStyle={styles.amountInputStyle}
          />
          <TouchableOpacity
            style={styles.invoiceContainer}
            onPress={onAddInvoicePress}>
            <View style={styles.plusButton}>
              <Image
                source={HomeImages.plus_circle_ic}
                style={styles.addButton}
              />
              <Text style={styles.addInvoiceText}>Add Invoice</Text>
            </View>
            {selectedInvoice !== undefined && (
              <Image
                source={{uri: selectedInvoice}}
                style={styles.selectedInvoiceImage}
              />
            )}
            {isImageLoader && <ActivityIndicator />}
          </TouchableOpacity>
        </View>
        <PrimaryButton
          title={EditedData ? 'Update' : 'Add'}
          onPress={EditedData ? onUpDatePress : onAddButtonPress}
          customGradientStyle={styles.bottomAddButton}
        />
      </View>
      <CategoryModal
        data={
          showCategoryModal.mode === 'category'
            ? activeTab === 'expense'
              ? ExpenseCategoryData
              : IncomeCategoryData
            : TransactionAccountData
        }
        isVisible={showCategoryModal.isVisible}
        toggleModal={onToggleModal}
        onSelectExpenseCategory={item => {
          onToggleModal();
          if (showCategoryModal.mode === 'category') {
            setSelectedExpenseItem(item);
          } else {
            setSelectedTransactionWay(item);
          }
        }}
      />
    </View>
  );
};

export default AddTransactionScreen;
