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
  Alert,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  InputText,
  CategoryModal,
  PrimaryButton,
  TransactionTab,
  TransactionHeader,
} from '../../components';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {expenseArray} from '../../interface/Comman';
import {useNavigation} from '@react-navigation/native';
import {AddTransaction} from '../../interface/Transaction';
import {FirebaseStorage, UseImagePicker} from '../../hooks';
import {AuthReducerType} from '../../interface/AuthInterface';
import {AddTransactionAction} from '../../redux/actions/addTransaction/AddTransaction';

const AddTransactionScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );
  console.log('userData----------', userData);
  const [noteValue, setNoteValue] = useState('');
  const [activeTab, setActiveTab] = useState('income');
  const [selectedInvoice, setSelectedInvoice] = useState<string | undefined>(
    undefined,
  );
  const [showCategoryModal, setShowCategoryModal] = useState({
    isVisible: false,
    mode: '',
  });
  const [amountValue, setAmountValue] = useState<number | undefined>(undefined);
  const [selectedTransactionWay, setSelectedTransactionWay] = useState<
    expenseArray | undefined
  >();
  const [selectedExpenseItem, setselectedExpenseItem] = useState<
    expenseArray | undefined
  >();

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
          transaction_note: noteValue,
          transaction_mode: activeTab,
          transaction_amount: amountValue,
          transaction_invoice: selectedInvoice,
          transaction_way: selectedTransactionWay?.name,
          transaction_category: selectedExpenseItem.name,
        },
        onSuccess: response => {
          if (response == 'success') {
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
      dispatch(AddTransactionAction(transactionDetail) as any);
    }
  };

  const onAddInvoicePress = () => {
    UseImagePicker(async response => {
      FirebaseStorage(response, res => {
        setSelectedInvoice(res);
      });
    });
  };

  const onTabChange = (val: string) => {
    setActiveTab(val);
    setselectedExpenseItem(undefined);
    setSelectedTransactionWay(undefined);
  };

  return (
    <View style={styles.container}>
      <TransactionHeader onBackPress={() => navigation.goBack()} />
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
                  : 'Select Transaction Way'}
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
              } else {
                setAmountValue(undefined);
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
            <Image
              source={{uri: selectedInvoice}}
              style={styles.selectedInvoiceImage}
            />
          </TouchableOpacity>
        </View>
        <PrimaryButton
          title="Add"
          onPress={onAddButtonPress}
          customeGradientStyle={styles.bottomAddButton}
        />
      </View>
      <CategoryModal
        data={
          showCategoryModal.mode == 'category'
            ? activeTab == 'expense'
              ? ExpenseCategoryData
              : IncomeCategoryData
            : TransactionModeData
        }
        isVisible={showCategoryModal.isVisible}
        toggleModal={onToggleModal}
        onSelectExpenseCategory={item => {
          onToggleModal();
          if (showCategoryModal.mode == 'category') {
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
