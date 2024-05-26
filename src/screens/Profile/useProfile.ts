import {ColorConst} from '../../theme';
import {ProfileImage} from '../../../assets';
import {ProfileStrings} from '../../constants/String';
import {useState} from 'react';

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

  const onYesPress = () => {};

  const onItemPress = (props: string) => {
    if (props === ProfileStrings.logout) {
      setIsVisibleLogOutModal(true);
    }
  };

  const toggleModal = () => setIsVisibleLogOutModal(false);

  return {
    MenuItem,
    onYesPress,
    toggleModal,
    onItemPress,
    isVisibleLogOutModal,
  };
};
