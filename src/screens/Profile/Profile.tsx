import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import Header from '../../components/common/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainRootStackParams} from '../../navigation/MainStack';
import {
  moderateScale,
  scale,
  textScale,
  width,
} from '../../styles/responsiveStyles';
import TextComp from '../../components/common/TextComp';
import BottonComp from '../../components/common/BottonComp';
import {useUpdateUserAvatarMutation} from '../../API/endpoints/authApi';
import {pickDocument} from '../../utills/commonImagePicker';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/slices/authSlice';
import {RootState} from '../../redux/store';
import {localIPAddress} from '../../config/url';
import {clearAsyncKeyData, USER_DATA} from '../../utills/CustomAsyncStorage';

type Props = NativeStackScreenProps<MainRootStackParams, 'profileScreen'>;

const Profile: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [updateUserAvatar] = useUpdateUserAvatarMutation();
  const pickAndUploadImage = () => {
    pickDocument(async (selectedImage: any) => {
      const formData = new FormData();
      formData.append('avatar', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.name,
      });

      try {
        await updateUserAvatar(formData).unwrap();
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }),
      {
        cropping: true, // Example option
        multiple: false, // Ensure single image selection
      };
  };
  const handaleLogout = async () => {
    dispatch(logout());
    await clearAsyncKeyData(USER_DATA);
  };
  const profile = useSelector((state: RootState) => state?.auth?.user);
  return (
    <View>
      <Header
        isRightHeaderContainer={true}
        isRightHeaderContainerImageWant={false}
        userNameText="profile"
        leftArrowNavigation={() => navigation.goBack()}
      />
      <View style={styles.userDetailsContainer}>
        <TouchableOpacity onPress={pickAndUploadImage}>
          <Image
            source={{
              uri:
                profile?.avatar?.url ||
                'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg',
            }}
            style={styles.DPStyle}
          />
        </TouchableOpacity>
        <TextComp text={profile?.username} style={styles.userNameStyle} />
      </View>
      <BottonComp
        style={styles.logoutBtnStyle}
        text="Log Out"
        textStyle={styles.logoutTextStyle}
        onPress={handaleLogout}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
  },
  DPStyle: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(80) / 2,
    resizeMode: 'cover',
  },
  userNameStyle: {
    fontSize: textScale(25),
    fontWeight: '500',
    marginLeft: moderateScale(10),
    textTransform: 'capitalize',
  },
  logoutBtnStyle: {
    marginHorizontal: moderateScale(16),
  },
  logoutTextStyle: {
    fontSize: textScale(20),
    fontWeight: '500',
  },
});
