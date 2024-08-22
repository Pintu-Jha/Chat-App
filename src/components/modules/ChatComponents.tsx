import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useDeleteMessageMutation,
  useGetAllMessageQuery,
  useGetUsersChatListQuery,
  useSendMessageMutation,
} from '../../API/endpoints/mainApi';
import CallSvg from '../../asset/SVG/CallSvg';
import DeleteSvg from '../../asset/SVG/DeleteSvg';
import EmojiSvg from '../../asset/SVG/EmojiSvg';
import SendSvg from '../../asset/SVG/SendSvg';
import VideoSvg from '../../asset/SVG/VideoSvg';
import {useSocket} from '../../context/SocketContext';
import navigationString from '../../navigation/navigationString';
import {UnreadeMessageCount} from '../../redux/slices/UnreadeMessageCount';
import {updateLastMessage} from '../../redux/slices/UpdateLastMessage';
import {RootState} from '../../redux/store';
import {boxShadow} from '../../styles/Mixins';
import {
  moderateScale,
  textScale,
  verticalScale,
} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import {getSenderInfo} from '../../utills/InitialLoadData';
import ChatComponentColum from '../columns/ChatComponentColum';
import Header from '../common/Header';
import LoadingScreen from '../common/Loader';
import {ChatListItemInterface, ChatMessageInterface} from '../interfaces/chat';

type paramsType = {
  userId: ChatListItemInterface;
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

const ChatComponents = ({route, navigation}: any) => {
  const [selectedItem, setselectedItem] = useState<any>(null);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [firstSelectionDone, setFirstSelectionDone] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const {params} = route;
  const {userId} = params as paramsType;
  let roomId = userId?._id;
  const loggedUser = useSelector((state: RootState) => state.auth);
  const senderInfo = getSenderInfo(loggedUser, userId);

  const {
    data,
    refetch: refetchAllMessage,
    isLoading: isAllMessageLoading,
  } = useGetAllMessageQuery({roomId});

  const {data: userChatListData} = useGetUsersChatListQuery();

  const [sendMessage] = useSendMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const handleLongPressStart = (itemId: any) => {
    if (firstSelectionDone) {
      setselectedItem(itemId);
      return;
    }

    const timer = setTimeout(() => {
      setselectedItem(itemId);
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
      console.log('Chat to update not found');
    }
  };
  const updateChatLastMessageOnDeletion = (
    chatToUpdateId: string,
    message: ChatMessageInterface,
  ) => {
    const chatToUpdate = chats.find(chat => chat._id === chatToUpdateId)!;

    if (chatToUpdate.lastMessage?._id === message._id) {
      refetchAllMessage();
      chatToUpdate.lastMessage = data?.data[0];
      setChats([...chats]);
      console.log((chatToUpdate.lastMessage = data?.data[0]));
    }
  };

  const getChats = () => {
    setChats(userChatListData?.data || []);
  };
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

  const getMessages = async () => {
    if (!roomId) return Alert.alert('No chat is selected');
    setUnreadMessages(unreadMessages.filter(msg => msg.chat !== roomId));
    dispatch(UnreadeMessageCount({UnreadeMessageCount: unreadMessages}));
    setMessages(data?.data || []);
  };
  const sendChatMessage = async () => {
    if (!roomId || !socket) return;
    socket.emit(STOP_TYPING_EVENT, roomId);
    try {
      if (message === '') return;
      setMessage('');
      const response = await sendMessage({roomId, content: message}).unwrap();
      setMessages(prev => [response.data, ...prev]);
      updateChatLastMessage(roomId || '', response?.data);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleOnSocketTyping = (chatId: string) => {
    if (chatId !== roomId) return;
    setIsTyping(true);
  };

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

    const timerLength = 1000;

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit(STOP_TYPING_EVENT, roomId);
      setSelfTyping(false);
    }, timerLength);
  }, [roomId, selfTyping, socket]);

  const handleOnMessageChange = (text: string) => {
    setMessage(text);
    handleTyping();
  };
  const deleteChatMessage = async (message: ChatMessageInterface) => {
    try {
      const {data} = await deleteMessage({
        roomId,
        selectedItemId: message?._id,
      }).unwrap();
      setselectedItem(null);
      setMessages(prev => prev.filter(msg => msg._id !== data._id));
      updateChatLastMessageOnDeletion(message.chat, message);
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const onMessageDelete = (message: ChatMessageInterface) => {
    if (message?.chat !== roomId) {
      setUnreadMessages(prev => prev.filter(msg => msg._id !== message._id));
      dispatch(UnreadeMessageCount({UnreadeMessageCount: unreadMessages}));
    } else {
      setMessages(prev => prev.filter(msg => msg._id !== message._id));
    }
    updateChatLastMessageOnDeletion(message.chat, message);
  };
  const getChatDetails = () => {
    if (userId?.isGroupChat) {
      navigation.navigate(navigationString.GroupChatDetailsScreen, {roomId});
    }
  };
  useEffect(() => {
    getChats();
    if (roomId) {
      getMessages();
    }
  }, [data?.data]);

  useEffect(() => {
    if (!socket || !roomId) return;
    socket.emit(JOIN_CHAT_EVENT, roomId);
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    socket.on(MESSAGE_DELETE_EVENT, onMessageDelete);

    return () => {
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(TYPING_EVENT, handleOnSocketTyping);
      socket.off(STOP_TYPING_EVENT, handleOnSocketStopTyping);
      socket.off(MESSAGE_DELETE_EVENT, onMessageDelete);
    };
  }, [socket, chats]);

  const renderItem = ({item, index}: any) => {
    return (
      <ChatComponentColum
        item={item}
        index={index}
        key={'GetChatListColums' + item._id}
        isSelected={item._id === selectedItem?._id}
        onLongPressStart={() => handleLongPressStart(item)}
        onLongPressEnd={handleLongPressEnd}
      />
    );
  };

  const keyExtractor = (item: {_id: {toString: () => any}}) =>
    item._id.toString();

  return (
    <View style={{flex: 1, backgroundColor: '#ece5dd'}}>
      {selectedItem ? (
        <Header
          isForthIcon={true}
          isRightHeaderContainer={false}
          isThirdIcon={true}
          thirdIcon={<DeleteSvg />}
          onPressThirdIcon={() => deleteChatMessage(selectedItem)}
        />
      ) : (
        <Header
          isForthIcon={true}
          isRightHeaderContainer={true}
          userDp={senderInfo?.avatar?.url}
          userNameText={
            userId?.isGroupChat ? userId?.name : senderInfo.username
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

export default ChatComponents;

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
