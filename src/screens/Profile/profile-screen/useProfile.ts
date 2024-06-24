import React, {useState} from 'react';
import {ColorConst} from '../../../theme';
import {ProfileImage} from '../../../../assets';
import auth, {firebase} from '@react-native-firebase/auth';
import {ProfileStrings} from '../../../constants/String';
import {AuthContext} from '../../../utils/AuthContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainNavigatorType, RootPage} from '../../../navigation/type';
import {StoreData} from '../../../utils';
import {userDataAction} from '../../../redux/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthReducerType} from '../../../interface';

export const useProfile = () => {
  const MenuItem = [
    {
      id: 1,
      bgColor: ColorConst.menu_ic,
      name: ProfileStrings.account,
      image: ProfileImage.wallet_ic,
    },
    {
      id: 2,
      bgColor: ColorConst.menu_ic,
      image: ProfileImage.upload_ic,
      name: ProfileStrings.export_data,
    },
    {
      id: 3,
      bgColor: ColorConst.logout,
      name: ProfileStrings.logout,
      image: ProfileImage.logout_ic,
    },
    {
      id: 4,
      bgColor: ColorConst.delete,
      name: ProfileStrings.delete,
      image: ProfileImage.delete_ic,
    },
  ];
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );
  const navigation = useNavigation<NavigationProp<MainNavigatorType>>();
  const {signOut} = React.useContext(AuthContext);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();

  const onItemPress = async (props: string) => {
    if (props === ProfileStrings.logout) {
      Alert.alert('Log Out', 'Are you sure, do you want to log out?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            signOut();
            auth().signOut();
          },
        },
      ]);
    } else if (props === ProfileStrings.account) {
      navigation.navigate(RootPage.AccountScreen);
    } else if (props === ProfileStrings.export_data) {
      navigation.navigate(RootPage.ExportDataScreen);
    } else {
      Alert.alert(
        'Delete Account',
        'Are you sure, do you want to Delete Account',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              deleteDocument();
              // const uid = auth().currentUser?.uid;
              // console.log('uid----------', uid);
              // setTimeout(async () => {
              //   firestore()
              //     .collection('Transactions')
              //     .doc('0A9ql8iwKgNduzCh3HyLH79y2Ox2')
              //     .delete()
              //     .then(() => {
              //       console.log('successfully deleted! ');
              //     })
              //     .catch(error => {
              //       console.log('Error removing document:', error);
              //     });
              // }, 200);
              // await auth().currentUser?.delete();
              // signOut();
            },
          },
        ],
      );
    }
  };

  const deleteDocument = async () => {
    try {
      console.log('userData?.userID----------', userData?.userID);
      await firestore()
        .collection('Transactions')
        .doc(userData?.userID)
        .collection('incomeExpense')
        .doc()
        .delete()
        .then(res => {
          console.log('res----------', res);
        });

      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const onToggleModal = () => setIsUpdateModalVisible(!isUpdateModalVisible);

  const onChangeText = (txt: string) => {
    setUserName(txt);
  };
  const onSubmitPress = async () => {
    const update = {
      displayName: userName,
    };
    await auth().currentUser?.updateProfile(update);
    const updatedUser = auth().currentUser;
    let userData = {
      userName: updatedUser?.displayName,
      userEmail: updatedUser?.email,
      userID: updatedUser?.uid,
    };
    dispatch(userDataAction(userData));
    StoreData('userData', JSON.stringify(userData));
    onToggleModal();
    setUserName('');
  };

  return {
    MenuItem,
    userName,
    onItemPress,
    onChangeText,
    onToggleModal,
    onSubmitPress,
    isUpdateModalVisible,
  };
};
