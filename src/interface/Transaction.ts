import {userDataType} from './AuthInterface';

export interface AddTransaction {
  data: {
    user_data?: userDataType;
    transaction_note: string;
    transaction_mode: string;
    transaction_amount: number;
    transaction_category: string;
    transaction_way: string | undefined;
    transaction_invoice: string | undefined;
  };
  onSuccess?: (res: any) => void;
  onFail?: (err: any) => void;
}
