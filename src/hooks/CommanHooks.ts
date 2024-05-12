import moment from 'moment';
import storage from '@react-native-firebase/storage';
import {ImageOrVideo} from 'react-native-image-crop-picker';

const FirebaseStorage = (
  response: ImageOrVideo,
  resolve: (res: string) => void,
) => {
  const docPath = response.sourceURL || '';
  const docName = response.filename;
  const reference = storage().ref();
  const task = reference.child('/invoices/' + docName).putFile(docPath);
  task?.on('state_changed', async onSnap => {
    const imageUrl = await storage()
      .ref(onSnap?.ref?.fullPath)
      .getDownloadURL();
    resolve(imageUrl);
  });
};

const transactionTimeStamp = (
  item: {nanoseconds: number; seconds: number} | undefined,
) => {
  const timestamp = item && item?.seconds * 1000 + item?.nanoseconds / 1000000;
  const transactionDate = moment(timestamp);
  const currentDate = moment();

  const timStamp = transactionDate.isSame(currentDate, 'day')
    ? `Today ${moment(timestamp).format('h:mm A')}`
    : transactionDate.isSame(currentDate.subtract(1, 'day'), 'day')
    ? `Yesterday ${moment(timestamp).format('h:mm A')}`
    : moment(timestamp).format('LL h:mm A');

  return timStamp;
};

export {FirebaseStorage, transactionTimeStamp};
