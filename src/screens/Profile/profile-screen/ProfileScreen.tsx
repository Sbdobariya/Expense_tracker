import React from 'react';
import {useSelector} from 'react-redux';
import {useProfile} from './useProfile';
import {ProfileImage} from '../../../../assets';
import {styles} from './ProfileScreenStyle';
import {FlatList, Image, Text, View} from 'react-native';
import {AuthReducerType} from '../../../interface';
import {
  MenuItemList,
  UpdateNameModal,
  CustomStatusBar,
  ProfileHeader,
} from '../../../components';
import {ColorConst} from '../../../theme';

const ProfileScreen: React.FC = () => {
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );

  const {
    MenuItem,
    onItemPress,
    onToggleModal,
    isUpdateModalVisible,
    userName,
    onChangeText,
    onSubmitPress,
  } = useProfile();

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={ColorConst.profile_header}
        barStyle="dark-content"
      />
      <ProfileHeader title="Profile" onToggleModal={onToggleModal} />
      <View style={styles.headerContainer}>
        <Image source={ProfileImage.user_ic} style={styles.userProfile} />
        <Text style={styles.userNameText}>{userData?.userName}</Text>
        <Text style={styles.userEmailText}>{userData?.userEmail}</Text>
      </View>

      <FlatList
        data={MenuItem}
        style={styles.flatList}
        renderItem={({item}) => {
          return <MenuItemList item={item} onItemPress={onItemPress} />;
        }}
      />
      <UpdateNameModal
        onSubmitPress={onSubmitPress}
        onChangeText={onChangeText}
        userName={userName}
        isVisible={isUpdateModalVisible}
        toggleModal={onToggleModal}
      />
    </View>
  );
};

export default ProfileScreen;
