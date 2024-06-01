import React, {useState} from 'react';
import {ColorConst} from '../../../theme';
import {ProfileImage} from '../../../../assets';
import auth from '@react-native-firebase/auth';
import {ProfileStrings} from '../../../constants/String';
import {AuthContext} from '../../../utils/AuthContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainNavigatorType, RootPage} from '../../../navigation/type';

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

  const onItemPress = (props: string) => {
    if (props === ProfileStrings.logout) {
      signOut();
      auth().signOut();
    } else if (props === ProfileStrings.account) {
      navigation.navigate(RootPage.AccountScreen);
    }
  };

  const onToggleModal = () => setIsUpdateModalVisible(!isUpdateModalVisible);

  return {
    MenuItem,
    onItemPress,
    onToggleModal,
    isUpdateModalVisible,
  };
};
