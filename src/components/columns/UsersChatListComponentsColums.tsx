import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import TextComp from '../common/TextComp';
import {spacing} from '../../styles/spacing';
import {scale, textScale, width} from '../../styles/responsiveStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

interface GetUserChatListColumsProps {
  item: Record<string, any>;
  index?: any;
  onPressProgram: (item: object) => void ;
  isLoading?: boolean;
  refetchData?: () => void;
  isError?: boolean;
}
const UsersChatListComponentsColums: FC<GetUserChatListColumsProps> = ({
  item,
  isLoading,
  isError,
  onPressProgram,
}) => {
  const loggedUser = useSelector((state: RootState) => state?.auth);
  const senderInfo =
    item?.participants[0]?._id === loggedUser?.user?._id
      ? item?.participants[1]
      : item?.participants[0];

  const lastMessage = !!item.lastMessage ? item.lastMessage : '';
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPressProgram(senderInfo)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          paddingVertical: spacing.PADDING_8,
        }}>
        <Image
          source={{uri: senderInfo.avatar?.url}}
          style={styles.imageStyle}
        />
        <View style={{marginLeft: spacing.MARGIN_8}}>
          <TextComp text={senderInfo.username} style={styles.nameText} />
          <Text
            style={{color: '#000', fontSize: textScale(15), fontWeight: '500'}}>
            {lastMessage.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UsersChatListComponentsColums;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.MARGIN_16,
    marginHorizontal: spacing.MARGIN_20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    color: '#0F0C1A',
    opacity: 1,
    fontSize: textScale(24),
    fontWeight: '600',
    textTransform:'capitalize'
  },
  imageStyle: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'cover',
    borderRadius: scale(50) / 2,
  },
});
