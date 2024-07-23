import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {
  useCreateChatMutation,
  useGetUsersChatListQuery,
} from '../../API/endpoints/mainApi';
import UsersChatListComponentsColums from '../columns/UsersChatListComponentsColums';
import navigationString from '../../navigation/navigationString';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainRootStackParams} from '../../navigation/MainStack';
import {useDispatch} from 'react-redux';
import {createChatData} from '../../redux/slices/createChatSlice';

type Props = NativeStackScreenProps<
  MainRootStackParams,
  typeof navigationString.GetAvailableUser
>;

const UsersChatListComponent: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    data: userChatListData,
    isLoading: userChatListLoding,
    refetch: refetchData,
    isError: userChatListError,
  } = useGetUsersChatListQuery();
  const [createChat] = useCreateChatMutation();
  async function onPressProgram(item: Record<string, any>) {
    try {
      const {data} = await createChat({receiverId: item._id}).unwrap();
      navigation.navigate(navigationString.CHAT_SCREEN, {userId: data});
    } catch (error) {
      console.log(error);
    }
  }
  const onRefresh = () => {
    setRefreshing(true);
    refetchData().finally(() => setRefreshing(false));
  };
  return (
    <View>
      <FlatList
        data={userChatListData?.data}
        keyExtractor={(item, index) => String(item._id)}
        renderItem={({item, index}) => {
          return (
            <UsersChatListComponentsColums
              item={item}
              index={index}
              isLoading={userChatListLoding}
              key={'GetUserChatListColums' + index}
              refetchData={refetchData}
              isError={userChatListError}
              onPressProgram={onPressProgram}
            />
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default UsersChatListComponent;

const styles = StyleSheet.create({});
