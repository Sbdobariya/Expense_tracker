import React, {useState} from 'react';
import {ColorConst} from '../../../theme';
import {ProfileImage} from '../../../../assets';
import auth from '@react-native-firebase/auth';
import {ProfileStrings} from '../../../constants/String';
import {AuthContext} from '../../../utils/AuthContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainNavigatorType, RootPage} from '../../../navigation/type';
import {StoreData} from '../../../utils';
import {userDataAction} from '../../../redux/reducer';
import {useDispatch} from 'react-redux';

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
  ];
  const navigation = useNavigation<NavigationProp<MainNavigatorType>>();
  const {signOut} = React.useContext(AuthContext);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();

  const onItemPress = (props: string) => {
    if (props === ProfileStrings.logout) {
      signOut();
      auth().signOut();
    } else if (props === ProfileStrings.account) {
      navigation.navigate(RootPage.AccountScreen);
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
