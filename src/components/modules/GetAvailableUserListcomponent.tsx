import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC, useEffect} from 'react';
import GetAvailableUserListColums from '../columns/GetAvailableUserListColums';
import {
  useCreateChatMutation,
  useGetAvailableUserQuery,
} from '../../API/endpoints/mainApi';
import navigationString from '../../navigation/navigationString';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainRootStackParams} from '../../navigation/MainStack';
import {useDispatch} from 'react-redux';
import {createChatData} from '../../redux/slices/createChatSlice';
import Header from '../common/Header';
import VirtualizedView from '../common/VirtualizedView';
import {Image} from 'react-native-svg';
import CommunitiesSvg from '../../asset/SVG/CommunitiesSvg';
import {moderateScale, scale, textScale} from '../../styles/responsiveStyles';
import TextComp from '../common/TextComp';
import { UserInterface } from '../interfaces/user';

type Props = NativeStackScreenProps<
  MainRootStackParams,
  typeof navigationString.GetAvailableUser
>;
const GetAvailableUserListcomponent: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    data: usersAvailable,
    isLoading,
    isError,
    refetch: refetchData,
  } = useGetAvailableUserQuery();
  const [createChat] = useCreateChatMutation();

  async function onPressProgram(item: UserInterface) {
    try {
      const {data, statusCode, message, success} = await createChat({
        receiverId: item._id,
      }).unwrap();
      dispatch(
        createChatData({
          statusCode: statusCode,
          data: data,
          message: message,
          success: success,
        }),
      );
      navigation.navigate(navigationString.CHAT_SCREEN, {userId: data});
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View>
      <Header
        isRightHeaderContainer={true}
        isRightHeaderContainerImageWant={false}
        leftArrowNavigation={() => navigation.goBack()}
      />
      <TouchableOpacity
        style={styles.newGroupBtnContainer}
        onPress={() =>
          navigation.navigate(navigationString.NewGroup_Screen, {
            AvailableUserData: usersAvailable?.data, 
          })
        }>
        <View style={styles.newGroupBtn}>
          <CommunitiesSvg />
        </View>
        <TextComp text="New Group" style={styles.newGroupBtnTextStyle} />
      </TouchableOpacity>
      <FlatList
        data={usersAvailable?.data}
        keyExtractor={(item, index) => item._id.toString()}
        renderItem={({item, index}) => (
          <GetAvailableUserListColums
            item={item}
            index={index}
            isLoading={isLoading}
            key={'GetAvailableUserListColums' + item._id}
            refetchData={refetchData}
            isError={isError}
            onPressProgram={onPressProgram}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  newGroupBtn: {
    width: scale(50),
    height: scale(50),
    backgroundColor: 'green',
    borderRadius: scale(50) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newGroupBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(16),
    marginHorizontal: moderateScale(20),
  },
  newGroupBtnTextStyle: {
    color: '#0F0C1A',
    opacity: 1,
    fontSize: textScale(16),
    fontWeight: '600',
    marginLeft: moderateScale(12),
  },
});

export default GetAvailableUserListcomponent;
