import React, {useState} from 'react';
import {ColorConst} from '../../theme';
import {ProfileImage} from '../../../assets';
import auth from '@react-native-firebase/auth';
import {ProfileStrings} from '../../constants/String';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../utils/AuthContext';

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
  const [isVisibleLogOutModal, setIsVisibleLogOutModal] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const onYesPress = async () => {
    try {
      toggleModal();
      auth().signOut();
      await AsyncStorage.clear();
    } catch (error) {
      console.log('error----------', error);
    }
  };

  const onItemPress = (props: string) => {
    if (props === ProfileStrings.logout) {
      setIsVisibleLogOutModal(true);
    }
  };

  const toggleModal = () => setIsVisibleLogOutModal(false);
  const onToggleModal = () => setIsUpdateModalVisible(!isUpdateModalVisible);

  return {
    MenuItem,
    onYesPress,
    toggleModal,
    onItemPress,
    onToggleModal,
    isVisibleLogOutModal,
    isUpdateModalVisible,
  };
};
