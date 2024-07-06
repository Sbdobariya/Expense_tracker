import React from 'react';
import {useSelector} from 'react-redux';
import {useProfile} from './useProfile';
import {ProfileImage, TransactionImages} from '../../../../assets';
import {styles} from './ProfileScreenStyle';
import {FlatList, Image, Text, View} from 'react-native';
import {AuthReducerType} from '../../../interface';
import {
  MenuItemList,
  UpdateNameModal,
  CustomStatusBar,
  ProfileHeader,
  TouchableIcon,
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
    onCameraPress,
  } = useProfile();

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={ColorConst.profile_header}
        barStyle="dark-content"
      />
      <ProfileHeader title="Profile" onToggleModal={onToggleModal} />
      <View style={styles.headerContainer}>
        <View style={styles.cameraView}>
          <Image
            source={
              userData?.userImage
                ? {uri: userData?.userImage}
                : ProfileImage.user_ic
            }
            style={styles.userProfile}
          />
          <TouchableIcon
            source={TransactionImages.camera_ic}
            customIconStyle={styles.cameraImage}
            onIconPress={onCameraPress}
          />
        </View>
        <Text style={styles.userNameText}>{userData?.userName}</Text>
        <Text style={styles.userEmailText}>{userData?.userEmail}</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          bounces={false}
          data={MenuItem}
          style={styles.flatList}
          renderItem={({item}) => {
            return <MenuItemList item={item} onItemPress={onItemPress} />;
          }}
        />
      </View>
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
