import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
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

type Props = NativeStackScreenProps<MainRootStackParams, 'profileScreen'>;

const Profile: FC<Props> = ({navigation}) => {
  const [updateUserAvatar, {isLoading, error}] = useUpdateUserAvatarMutation();
  const changProfileImage = async () => {
    pickDocument(async (selectedFile: any) => {
      await updateUserAvatar(selectedFile);
    });
  };
  return (
    <View>
      <Header
        isRightHeaderContainer={true}
        isRightHeaderContainerImageWant={false}
        userNameText="profile"
        leftArrowNavigation={() => navigation.goBack()}
      />
      <View style={styles.userDetailsContainer}>
        <TouchableOpacity onPress={changProfileImage}>
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg',
            }}
            style={styles.DPStyle}
          />
        </TouchableOpacity>
        <TextComp text="Pintu" style={styles.userNameStyle} />
      </View>
      <BottonComp
        style={styles.logoutBtnStyle}
        text="Log Out"
        textStyle={styles.logoutTextStyle}
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
    height: moderateScale(80),
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
