import moment, {MomentInput} from 'moment';
import storage from '@react-native-firebase/storage';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {CalendarUtils} from 'react-native-calendars';

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

const transactionTimeStamp = (item: MomentInput) => {
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

const calendarProviderDate = () => {
  const today = new Date();
  return CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate()),
  );
};

const randomeBGColor = () => {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = 'rgb(' + x + ',' + y + ',' + z + ')';
  return bgColor;
};

export {
  randomeBGColor,
  FirebaseStorage,
  transactionTimeStamp,
  calendarProviderDate,
};
