import {ImageBackground, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ColorConst, fontSize, fonts, hp, wp} from '../../theme';
import {HomeImages, ProfileImage} from '../../../assets';
import TouchableIcon from '../common/TouchableIcon';

interface ProfileHeaderProps {
  title: string;
  onToggleModal: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  title,
  onToggleModal,
}) => {
  return (
    <ImageBackground
      source={ProfileImage.bg_ic}
      style={{
        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? hp(12) : hp(9),
        height: hp(25),
      }}
      resizeMode="stretch">
      <View style={styles.flexBox} />
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.buttonContainer}>
        <TouchableIcon
          onIconPress={onToggleModal}
          source={HomeImages.edit_ic}
          customIconStyle={styles.editIcon}
        />
      </View>
    </ImageBackground>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  flexBox: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerText: {
    flex: 1,
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
    color: ColorConst.white,
    textAlign: 'center',
  },
  headerImage: {
    left: wp(-5),
    position: 'absolute',
  },
  timeStyle: {
    fontSize: fontSize(13),
    color: ColorConst.white,
    fontFamily: fonts.medium,
  },
  editIcon: {
    width: hp(3),
    height: hp(3),
    marginRight: wp(4),
    tintColor: ColorConst.white,
  },
});
