import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import TextComp from '../common/TextComp';
import {spacing} from '../../styles/spacing';
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
  width,
} from '../../styles/responsiveStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {localIPAddress} from '../../config/url';
import {formatTimestamp} from '../../utills/HelperFuncation';
import LoadingScreen from '../common/Loader';

interface GetUserChatListColumsProps {
  item: Record<string, any>;
  index?: any;
  onPressProgram: (item: object) => void;
  refetchData?: () => void;
  isError?: boolean;
  onLongPressStart?: () => void;
  onLongPressEnd?: () => void;
  isSelected?: boolean;
  unreadCount?: number;
}
const UsersChatListComponentsColums: FC<GetUserChatListColumsProps> = ({
  item,
  onLongPressStart,
  onLongPressEnd,
  onPressProgram,
  isSelected,
  unreadCount = 0,
}) => {
  const loggedUser = useSelector((state: RootState) => state?.auth);
  const senderInfo =
    item?.participants[0]?._id === loggedUser?.user?._id
      ? item?.participants[1]
      : item?.participants[0];
  const lastMessage = !!item.lastMessage ? item.lastMessage : '';
  return (
    <>
        <TouchableOpacity
          style={[isSelected ? styles.selectedMessage : null, styles.container]}
          activeOpacity={0.7}
          onPress={() => onPressProgram(item)}
          onLongPress={() => {
            if (onLongPressStart) onLongPressStart();
          }}
          onPressOut={() => {
            if (onLongPressEnd) onLongPressEnd();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: moderateScale(10),
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {item.isGroupChat ? (
                <View style={styles.groupAvatarContainer}>
                  {item.participants.slice(0, 3).map(
                    (
                      participant: {
                        avatar: any;
                        _id: React.Key | null | undefined;
                      },
                      i: number,
                    ) => (
                      <Image
                        key={participant._id}
                        source={{
                          uri: participant?.avatar?.url.replace(
                            'localhost',
                            localIPAddress,
                          ),
                        }}
                        style={[
                          styles.avatar,
                          i === 0
                            ? styles.avatarPosition0
                            : i === 1
                            ? styles.avatarPosition1
                            : i === 2
                            ? styles.avatarPosition2
                            : null,
                        ]}
                      />
                    ),
                  )}
                </View>
              ) : (
                <Image
                  source={{
                    uri: senderInfo?.avatar?.url.replace(
                      'localhost',
                      localIPAddress,
                    ),
                  }}
                  style={styles.imageStyle}
                />
              )}
              <View style={{marginLeft: spacing.MARGIN_8}}>
                <TextComp
                  text={item.isGroupChat ? item.name : senderInfo?.username}
                  style={styles.nameText}
                />
                <View style={{flexDirection: 'row'}}>
                  {item?.isGroupChat && lastMessage?.content ? (
                    <Text
                      style={{
                        color: '#000',
                        fontSize: textScale(15),
                        fontWeight: '500',
                        textTransform: 'capitalize',
                      }}>
                      {`${item?.lastMessage?.sender?.username}: `}
                    </Text>
                  ) : null}

                  <Text
                    style={{
                      color: '#000',
                      fontSize: textScale(15),
                      fontWeight: '500',
                    }}>
                    {lastMessage?.content?.substring(0, 20)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              {unreadCount > 0 ? (
                <TextComp
                  text={`${formatTimestamp(item?.lastMessage?.createdAt)}`}
                  style={{
                    fontSize: textScale(14),
                    color: '#000',
                    fontWeight: '700',
                  }}
                />
              ) : null}
              {unreadCount > 0 ? (
                <View
                  style={{
                    backgroundColor: 'green',
                    width: scale(20),
                    height: scale(20),
                    borderRadius: scale(20) / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TextComp
                    text={`${unreadCount}`}
                    style={{fontSize: textScale(18), color: '#fff'}}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
    </>
  );
};

export default UsersChatListComponentsColums;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.MARGIN_16,
    paddingHorizontal: spacing.MARGIN_20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    color: '#0F0C1A',
    opacity: 1,
    fontSize: textScale(24),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  imageStyle: {
    width: scale(60),
    height: scale(60),
    resizeMode: 'cover',
    borderRadius: scale(60) / 2,
  },
  selectedMessage: {
    backgroundColor: '#a2efbf',
  },
  avatarPosition0: {
    left: 0,
    zIndex: 3,
  },
  avatarPosition1: {
    left: 10,
    zIndex: 2,
  },
  avatarPosition2: {
    left: 20,
    zIndex: 1,
  },
  avatar: {
    width: scale(55),
    height: scale(55),
    resizeMode: 'cover',
    borderRadius: scale(55) / 2,
    borderColor: 'white',
    position: 'absolute',
  },
  groupAvatarContainer: {
    width: scale(70),
    height: scale(60),
    position: 'relative',
  },
});
