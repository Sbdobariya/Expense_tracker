import moment, {MomentInput} from 'moment';
import storage from '@react-native-firebase/storage';
import {ImageOrVideo} from 'react-native-image-crop-picker';

const FirebaseStorage = async (
  response: ImageOrVideo,
  resolve: (res: string) => void,
) => {
  const localFilePath = response?.path;
  const filename = localFilePath.substring(localFilePath.lastIndexOf('/') + 1);

  try {
    await storage().ref(`invoicing/${filename}`).putFile(localFilePath);
    const imageUrl = await storage()
      .ref(`invoicing/${filename}`)
      .getDownloadURL();
    console.log('Image URL:', imageUrl);
    resolve(imageUrl);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

const TransactionTimeStamp = (item: MomentInput) => {
  const transactionDate = moment(item);
  const currentDate = moment();

  if (transactionDate.isSame(currentDate, 'day')) {
    return `Today ${transactionDate.format('hh:mm A')}`;
  } else if (transactionDate.isSame(currentDate.subtract(1, 'day'), 'day')) {
    return `Yesterday ${transactionDate.format('hh:mm A')}`;
  } else {
    return transactionDate.format('D MMMM');
  }
};

const AccountDetailTimeStamp = (item: MomentInput) => {
  const transactionDate = moment(item);
  const currentDate = moment();

  if (transactionDate.isSame(currentDate, 'day')) {
    return `Today`;
  } else if (transactionDate.isSame(currentDate.subtract(1, 'day'), 'day')) {
    return `Yesterday`;
  } else {
    return transactionDate.format('D MMMM');
  }
};

const RandomBGColor = () => {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = 'rgb(' + x + ',' + y + ',' + z + ')';
  return bgColor;
};

const getTime = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

export {
  getTime,
  RandomBGColor,
  FirebaseStorage,
  TransactionTimeStamp,
  AccountDetailTimeStamp,
};
