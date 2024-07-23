import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {MainRootStackParams} from '../../navigation/MainStack';
import navigationString from '../../navigation/navigationString';
import Header from '../common/Header';
import CallSvg from '../../asset/SVG/CallSvg';
import VideoSvg from '../../asset/SVG/VideoSvg';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  useDeleteMessageMutation,
  useGetAllMessageQuery,
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
import { localIPAddress } from '../../config/url';

type ChatScreenRouteProp = RouteProp<
  MainRootStackParams,
  typeof navigationString.CHAT_SCREEN
>;
type ChatScreenProps = {
  route: ChatScreenRouteProp;
};

const ChatComponents: FC<ChatScreenProps> = ({route}) => {
  const [message, setMessage] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [firstSelectionDone, setFirstSelectionDone] = useState<boolean>(false);
  const navigation = useNavigation();
  const userId = route.params;
  let roomId = userId?.userId?._id;
  const loggedUser = useSelector((state: RootState) => state?.auth);
  const senderInfo = getSenderInfo(loggedUser, userId.userId);
  const {data,refetch:refetchAllMessage} = useGetAllMessageQuery({roomId});

  const [sendMessage] = useSendMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  async function onPressSendMessage() {
    try {
      await sendMessage({roomId, content: message}).unwrap();
      await refetchAllMessage()
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  }
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
  const handleDeleteMessage = async (selectedItemId: string) => {
    try {
      await deleteMessage({roomId, selectedItemId}).unwrap();
      await refetchAllMessage()
      setSelectedItemId(null);
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ece5dd'}}>
      {selectedItemId ? (
        <Header
          isForthIcon={true}
          isRightHeaderContainer={false}
          isThirdIcon={true}
          thirdIcon={<DeleteSvg />}
          onPressThirdIcon={() => handleDeleteMessage(selectedItemId)}
        />
      ) : (
        <Header
          isForthIcon={true}
          isRightHeaderContainer={true}
          userDp={senderInfo?.avatar?.url.replace("localhost", localIPAddress)}
          userNameText={senderInfo?.username}
          isThirdIcon={true}
          thirdIcon={<CallSvg />}
          isSecondIcon={true}
          secondIcon={<VideoSvg />}
          leftArrowNavigation={() =>
            navigation.navigate(navigationString.MESSAGE_SCREEN)
          }
        />
      )}
      <View style={{flex: 1}}>
        <FlatList
          data={data?.data}
          keyExtractor={item => item._id.toString()}
          inverted={true}
          renderItem={({item, index}) => (
            <ChatComponentColum
              item={item}
              index={index}
              key={'GetChatListColums' + item._id}
              isSelected={item._id === selectedItemId}
              onLongPressStart={() => handleLongPressStart(item._id)}
              onLongPressEnd={handleLongPressEnd}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text>
              <EmojiSvg />
            </Text>
          </View>
          <TextInput
            placeholder="Message"
            placeholderTextColor={'#9B9B9B'}
            style={styles.inputTextStyle}
            multiline={true}
            value={message}
            onChangeText={e => setMessage(e)}
          />
        </View>
        <TouchableOpacity
          style={styles.sendIconContainer}
          activeOpacity={0.6}
          onPress={onPressSendMessage}>
          <Text>
            <SendSvg />
          </Text>
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
