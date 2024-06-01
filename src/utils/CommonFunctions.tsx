import AsyncStorage from '@react-native-async-storage/async-storage';

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
