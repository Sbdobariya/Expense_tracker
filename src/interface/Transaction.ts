import {UserDataType} from './AuthInterface';
import {ExpenseArray} from './Common';

export interface AddTransaction {
  data: {
    user_data?: UserDataType;
    transaction_note: string;
    transaction_mode: string;
    transaction_amount: number;
    transaction_invoice: string | undefined;
    transaction_category: ExpenseArray | undefined;
    transaction_account: ExpenseArray | undefined;
  };
  onSuccess?: (res: any) => void;
  onFail?: (err: any) => void;
}
export interface GetTransaction {
  data: {
    user_data?: UserDataType;
  };
  onSuccess?: (res: any) => void;
  onFail?: (err: any) => void;
}

export interface EditTransaction {
  data: {
    user_data?: UserDataType;
    transaction_id?: string;
    transaction_mode: string;
    transaction_note: string;
    transaction_amount?: number;
    transaction_invoice?: string;
    transaction_account: ExpenseArray | undefined;
    transaction_category: ExpenseArray | undefined;
  };
  onSuccess?: (res: any) => void;
  onFail?: (err: any) => void;
}

export interface TransactionData {
  timestamp: string | null;
  transaction_id?: string;
  transaction_mode: string;
  transaction_note: string;
  transaction_amount: number;
  transaction_invoice: string;
  transaction_createdAt: string;
  transaction_account: ExpenseArray | undefined;
  transaction_category: ExpenseArray | undefined;
}

export interface TransactionReducerType {
  transactionData: TransactionData[];
  EditedData: TransactionData | undefined;
}

export interface DeleteDataType {
  item: TransactionData;
  id: string | undefined;
}
