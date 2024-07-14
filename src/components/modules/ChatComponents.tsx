import {
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
import React, {FC, useEffect} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {MainRootStackParams} from '../../navigation/MainStack';
import navigationString from '../../navigation/navigationString';
import Header from '../common/Header';
import CallSvg from '../../asset/SVG/CallSvg';
import VideoSvg from '../../asset/SVG/VideoSvg';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useGetAllMessageQuery} from '../../API/endpoints/mainApi';
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

type ChatScreenRouteProp = RouteProp<
  MainRootStackParams,
  typeof navigationString.CHAT_SCREEN
>;
type ChatScreenProps = {
  route: ChatScreenRouteProp;
};

const ChatComponents: FC<ChatScreenProps> = ({route}) => {
  const navigation = useNavigation();
  const userId = route.params;
  let roomId = userId?.userId?._id;
  const loggedUser = useSelector((state: RootState) => state?.auth);
  const senderInfo = getSenderInfo(loggedUser, userId.userId);
  const {data} = useGetAllMessageQuery({roomId});

  return (
    <View style={{flex: 1}}>
      <Header
        isForthIcon={true}
        isRightHeaderContainer={true}
        userDp={senderInfo?.avatar?.url}
        userNameText={senderInfo?.username}
        isThirdIcon={true}
        thirdIcon={<CallSvg />}
        isSecondIcon={true}
        secondIcon={<VideoSvg />}
        leftArrowNavigation={() =>
          navigation.navigate(navigationString.MESSAGE_SCREEN)
        }
      />
      <View style={{flex: 1}}></View>
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
          />
        </View>
        <TouchableOpacity style={styles.sendIconContainer} activeOpacity={0.6}>
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
    marginBottom: moderateScale(8),
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
