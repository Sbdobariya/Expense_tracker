import {expenseArray} from './Comman';
import {userDataType} from './AuthInterface';

export interface AddTransaction {
  data: {
    user_data?: userDataType;
    transaction_note: string;
    transaction_mode: string;
    transaction_amount: number;
    transaction_invoice: string | undefined;
    transaction_category: expenseArray | undefined;
    transaction_account: expenseArray | undefined;
  };
  onSuccess?: (res: any) => void;
  onFail?: (err: any) => void;
}
export interface GetTransaction {
  data: {
    user_data?: userDataType;
  };
  onSuccess?: (res: any) => void;
  onFail?: (err: any) => void;
}

export interface EditTransaction {
  data: {
    user_data?: userDataType;
    transaction_id?: string;
    transaction_mode: string;
    transaction_note: string;
    transaction_amount?: number;
    transaction_invoice?: string;
    transaction_account: expenseArray | undefined;
    transaction_category: expenseArray | undefined;
  };
  transaction_createdAt?: {nanoseconds: number; seconds: number};
  onSuccess?: (res: any) => void;
  onFail?: (err: any) => void;
}
export interface TransactionData {
  transaction_id?: string;
  transaction_mode: string;
  transaction_note: string;
  transaction_amount: number;
  transaction_invoice: string;
  transaction_account: expenseArray | undefined;
  transaction_category: expenseArray | undefined;
  transaction_createdAt: {nanoseconds: number; seconds: number};
}

export interface TransactionReducerType {
  transactionData: TransactionData[];
  EditedData: TransactionData | undefined;
}

export interface DeleteDataType {
  item: TransactionData;
  id: string | undefined;
}
