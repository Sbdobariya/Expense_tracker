import {
  Text,
  View,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  hp,
  wp,
  fonts,
  fontSize,
  ColorConst,
  ImageConst,
  IncomeCategoryData,
  ExpenseCategoryData,
  TransactionModeData,
} from '../../utils';
import {
  InputText,
  CategoryModal,
  PrimaryButton,
  TransactionTab,
  TransactionHeader,
} from '../../components';
import {
  AddTransaction,
  EditTransaction,
  TransactionReducerType,
} from '../../interface/Transaction';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {expenseArray} from '../../interface/Comman';
import {useNavigation} from '@react-navigation/native';
import {EditTransactionData} from '../../redux/reducer';
import {FirebaseStorage, UseImagePicker} from '../../hooks';
import {AuthReducerType} from '../../interface/AuthInterface';
import {AddTransactionAction, EditTransactionAction} from '../../redux/actions';

const AddTransactionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );
  const {EditedData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );

  const [noteValue, setNoteValue] = useState(
    EditedData?.transaction_note ? EditedData?.transaction_note : '',
  );
  const [activeTab, setActiveTab] = useState(
    EditedData?.transaction_mode ? EditedData?.transaction_mode : 'income',
  );
  const [selectedInvoice, setSelectedInvoice] = useState<string | undefined>(
    EditedData?.transaction_invoice
      ? EditedData?.transaction_invoice
      : undefined,
  );
  const [showCategoryModal, setShowCategoryModal] = useState({
    isVisible: false,
    mode: '',
  });
  const [amountValue, setAmountValue] = useState<number | undefined>(
    EditedData?.transaction_amount ? EditedData.transaction_amount : undefined,
  );
  const [selectedTransactionWay, setSelectedTransactionWay] = useState<
    expenseArray | undefined
  >(
    EditedData?.transaction_account
      ? EditedData?.transaction_account
      : undefined,
  );
  const [selectedExpenseItem, setselectedExpenseItem] = useState<
    expenseArray | undefined
  >(
    EditedData?.transaction_category
      ? EditedData?.transaction_category
      : undefined,
  );
  const [isImageLoader, setIsImageLoader] = useState(false);

  const onToggleModal = () => {
    setShowCategoryModal({
      isVisible: false,
      mode: '',
    });
  };

  const onAddButtonPress = () => {
    if (!selectedExpenseItem) {
      Alert.alert('', 'Please Select Category');
    } else if (amountValue === undefined) {
      Alert.alert('', 'Please enter amount');
    } else {
      const transactionDetail: AddTransaction = {
        data: {
          user_data: userData,
          transaction_mode: activeTab,
          transaction_note: noteValue,
          transaction_amount: amountValue,
          transaction_invoice: selectedInvoice,
          transaction_category: selectedExpenseItem,
          transaction_account: selectedTransactionWay,
        },
        onSuccess: response => {
          if (response === 'success') {
            setNoteValue('');
            setAmountValue(undefined);
            setSelectedInvoice(undefined);
            setselectedExpenseItem(undefined);
            setSelectedTransactionWay(undefined);
            setSelectedTransactionWay(undefined);
          }
        },
        onFail: error => {
          Alert.alert(JSON.stringify(error));
        },
      };
      AddTransactionAction(transactionDetail);
    }
  };

  const onAddInvoicePress = () => {
    UseImagePicker(async response => {
      setIsImageLoader(true);
      FirebaseStorage(response, res => {
        setSelectedInvoice(res);
        setIsImageLoader(false);
      });
    });
  };

  const onTabChange = (val: string) => {
    setActiveTab(val);
    setselectedExpenseItem(undefined);
  };

  const onUpDatePress = () => {
    const request: EditTransaction = {
      data: {
        user_data: userData,
        transaction_mode: activeTab,
        transaction_note: noteValue,
        transaction_amount: amountValue,
        transaction_invoice: selectedInvoice,
        transaction_id: EditedData?.transaction_id,
        transaction_category: selectedExpenseItem,
        transaction_account: selectedTransactionWay,
      },
      onFail(_err) {},
      onSuccess(_res) {
        navigation.goBack();
        dispatch(EditTransactionData(undefined));
      },
    };
    EditTransactionAction(request);
  };

  const onBackPress = () => {
    navigation.goBack();
    dispatch(EditTransactionData(undefined));
  };

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
                    : ImageConst.transfer_ic
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
                    : ImageConst.category_ic
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
            inputCustomeStyle={styles.amountInputStyle}
          />
          <InputText
            value={noteValue}
            keyboardType="default"
            placeholder="Add Notes"
            onChangeText={text => setNoteValue(text)}
            inputCustomeStyle={styles.amountInputStyle}
          />
          <TouchableOpacity
            style={styles.invoiceContainer}
            onPress={onAddInvoicePress}>
            <View style={styles.plusButton}>
              <Image
                source={ImageConst.plus_circle_ic}
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
          customeGradientStyle={styles.bottomAddButton}
        />
      </View>
      <CategoryModal
        data={
          showCategoryModal.mode === 'category'
            ? activeTab === 'expense'
              ? ExpenseCategoryData
              : IncomeCategoryData
            : TransactionModeData
        }
        isVisible={showCategoryModal.isVisible}
        toggleModal={onToggleModal}
        onSelectExpenseCategory={item => {
          onToggleModal();
          if (showCategoryModal.mode === 'category') {
            setselectedExpenseItem(item);
          } else {
            setSelectedTransactionWay(item);
          }
        }}
      />
    </View>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  bottomAddButton: {
    marginBottom: hp(3),
  },
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  selectCaegoryButton: {
    gap: 10,
    marginTop: hp(2),
    padding: hp(1.5),
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    backgroundColor: '#29756F',
  },
  centerView: {
    flex: 1,
    borderRadius: 20,
    marginTop: hp(-15),
    marginBottom: hp(8),
    marginHorizontal: wp(7),
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',

    // shado
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  categoryIcon: {
    height: hp(3),
    width: hp(3),
  },
  selectCategory: {
    color: '#FFFFFF',
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  amountInputStyle: {
    height: hp(6),
    color: '#000',
    marginTop: hp(2),
    fontSize: fontSize(12),
    marginHorizontal: wp(4),
    fontFamily: fonts.medium,
  },
  invoiceContainer: {
    height: hp(6),
    borderWidth: 1,
    marginTop: hp(2),
    padding: hp(1.5),
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'dashed',
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
  },
  addButton: {
    width: hp(3),
    height: hp(3),
  },
  addInvoiceText: {
    color: '#000',
    fontSize: fontSize(13),
    fontFamily: fonts.medium,
  },
  plusButton: {
    gap: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedInvoiceImage: {
    width: hp(6),
    height: hp(4),
    borderRadius: 10,
  },
});
