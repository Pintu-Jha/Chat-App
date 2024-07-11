import {View, Text, FlatList} from 'react-native';
import React, {FC} from 'react';
import GetAvailableUserListColums from '../columns/GetAvailableUserListColums';
import {
  useCreateChatMutation,
  useGetAvailableUserQuery,
} from '../../API/endpoints/mainApi';
import navigationString from '../../navigation/navigationString';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainRootStackParams} from '../../navigation/MainStack';
import LoadingScreen from '../common/Loader';

type Props = NativeStackScreenProps<
  MainRootStackParams,
  typeof navigationString.GetAvailableUser
>;
const GetAvailableUserListcomponent: FC<Props> = ({navigation}) => {
  const {
    data: usersAvailable,
    isLoading,
    isError,
    refetch: refetchData,
  } = useGetAvailableUserQuery();

  const [createChat, {isLoading: isCreating, error, isSuccess}] =
    useCreateChatMutation();

  function onPressProgram(item: Record<string, any>) {
    createChat({userId: item._id})
      .unwrap()
      .then(() => {
        navigation.navigate(navigationString.CHAT_SCREEN, {id: item._id});
      })
      .catch(err => {
        console.error('Failed to create chat:', err);
      });
  }
  console.log(usersAvailable?.data);
  
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
