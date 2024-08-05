import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  useCreateChatMutation,
  useDeleteChatMutation,
  useDeleteGroupChatMutation,
  useGetAllMessageQuery,
  useGetUsersChatListQuery,
} from '../../API/endpoints/mainApi';
import UsersChatListComponentsColums from '../columns/UsersChatListComponentsColums';
import navigationString from '../../navigation/navigationString';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainRootStackParams} from '../../navigation/MainStack';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import Header from '../common/Header';
import CameraSvg from '../../asset/SVG/CameraSvg';
import QrCodeSvg from '../../asset/SVG/QrCodeSvg';
import DeleteSvg from '../../asset/SVG/DeleteSvg';
import {showSucess} from '../../utills/HelperFuncation';
import TextComp from '../common/TextComp';
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from '../../styles/responsiveStyles';
import {ChatListItemInterface} from '../interfaces/chat';
import LoadingScreen from '../common/Loader';

type Props = NativeStackScreenProps<
  MainRootStackParams,
  typeof navigationString.GetAvailableUser
>;

const UsersChatListComponent: FC<Props> = ({navigation}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [firstSelectionDone, setFirstSelectionDone] = useState<boolean>(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isToggalMenuBotton, setIsToggalMenuBotton] = useState<boolean>(false);
  const loggedUser = useSelector((state: RootState) => state?.auth);
  const [chats, setChats] = useState<ChatListItemInterface[]>([]);
  const [checkDeleteChats, setCheckDeleteChats] = useState<boolean>(false);

  const {
    data: userChatListData,
    isLoading: userChatListLoding,
    refetch: refetchData,
    isError: userChatListError,
  } = useGetUsersChatListQuery();
  const updateLastMessages = useSelector(
    (state: RootState) => state?.updateLastMessage.lastMessageUpdate,
  );
  const UnreadeMessageCount = useSelector(
    (state: RootState) => state?.UnreadeMessageCount.UnreadeMessageCount,
  );
  const [createChat] = useCreateChatMutation();
  const [deleteGroupCHat] = useDeleteGroupChatMutation();
  const [deleteChat] = useDeleteChatMutation();

  useEffect(() => {
    if (userChatListData) {
      setChats(userChatListData?.data || []);
    }
  }, [userChatListData]);

  useEffect(() => {
    if (updateLastMessages) {
      setChats(updateLastMessages);
    }
  }, [updateLastMessages]);
  async function onPressProgram(item: Record<string, any>) {
    const senderInfo =
      item?.participants[0]?._id === loggedUser?.user?._id
        ? item?.participants[1]
        : item?.participants[0];

    try {
      if (item.isGroupChat) {
        navigation.navigate(navigationString.CHAT_SCREEN, {userId: item});
      } else {
        const {data} = await createChat({receiverId: senderInfo?._id}).unwrap();
        navigation.navigate(navigationString.CHAT_SCREEN, {userId: data});
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onRefresh = () => {
    setRefreshing(true);
    refetchData().finally(() => setRefreshing(false));
  };

  const handleLongPressStart = (itemId: string, isGroupChat: boolean) => {
    if (firstSelectionDone) {
      setSelectedItemId(prevItemId => (prevItemId === itemId ? null : itemId));
      setCheckDeleteChats(isGroupChat);
      return;
    }

    const timer = setTimeout(() => {
      setSelectedItemId(prevItemId => (prevItemId === itemId ? null : itemId));
      setFirstSelectionDone(true);
    }, 500);
    setPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };
  const ToggalMenuBotton = () => {
    setIsToggalMenuBotton(!isToggalMenuBotton);
  };

  async function handleDeleteChat(chatId: string) {
    try {
      if (checkDeleteChats) {
        const data = await deleteGroupCHat({chatId}).unwrap();
        showSucess(data.message);
      } else {
        const data = await deleteChat({chatId}).unwrap();
        showSucess(data.message);
      }
      await refetchData();
      setSelectedItemId(null);
    } catch (error) {
      // showError(error?.data?.message)
      setSelectedItemId(null);
    }
  }
  return (
    <View>
      {selectedItemId ? (
        <Header
          isForthIcon={true}
          isRightHeaderContainer={false}
          isThirdIcon={true}
          thirdIcon={<DeleteSvg />}
          onPressThirdIcon={() => handleDeleteChat(selectedItemId)}
        />
      ) : (
        <Header
          text="ChatApp"
          onPressMeanu={ToggalMenuBotton}
          isForthIcon={true}
          isRightHeaderContainer={false}
          isThirdIcon={true}
          thirdIcon={<CameraSvg />}
          isSecondIcon={true}
          secondIcon={<QrCodeSvg />}
        />
      )}
      <FlatList
        data={chats}
        keyExtractor={(item, index) => String(item._id)}
        renderItem={({item, index}) => {
          return (
            <>
              {userChatListLoding ? (
                <LoadingScreen />
              ) : (
                <UsersChatListComponentsColums
                  item={item}
                  index={index}
                  key={'GetUserChatListColums' + index}
                  refetchData={refetchData}
                  isError={userChatListError}
                  onPressProgram={onPressProgram}
                  isSelected={item._id === selectedItemId}
                  onLongPressStart={() =>
                    handleLongPressStart(item._id, item.isGroupChat)
                  }
                  onLongPressEnd={handleLongPressEnd}
                  unreadCount={
                    UnreadeMessageCount?.filter(n => n.chat === item?._id)
                      .length
                  }
                />
              )}
            </>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {isToggalMenuBotton ? (
        <View style={styles.menuToggalBotton}>
          <TextComp
            text="Profile"
            style={{fontSize: textScale(20)}}
            onPress={() => {
              navigation.navigate(navigationString.Profile_Screen),
                setIsToggalMenuBotton(false);
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default UsersChatListComponent;

const styles = StyleSheet.create({
  menuToggalBotton: {
    backgroundColor: '#fff',
    position: 'absolute',
    paddingVertical: moderateScale(10),
    paddingRight: moderateScale(50),
    paddingLeft: moderateScale(15),
    top: verticalScale(45),
    right: scale(15),
  },
});
