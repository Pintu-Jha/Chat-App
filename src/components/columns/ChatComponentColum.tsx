import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {moderateScale, scale, textScale} from '../../styles/responsiveStyles';
import {
  formatTimestamp,
  getColorForParticipant,
} from '../../utills/HelperFuncation';
import VirtualizedView from '../common/VirtualizedView';

interface GetChatListColumsProps {
  item: Record<string, any>;
  index?: any;
  onPressProgram?: (item: Record<string, any>) => void;
  isLoading?: boolean;
  refetchData?: () => void;
  isError?: boolean;
  isSelected?: boolean;
  onLongPressStart?: () => void;
  onLongPressEnd?: () => void;
  firstSelectionDone?: boolean;
}

const ChatComponentColum = ({
  item,
  onLongPressStart,
  onLongPressEnd,
  isSelected,
}: GetChatListColumsProps) => {
  const loggedUser = useSelector((state: RootState) => state?.auth?.user?._id);
  const participantColor = getColorForParticipant(item.sender?._id);
  return (
    <VirtualizedView style={{backgroundColor: '#ece5dd'}}>
      <TouchableOpacity
        onLongPress={() => {
          if (onLongPressStart) onLongPressStart();
        }}
        onPressOut={() => {
          if (onLongPressEnd) onLongPressEnd();
        }}
        style={[isSelected ? styles.selectedMessage : null]}
        activeOpacity={0.6}>
        <View
          style={[
            styles.chatContainer,
            item?.sender?._id === loggedUser
              ? styles.sentMessage
              : styles.receivedMessage,
          ]}>
          <View
            style={[
              styles.messageContainer,
              item?.sender?._id === loggedUser
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}>
            <Text
              style={{
                color: participantColor,
                fontSize: textScale(16),
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {item?.sender?.username}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: textScale(16),
                fontWeight: '400',
              }}>
              {item.content}
            </Text>
            <Text
              style={[
                item?.sender?._id === loggedUser
                  ? styles.sentTimeText
                  : styles.receivedTimeText,
                styles.timetextStyle,
              ]}>
              {formatTimestamp(item.createdAt)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </VirtualizedView>
  );
};

export default ChatComponentColum;

const styles = StyleSheet.create({
  chatContainer: {
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(8),
    marginHorizontal: moderateScale(8),
    marginVertical: moderateScale(2),
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#25D366',
    borderBottomRightRadius: moderateScale(15),
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderTopRightRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(15),
    borderBottomRightRadius: moderateScale(10),
  },
  messageContainer: {
    maxWidth: scale(260),
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(10),
  },
  sentTimeText: {
    alignSelf: 'flex-end',
  },
  receivedTimeText: {
    alignSelf: 'flex-end',
  },
  timetextStyle: {
    color: '#000',
    fontSize: textScale(12),
    paddingLeft: moderateScale(50),
  },
  selectedMessage: {
    backgroundColor: '#a2efbf',
  },
});
