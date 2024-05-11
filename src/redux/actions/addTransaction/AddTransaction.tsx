import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {AddTransaction} from '../../../interface/Transaction';

export const AddTransactionAction = createAsyncThunk(
  'user/signup',
  async (request: AddTransaction, {dispatch}) => {
    console.log('request----------', request);
    firestore()
      .collection('Transactions')
      .doc(request.data.user_data?.userID)
      .collection('incomeExpense')
      .add({
        transaction_createdAt: new Date(),
        transaction_way: request.data.transaction_way,
        transaction_note: request.data.transaction_note,
        transaction_mode: request.data.transaction_mode,
        transaction_amount: request.data.transaction_amount,
        transaction_invoice: request.data.transaction_invoice,
        transaction_category: request.data.transaction_category,
      })
      .then(() => {
        request.onSuccess && request.onSuccess('success');
      });
  },
);
