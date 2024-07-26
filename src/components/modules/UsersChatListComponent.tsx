import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  useCreateChatMutation,
  useDeleteGroupChatMutation,
  useGetUsersChatListQuery,
} from '../../API/endpoints/mainApi';
import UsersChatListComponentsColums from '../columns/UsersChatListComponentsColums';
import navigationString from '../../navigation/navigationString';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainRootStackParams} from '../../navigation/MainStack';
import {useDispatch, useSelector} from 'react-redux';
import {createChatData} from '../../redux/slices/createChatSlice';
import {RootState} from '../../redux/store';
import Header from '../common/Header';
import CameraSvg from '../../asset/SVG/CameraSvg';
import QrCodeSvg from '../../asset/SVG/QrCodeSvg';
import DeleteSvg from '../../asset/SVG/DeleteSvg';
import {showSucess} from '../../utills/HelperFuncation';
import TextComp from '../common/TextComp';
import { moderateScale, scale, textScale, verticalScale } from '../../styles/responsiveStyles';

type Props = NativeStackScreenProps<
  MainRootStackParams,
  typeof navigationString.GetAvailableUser
>;

const UsersChatListComponent: FC<Props> = ({navigation}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [firstSelectionDone, setFirstSelectionDone] = useState<boolean>(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const loggedUser = useSelector((state: RootState) => state?.auth);

  const {
    data: userChatListData,
    isLoading: userChatListLoding,
    refetch: refetchData,
    isError: userChatListError,
  } = useGetUsersChatListQuery();

  const [createChat] = useCreateChatMutation();
  const [deleteGroupCHat] = useDeleteGroupChatMutation();
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

  const handleLongPressStart = (itemId: string) => {
    if (firstSelectionDone) {
      setSelectedItemId(prevItemId => (prevItemId === itemId ? null : itemId));
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
  const [isToggalMenuBotton, setIsToggalMenuBotton] = useState<boolean>(false);
  const ToggalMenuBotton = () => {
    setIsToggalMenuBotton(!isToggalMenuBotton);
  };

  async function handleDeleteChat(chatId: string) {
    try {
      const data = await deleteGroupCHat({chatId}).unwrap();
      await refetchData();
      setSelectedItemId(null);
      showSucess(data.message);
    } catch (error) {
      // showError(error?.data?.message)
      setSelectedItemId(null);
    }
  }

  //socket

 

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
              isSelected={item._id === selectedItemId}
              onLongPressStart={() => handleLongPressStart(item._id)}
              onLongPressEnd={handleLongPressEnd}
            />
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
