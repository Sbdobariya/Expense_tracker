import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

const UseImagePicker = (response: (image: ImageOrVideo) => void) => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    response(image);
  });
};

export {UseImagePicker};
