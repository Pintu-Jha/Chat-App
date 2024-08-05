import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
  useId,
} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {MainRootStackParams} from '../../navigation/MainStack';
import navigationString from '../../navigation/navigationString';
import Header from '../common/Header';
import CallSvg from '../../asset/SVG/CallSvg';
import VideoSvg from '../../asset/SVG/VideoSvg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  useDeleteMessageMutation,
  useGetAllMessageQuery,
  useGetGroupChatDetailsQuery,
  useGetUsersChatListQuery,
  useSendMessageMutation,
} from '../../API/endpoints/mainApi';
import {getSenderInfo} from '../../utills/InitialLoadData';
import {
  moderateScale,
  textScale,
  verticalScale,
} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import {boxShadow} from '../../styles/Mixins';
import SendSvg from '../../asset/SVG/SendSvg';
import EmojiSvg from '../../asset/SVG/EmojiSvg';
import ChatComponentColum from '../columns/ChatComponentColum';
import DeleteSvg from '../../asset/SVG/DeleteSvg';
import {localIPAddress} from '../../config/url';
import {useSocket} from '../../context/SocketContext';
import {ChatListItemInterface, ChatMessageInterface} from '../interfaces/chat';
import LoadingScreen from '../common/Loader';
import {updateLastMessage} from '../../redux/slices/UpdateLastMessage';
import {UnreadeMessageCount} from '../../redux/slices/UnreadeMessageCount';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ChatScreenRouteProp = RouteProp<
  MainRootStackParams,
  typeof navigationString.CHAT_SCREEN
>;

type GroupChatDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainRootStackParams,
  typeof navigationString.GroupChatDetailsScreen
>;

type ChatScreenProps = {
  route: ChatScreenRouteProp;
  navigation: GroupChatDetailsScreenNavigationProp;
};

const CONNECTED_EVENT = 'connect';
const DISCONNECT_EVENT = 'disconnect';
const JOIN_CHAT_EVENT = 'joinChat';
const NEW_CHAT_EVENT = 'newChat';
const TYPING_EVENT = 'typing';
const STOP_TYPING_EVENT = 'stopTyping';
const MESSAGE_RECEIVED_EVENT = 'messageReceived';
const LEAVE_CHAT_EVENT = 'leaveChat';
const UPDATE_GROUP_NAME_EVENT = 'updateGroupName';
const MESSAGE_DELETE_EVENT = 'messageDeleted';

const ChatComponents: FC<ChatScreenProps> = ({route, navigation}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [firstSelectionDone, setFirstSelectionDone] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const userId = route.params;

  let roomId = userId?.userId?._id;

  const loggedUser = useSelector((state: RootState) => state.auth);
  const senderInfo = getSenderInfo(loggedUser, userId.userId);
  const {
    data,
    refetch: refetchAllMessage,
    isLoading: isAllMessageLoading,
  } = useGetAllMessageQuery({roomId});

  const {
    data: GetGroupChatDetails,
    isSuccess,
    isUninitialized,
  } = useGetGroupChatDetailsQuery({
    roomId,
  });
  const {data: userChatListData} = useGetUsersChatListQuery();

  const [sendMessage] = useSendMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

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
  const dispatch = useDispatch();
  // socket
  const {socket} = useSocket();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessageInterface[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<ChatMessageInterface[]>(
    [],
  );
  const [isTyping, setIsTyping] = useState(false);
  const [selfTyping, setSelfTyping] = useState(false);
  const [chats, setChats] = useState<ChatListItemInterface[]>([]);

  const updateChatLastMessage = (
    chatToUpdateId: string,
    message: ChatMessageInterface,
  ) => {
    const chatIndex = chats.findIndex(chat => chat._id === chatToUpdateId);

    if (chatIndex !== -1) {
      const updatedChat = {
        ...chats[chatIndex],
        lastMessage: message,
        updatedAt: message?.updatedAt,
      };

      const updatedChats = [
        updatedChat,
        ...chats.slice(0, chatIndex),
        ...chats.slice(chatIndex + 1),
      ];

      setChats(updatedChats);
      dispatch(
        updateLastMessage({
          lastMessage: updatedChats,
        }),
      );
    } else {
      console.error('Chat to update not found');
    }
  };
  const updateChatLastMessageOnDeletion = (
    chatToUpdateId: string,
    message: ChatMessageInterface,
  ) => {
    const chatToUpdate = chats.find(chat => chat._id === chatToUpdateId)!;
    if (chatToUpdate.lastMessage?._id === message._id) {
      refetchAllMessage();

      // chatToUpdate.lastMessage = data[0];
      setChats([...chats]);
    }
  };

  const getChats = async () => {
    setChats(userChatListData?.data || []);
  };
  const onConnect = useCallback(() => {
    setIsConnected(true);
  }, []);

  const onDisconnect = useCallback(() => {
    setIsConnected(false);
  }, []);

  const onMessageReceived = (message: ChatMessageInterface) => {
    if (message?.chat !== roomId) {
      setUnreadMessages(prev => {
        const updatedMessages = [message, ...prev];
        dispatch(UnreadeMessageCount({UnreadeMessageCount: updatedMessages}));
        return updatedMessages;
      });
    } else {
      setMessages(prev => [message, ...prev]);
    }

    updateChatLastMessage(message.chat || '', message);
  };

  const getMessages = () => {
    if (!roomId) return Alert.alert('No chat is selected');
    setUnreadMessages(unreadMessages.filter(msg => msg.chat !== roomId));
    dispatch(UnreadeMessageCount({UnreadeMessageCount: unreadMessages}));
    try {
      setMessages(data?.data || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };
  const sendChatMessage = async () => {
    if (!roomId || !socket) return;
    socket.emit(STOP_TYPING_EVENT, roomId);

    try {
      if (message === '') return;
      const response = await sendMessage({roomId, content: message}).unwrap();
      setMessage('');
      const newMessage = response.data;
      setMessages(prev => [newMessage, ...prev]);
      refetchAllMessage();
      updateChatLastMessage(roomId || '', response?.data);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleOnSocketTyping = useCallback(
    (chatId: string) => {
      if (chatId !== roomId) return;
      setIsTyping(true);
    },
    [roomId],
  );

  const handleOnSocketStopTyping = useCallback(
    (chatId: string) => {
      if (chatId !== roomId) return;
      setIsTyping(false);
    },
    [roomId],
  );

  const handleTyping = useCallback(() => {
    if (!socket || !roomId) return;

    if (!selfTyping) {
      setSelfTyping(true);
      socket.emit(TYPING_EVENT, roomId);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const timerLength = 2000;

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit(STOP_TYPING_EVENT, roomId);
      setSelfTyping(false);
    }, timerLength);
  }, [roomId, selfTyping, socket]);

  const handleOnMessageChange = useCallback(
    (text: string) => {
      setMessage(text);
      handleTyping();
    },
    [handleTyping],
  );

  const deleteChatMessage = useCallback(
    async (selectedItemId: string) => {
      try {
        const {data} = await deleteMessage({roomId, selectedItemId}).unwrap();
        setSelectedItemId(null);
        setMessages(prev => prev.filter(msg => msg._id !== data._id));
        // updateChatLastMessageOnDeletion(message.chat, message);
      } catch (error) {
        console.error('Failed to delete message:', error);
      }
    },
    [roomId, deleteMessage],
  );

  const onMessageDelete = useCallback(
    (message: ChatMessageInterface) => {
      if (message?.chat !== roomId) {
        setUnreadMessages(prev => prev.filter(msg => msg._id !== message._id));
        dispatch(UnreadeMessageCount({UnreadeMessageCount: unreadMessages}));
        console.log('del', unreadMessages);
      } else {
        setMessages(prev => prev.filter(msg => msg._id !== message._id));
      }
      updateChatLastMessageOnDeletion(message.chat, message);
    },
    [roomId],
  );

  const onNewChat = (chat: ChatListItemInterface) => {
    setChats(prev => [chat, ...prev]);
  };

  const onChatLeave = (chat: ChatListItemInterface) => {
    setChats(prev => prev.filter(c => c._id !== chat._id));
  };

  const onGroupNameChange = (chat: ChatListItemInterface) => {
    setChats(prev => [
      ...prev.map(c => {
        if (c._id === chat._id) {
          return chat;
        }
        return c;
      }),
    ]);
  };
  const getChatDetails = () => {
    {
      isSuccess &&
        navigation.navigate(navigationString.GroupChatDetailsScreen, {
          GroupChatDetails: GetGroupChatDetails?.data,
        });
    }
  };
  useEffect(() => {
    getChats();
    if (roomId) {
      getMessages();
    }
  }, []);

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit(JOIN_CHAT_EVENT, roomId);

    socket.on(CONNECTED_EVENT, onConnect);
    socket.on(DISCONNECT_EVENT, onDisconnect);
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    socket.on(MESSAGE_DELETE_EVENT, onMessageDelete);
    socket.on(NEW_CHAT_EVENT, onNewChat);
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    socket.on(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);

    return () => {
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(TYPING_EVENT, handleOnSocketTyping);
      socket.off(STOP_TYPING_EVENT, handleOnSocketStopTyping);
      socket.off(MESSAGE_DELETE_EVENT, onMessageDelete);
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
      socket.off(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);
    };
  }, [
    socket,
    roomId,
    onConnect,
    onDisconnect,
    onMessageReceived,
    handleOnSocketTyping,
    handleOnSocketStopTyping,
    onMessageDelete,
  ]);
  const renderItem = ({item, index}: any) => (
    <ChatComponentColum
      item={item}
      index={index}
      key={'GetChatListColums' + item._id}
      isSelected={item._id === selectedItemId}
      onLongPressStart={() => handleLongPressStart(item._id)}
      onLongPressEnd={handleLongPressEnd}
    />
  );

  const keyExtractor = useCallback(
    (item: {_id: {toString: () => any}}) => item._id.toString(),
    [],
  );
  return (
    <View style={{flex: 1, backgroundColor: '#ece5dd'}}>
      {selectedItemId ? (
        <Header
          isForthIcon={true}
          isRightHeaderContainer={false}
          isThirdIcon={true}
          thirdIcon={<DeleteSvg />}
          onPressThirdIcon={() => deleteChatMessage(selectedItemId)}
        />
      ) : (
        <Header
          isForthIcon={true}
          isRightHeaderContainer={true}
          userDp={senderInfo?.avatar?.url.replace('localhost', localIPAddress)}
          userNameText={
            userId.userId.isGroupChat ? userId.userId.name : senderInfo.username
          }
          typing={isTyping}
          isThirdIcon={true}
          thirdIcon={<CallSvg />}
          isSecondIcon={true}
          secondIcon={<VideoSvg />}
          leftArrowNavigation={() => navigation.goBack()}
          getChatDetails={getChatDetails}
        />
      )}
      <View style={{flex: 1}}>
        {isAllMessageLoading ? (
          <LoadingScreen />
        ) : (
          <FlatList
            data={messages}
            keyExtractor={keyExtractor}
            inverted
            renderItem={renderItem}
          />
        )}
      </View>
      <View style={styles.textInputContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <EmojiSvg />
          </View>
          <TextInput
            placeholder="Message"
            placeholderTextColor={'#9B9B9B'}
            style={styles.inputTextStyle}
            multiline
            value={message}
            onChangeText={handleOnMessageChange}
          />
        </View>
        <TouchableOpacity
          style={styles.sendIconContainer}
          activeOpacity={0.6}
          onPress={sendChatMessage}>
          <SendSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ChatComponents);

const styles = StyleSheet.create({
  textInputContainer: {
    maxHeight: verticalScale(128),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(16),
    ...boxShadow('#2D66FE2E', {height: 8, width: 0}, 8, 0.3),
    backgroundColor: '#FFFFFF',
    marginVertical: moderateScale(8),
    marginHorizontal: moderateScale(4),
  },
  inputTextStyle: {
    fontSize: textScale(18),
    fontFamily: fontNames.POPPINS_FONT_FAMILY_REGULAR,
    color: '#000',
    flex: 0.9,
    marginLeft: moderateScale(8),
  },
  sendIconContainer: {
    backgroundColor: '#000',
    borderRadius: moderateScale(16),
    padding: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
