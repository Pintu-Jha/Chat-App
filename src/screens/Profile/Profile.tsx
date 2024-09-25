import axios from 'axios';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useUpdateUserAvatarMutation} from '../../API/endpoints/authApi';
import BottonComp from '../../components/common/BottonComp';
import Header from '../../components/common/Header';
import TextComp from '../../components/common/TextComp';
import {baseUrl, Update_Avatar} from '../../config/url';
import {logout} from '../../redux/slices/authSlice';
import {RootState} from '../../redux/store';
import {moderateScale, scale, textScale} from '../../styles/responsiveStyles';
import {pickDocument} from '../../utills/commonImagePicker';
import {
  clearAsyncKeyData,
  getToken,
  TOKEN_KEY,
  USER_DATA,
} from '../../utills/CustomAsyncStorage';
import {goBack} from '../../utills/HelperFuncation';

const Profile = ({}) => {
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
        let token = await getToken(TOKEN_KEY);
        await axios
          .patch(baseUrl + Update_Avatar, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            console.log(response);  
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }),
      {
        cropping: true,
        multiple: false,
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
        leftArrowNavigation={() => goBack()}
      />
      <View style={styles.userDetailsContainer}>
        <TouchableOpacity onPress={pickAndUploadImage}>
          <Image
            source={{
              uri: profile?.avatar?.url
                ? profile?.avatar?.url
                : 'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg',
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
