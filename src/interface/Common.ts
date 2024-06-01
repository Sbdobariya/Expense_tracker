import {ImageSourcePropType} from 'react-native';
import {TransactionData} from './Transaction';

export interface ExpenseArray {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

export interface StateProps {
  isVisible: boolean;
  item?: TransactionData;
}

export type CategorySum = {
  [key: string]: {
    value: number;
    image: ImageSourcePropType | null;
  };
};

export interface ModifiedData {
  accountName: string;
  transactionAmount: number;
  accountImage: ImageSourcePropType | null;
}
