import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useGetUsersChatListQuery} from '../../API/endpoints/mainApi';
import UsersChatListComponentsColums from '../columns/UsersChatListComponentsColums';

const UsersChatListComponent: FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    data: userChatListData,
    isLoading: userChatListLoding,
    refetch: refetchData,
    isError: userChatListError,
  } = useGetUsersChatListQuery();

  function onPressProgram(item: Record<string, any>) {
    // navigation.navigate(navigationString.CHAT_SCREEN, {id: item?._id});
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
