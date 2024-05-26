import {ImageSourcePropType} from 'react-native';
import {TransactionData} from './Transaction';

export interface expenseArray {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

export interface stateProps {
  isVisible: boolean;
  item?: TransactionData;
}
