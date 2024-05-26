import React from 'react';
import {useSelector} from 'react-redux';
import {useProfile} from './useProfile';
import {styles} from './ProfileScreenStyle';
import {LogoutModal, MenuItemList} from '../../components';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {AuthReducerType} from '../../interface/AuthInterface';

const ProfileScreen: React.FC = () => {
  const {userData} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );

  const {MenuItem, onYesPress, isVisibleLogOutModal, onItemPress, toggleModal} =
    useProfile();

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.userNameText}>{userData?.userName}</Text>
      <FlatList
        data={MenuItem}
        style={styles.flatlist}
        renderItem={({item}) => {
          return <MenuItemList item={item} onItemPress={onItemPress} />;
        }}
      />
      <LogoutModal
        onNoPress={toggleModal}
        onYesPress={onYesPress}
        toggleModal={toggleModal}
        isVisible={isVisibleLogOutModal}
      />
    </View>
  );
};

export default ProfileScreen;
