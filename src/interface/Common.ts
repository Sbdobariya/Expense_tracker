import {ImageSourcePropType} from 'react-native';
import {TransactionData} from './Transaction';
import {ImageOrVideo} from 'react-native-image-crop-picker';

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

export interface ChartData {
  color: string;
  text: string;
  value: number;
  percentage?: number;
  focused?: boolean;
}

export interface FilterDataProps {
  id: number;
  label: string;
}

export type DatabaseType = 'AddAccount' | 'AddTransaction';

export interface FirebaseDatabase {
  image: ImageOrVideo;
  from: DatabaseType;
}
