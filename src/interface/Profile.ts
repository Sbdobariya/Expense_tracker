import {ExpenseArray} from './Common';

export interface FormattedTransaction {
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

export interface GroupedTransactions {
  [date: string]: FormattedTransaction[];
}
