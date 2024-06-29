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
  SelectButton,
  CustomStatusBar,
  AddCategoryModal,
} from '../../components';
import React from 'react';
import {HomeImages} from '../../../assets';
import {styles} from './AddTransactionScreenStyle';
import {useAddTransaction} from './useAddTransaction';
import {ColorConst} from '../../theme';

const AddTransactionScreen: React.FC = () => {
  const {
    activeTab,
    noteValue,
    EditedData,
    amountValue,
    onBackPress,
    setNoteValue,
    onTabChange,
    AccountName,
    CategoryName,
    AccountImage,
    CategoryImage,
    onToggleModal,
    isImageLoader,
    onUpDatePress,
    setAmountValue,
    selectedInvoice,
    onAddButtonPress,
    onAddInvoicePress,
    CategoryModalData,
    showCategoryModal,
    onSelectCategoryPress,
    setSelectedExpenseItem,
    isShowAddCategoryModal,
    onAddCategoryToggleModal,
    setSelectedTransactionWay,
  } = useAddTransaction();

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={ColorConst.status_bar} />
      <TransactionHeader onBackPress={onBackPress} />
      <View style={styles.centerView}>
        <TransactionTab
          activeTab={activeTab}
          onIncomePress={onTabChange}
          onExpensePress={onTabChange}
        />
        <SelectButton
          onPress={() => onSelectCategoryPress('TransactionWay')}
          imagesSource={AccountImage}
          title={AccountName}
        />
        <SelectButton
          onPress={() => onSelectCategoryPress('category')}
          imagesSource={CategoryImage}
          title={CategoryName}
        />
        <InputText
          value={amountValue}
          keyboardType="number-pad"
          placeholder="Enter Amount"
          onChangeText={text => {
            const numericValue = parseFloat(text);
            if (!isNaN(numericValue)) {
              setAmountValue(numericValue);
            } else {
              setAmountValue(undefined);
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
        <PrimaryButton
          title={EditedData ? 'Update' : 'Add'}
          onPress={EditedData ? onUpDatePress : onAddButtonPress}
          customGradientStyle={styles.bottomAddButton}
        />
      </View>
      {showCategoryModal.isVisible && (
        <CategoryModal
          data={CategoryModalData}
          isVisible={showCategoryModal.isVisible}
          toggleModal={onToggleModal}
          onSelectExpenseCategory={item => {
            onToggleModal();
            if (showCategoryModal.mode === 'category') {
              setSelectedExpenseItem(item);
            } else {
              if (item.name == 'Add Other') {
                onAddCategoryToggleModal();
              } else {
                setSelectedTransactionWay(item);
              }
            }
          }}
        />
      )}
      {isShowAddCategoryModal && (
        <AddCategoryModal
          isVisible={isShowAddCategoryModal}
          toggleModal={onAddCategoryToggleModal}
        />
      )}
    </View>
  );
};

export default AddTransactionScreen;
