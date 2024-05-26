import {useState} from 'react';
import {Alert} from 'react-native';
import {
  AddTransaction,
  EditTransaction,
  TransactionReducerType,
} from '../../interface/Transaction';
import {expenseArray} from '../../interface/Comman';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {EditTransactionData} from '../../redux/reducer';
import {FirebaseStorage, UseImagePicker} from '../../hooks';
import {AuthReducerType} from '../../interface/AuthInterface';
import {AddTransactionAction, EditTransactionAction} from '../../redux/actions';

export const useAddTransaction = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  return {
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
    setselectedExpenseItem,
    selectedTransactionWay,
    setSelectedTransactionWay,
  };
};
