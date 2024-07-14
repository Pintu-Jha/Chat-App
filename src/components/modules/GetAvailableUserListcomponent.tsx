import {View, Text, FlatList} from 'react-native';
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

  async function onPressProgram(item: Record<string, any>) {
    try {
      const {data} = await createChat({receiverId: item._id}).unwrap();
      dispatch(
        createChatData({
          statusCode: data?.statusCode,
          data: data?.data,
          lastMessage: data?.lastMessage,
          message: data?.message,
          success: data?.success,
        }),
      )
      navigation.navigate(navigationString.CHAT_SCREEN, {userId: data});
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View>
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

export default GetAvailableUserListcomponent;
