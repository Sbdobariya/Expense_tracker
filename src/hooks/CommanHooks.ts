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

export {FirebaseStorage};
