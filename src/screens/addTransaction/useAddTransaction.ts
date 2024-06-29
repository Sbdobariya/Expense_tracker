import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {EditTransactionData} from '../../redux/reducer';
import {FirebaseStorage, UseImagePicker} from '../../hooks';
import {AddTransactionAction, EditTransactionAction} from '../../redux/actions';
import {
  AddTransaction,
  AuthReducerType,
  EditTransaction,
  ExpenseArray,
  TransactionReducerType,
} from '../../interface';
import {HomeImages} from '../../../assets';
import {
  ExpenseCategoryData,
  IncomeCategoryData,
  ShowTostMessage,
  TransactionAccountData,
} from '../../utils';

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
    ExpenseArray | undefined
  >(
    EditedData?.transaction_account
      ? EditedData?.transaction_account
      : undefined,
  );
  const [selectedExpenseItem, setSelectedExpenseItem] = useState<
    ExpenseArray | undefined
  >(
    EditedData?.transaction_category
      ? EditedData?.transaction_category
      : undefined,
  );
  const [isImageLoader, setIsImageLoader] = useState(false);
  const [isShowAddCategoryModal, setIsShowAddCategoryModal] = useState(false);

  const onToggleModal = () => {
    setShowCategoryModal({
      isVisible: false,
      mode: '',
    });
  };

  const onAddButtonPress = () => {
    if (!selectedExpenseItem) {
      ShowTostMessage('Please Select Category', 'error');
    } else if (amountValue === undefined) {
      ShowTostMessage('Please enter amount', 'error');
    } else if (!selectedTransactionWay) {
      ShowTostMessage('Please Select Account', 'error');
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
            setSelectedExpenseItem(undefined);
            setSelectedTransactionWay(undefined);
            setSelectedTransactionWay(undefined);
            ShowTostMessage('Transaction Added', 'success');
          }
        },
        onFail: error => {
          ShowTostMessage(JSON.stringify(error), 'error');
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
    setSelectedExpenseItem(undefined);
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
        ShowTostMessage('Transaction Updated', 'success');
      },
    };
    EditTransactionAction(request);
  };

  const onBackPress = () => {
    navigation.goBack();
    dispatch(EditTransactionData(undefined));
  };

  const onSelectCategoryPress = (item: string) => {
    setShowCategoryModal({isVisible: true, mode: item});
  };

  const AccountImage = selectedTransactionWay
    ? selectedTransactionWay.image
    : HomeImages.transfer_ic;
  const AccountName = selectedTransactionWay
    ? selectedTransactionWay.name
    : 'Select Account';
  const CategoryImage = selectedExpenseItem
    ? selectedExpenseItem.image
    : HomeImages.category_ic;
  const CategoryName = selectedExpenseItem
    ? selectedExpenseItem?.name
    : 'Select Category';

  const CategoryModalData =
    showCategoryModal.mode === 'category'
      ? activeTab === 'expense'
        ? ExpenseCategoryData
        : IncomeCategoryData
      : TransactionAccountData;

  const onAddCategoryToggleModal = () => {
    console.log('Calla');

    setIsShowAddCategoryModal(!isShowAddCategoryModal);
  };

  return {
    activeTab,
    noteValue,
    EditedData,
    amountValue,
    onBackPress,
    setNoteValue,
    onTabChange,
    AccountName,
    AccountImage,
    CategoryName,
    isImageLoader,
    onToggleModal,
    CategoryImage,
    onUpDatePress,
    setAmountValue,
    selectedInvoice,
    onAddButtonPress,
    onAddInvoicePress,
    showCategoryModal,
    CategoryModalData,
    onSelectCategoryPress,
    setSelectedExpenseItem,
    isShowAddCategoryModal,
    onAddCategoryToggleModal,
    setSelectedTransactionWay,
  };
};
