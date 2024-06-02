import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {ToastType} from 'react-native-toast-message';

export const StoreData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Error on store data', error);
  }
};

export const GetData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log('Error on get data', error);
  }
};

export const ShowTostMessage = (
  messageText: string,
  messageType: ToastType,
) => {
  Toast.show({
    type: messageType,
    text1: messageText,
  });
};
