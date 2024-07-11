import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {RouteProp} from '@react-navigation/native';
import {MainRootStackParams} from '../../navigation/MainStack';
import navigationString from '../../navigation/navigationString';

type ChatScreenRouteProp = RouteProp<
  MainRootStackParams,
  typeof navigationString.CHAT_SCREEN
>;
type ChatScreenProps = {
  route: ChatScreenRouteProp;
};

const ChatComponents: FC<ChatScreenProps> = ({route}) => {
  const {id} = route.params;
  return (
    <View>
      <Text style={{color: '#000'}}>ChatComponents</Text>
    </View>
  );
};

export default ChatComponents;

const styles = StyleSheet.create({});
