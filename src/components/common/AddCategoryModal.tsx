import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';
import Modal from 'react-native-modal';
import {TransactionImages} from '../../../assets';
import InputText from './InputText';
import PrimaryButton from './PrimaryButton';
import {FirebaseStorage, UseImagePicker} from '../../hooks';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {
  AddAccountType,
  AuthReducerType,
  FirebaseDatabase,
} from '../../interface';
import {ShowTostMessage} from '../../utils';
import Toast from 'react-native-toast-message';
import {AddAccountAction} from '../../redux/actions';
import {useSelector} from 'react-redux';

interface Props {
  isVisible: boolean;
  toggleModal: () => void;
  activeTab?: string;
  account?: string;
}

const AddCategoryModal: React.FC<Props> = ({
  isVisible,
  toggleModal,
  activeTab,
  account,
}) => {
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );
  const [accountName, setAccountName] = useState('');
  const [isImageLoader, setIsImageLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const onAddImagePress = () => {
    UseImagePicker(async (response: ImageOrVideo) => {
      setIsImageLoader(true);
      const obj: FirebaseDatabase = {
        image: response,
        from: 'AddAccount',
      };
      FirebaseStorage(obj, res => {
        setSelectedImage(res);
        setIsImageLoader(false);
      });
    });
  };

  const onAddPress = () => {
    if (isImageLoader) {
      ShowTostMessage('Processing .... ', 'error');
    } else {
      if (accountName === '') {
        ShowTostMessage('Please Enter Account Name', 'error');
      } else {
        const transactionDetail: AddAccountType = {
          data: {
            userID: userData?.userID,
            accountName: accountName,
            selectedImage: selectedImage ?? '',
            activeTab: activeTab,
            account: account,
          },
          onSuccess: response => {
            if (response === 'success') {
              setAccountName('');
              setSelectedImage(undefined);
              ShowTostMessage('Account Added Successfully', 'success');
              toggleModal();
            }
          },
          onFail: error => {
            ShowTostMessage(JSON.stringify(error), 'error');
          },
        };
        AddAccountAction(transactionDetail);
      }
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.6}
      animationIn="slideInUp"
      onSwipeComplete={toggleModal}
      onBackdropPress={toggleModal}>
      <Toast position="top" topOffset={hp(7)} />
      <View style={styles.modalContent}>
        <Text style={styles.headerText}>Add {activeTab} Account</Text>
        <TouchableOpacity style={styles.imageView} onPress={onAddImagePress}>
          {isImageLoader ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <Image
              source={
                selectedImage
                  ? {uri: selectedImage}
                  : TransactionImages.camera_ic
              }
              style={
                selectedImage ? styles.selectedImageStyle : styles.cameraImage
              }
            />
          )}
        </TouchableOpacity>
        <InputText
          value={accountName}
          placeholder="Enter Account Name"
          onChangeText={txt => setAccountName(txt)}
        />
        <PrimaryButton
          title="Add"
          onPress={onAddPress}
          customGradientStyle={styles.customGradientStyle}
        />
      </View>
    </Modal>
  );
};

export default memo(AddCategoryModal);

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalContent: {
    padding: hp(1),
    overflow: 'hidden',
    borderRadius: hp(2),
    marginHorizontal: wp(5),
    backgroundColor: ColorConst.white,
  },
  headerText: {
    color: ColorConst.dark_black,
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginTop: hp(2),
  },
  cameraImage: {
    height: hp(5),
    width: hp(5),
  },
  imageView: {
    borderWidth: 1,
    height: hp(15),
    width: hp(15),
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp(4),
  },
  customGradientStyle: {
    marginVertical: hp(3),
  },
  selectedImageStyle: {
    height: hp(15),
    width: hp(15),
    borderRadius: hp(10),
  },
});
