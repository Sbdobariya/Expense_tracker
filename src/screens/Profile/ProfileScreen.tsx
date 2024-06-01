import {MenuItemList, TouchableIcon, UpdateNameModal} from '../../components';
import React from 'react';
import {useSelector} from 'react-redux';
import {useProfile} from './useProfile';
import {HomeImages} from '../../../assets';
import {styles} from './ProfileScreenStyle';
import {ProfileStrings} from '../../constants/String';
import {AuthReducerType} from '../../interface/AuthInterface';
import {FlatList, SafeAreaView, Text, View} from 'react-native';

const ProfileScreen: React.FC = () => {
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );

  const {MenuItem, onItemPress, onToggleModal, isUpdateModalVisible} =
    useProfile();

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.headerContainer}>
        <View style={styles.userNameView}>
          <Text style={styles.userName}>{ProfileStrings.username}</Text>
          <Text style={styles.userNameText}>{userData?.userName}</Text>
        </View>
        <TouchableIcon
          onIconPress={onToggleModal}
          source={HomeImages.edit_ic}
          customeIconStyle={styles.editIcon}
        />
      </View>
      <FlatList
        data={MenuItem}
        style={styles.flatlist}
        renderItem={({item}) => {
          return <MenuItemList item={item} onItemPress={onItemPress} />;
        }}
      />
      <UpdateNameModal
        isVisible={isUpdateModalVisible}
        toggleModal={onToggleModal}
      />
    </View>
  );
};

export default ProfileScreen;
