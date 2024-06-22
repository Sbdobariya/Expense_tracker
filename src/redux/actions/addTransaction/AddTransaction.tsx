import moment from 'moment';
import {
  AddTransaction,
  DeleteDataType,
  EditTransaction,
  GetTransaction,
} from '../../../interface';
import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {DeleteTransaction, TransactionAction} from '../../reducer';

export const AddTransactionAction = (request: AddTransaction) => {
  const Today = moment(new Date()).format('YYYY-MM-DD');

  firestore()
    .collection('Transactions')
    .doc(request.data.user_data?.userID)
    .collection('incomeExpense')
    .add({
      transaction_id: '',
      transaction_createdAt: Today,
      timestamp: firestore.FieldValue.serverTimestamp(),
      transaction_mode: request.data.transaction_mode,
      transaction_amount: request.data.transaction_amount,
      transaction_account: request.data.transaction_account,
      transaction_note: request.data.transaction_note || '',
      transaction_category: request.data.transaction_category,
      transaction_invoice: request.data.transaction_invoice || '',
    })
    .then(docRef => {
      const docId = docRef.id;
      docRef
        .update({transaction_id: docId})
        .then(() => {
          request.onSuccess && request.onSuccess('success');
        })
        .catch(error => {
          console.error('Error updating document ID:', error);
        });
    });
};

export const GetTransactionAction = createAsyncThunk(
  'GetTransactionAction',
  async (request: GetTransaction, {dispatch}) => {
    const querySnapshot = await firestore()
      .collection('Transactions')
      .doc(request?.data.user_data?.userID)
      .collection('incomeExpense')
      .orderBy('transaction_createdAt', 'desc')
      .get();

    const data = querySnapshot?.docs?.map(snp => {
      const transactionData = snp.data();
      return {
        ...transactionData,
        timestamp: transactionData.timestamp
          ? transactionData.timestamp.toDate().toISOString()
          : null,
      };
    });
    request.onSuccess && request.onSuccess('Success');
    dispatch(TransactionAction(data));
  },
);

export const DeleteTransactions = createAsyncThunk(
  'DeleteTransactions',
  async (request: DeleteDataType, {dispatch}) => {
    dispatch(DeleteTransaction(request.item));
    firestore()
      .collection('Transactions')
      .doc(request.id)
      .collection('incomeExpense')
      .doc(request.item.transaction_id)
      .delete();
  },
);

export const EditTransactionAction = (request: EditTransaction) => {
  firestore()
    .collection('Transactions')
    .doc(request.data.user_data?.userID)
    .collection('incomeExpense')
    .doc(request.data.transaction_id)
    .update({
      transaction_mode: request.data.transaction_mode,
      transaction_note: request.data.transaction_note || '',
      transaction_amount: request.data.transaction_amount,
      transaction_invoice: request.data.transaction_invoice || '',
      transaction_category: request.data.transaction_category,
      transaction_account: request.data.transaction_account,
    })
    .then(() => {
      request.onSuccess && request.onSuccess('User updated!');
    });
};
