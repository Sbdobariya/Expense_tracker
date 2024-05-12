import {createSlice} from '@reduxjs/toolkit';
import {TransactionReducerType} from '../../../interface/Transaction';

const initialState: TransactionReducerType = {
  transactionData: [],
  EditedData: undefined,
};

const TransactionReducer = createSlice({
  name: 'TransactionReducer',
  initialState,
  reducers: {
    TransactionAction: (state, action) => {
      state.transactionData = action.payload;
    },
    DeleteTransaction: (state, action) => {
      state.transactionData = state.transactionData.filter(
        item => item.transaction_id !== action.payload.transaction_id,
      );
    },
    EditTransactionData: (state, action) => {
      state.EditedData = action.payload;
    },
  },
});

export const {TransactionAction, DeleteTransaction, EditTransactionData} =
  TransactionReducer.actions;

export default TransactionReducer.reducer;
