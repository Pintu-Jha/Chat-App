import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import CommonFlotingBotton from '../../../components/common/CommonFlotingBotton';
import {MainRootStackParams} from '../../../navigation/MainStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import navigationString from '../../../navigation/navigationString';
import UsersChatListComponent from '../../../components/modules/UsersChatListComponent';

type Props = NativeStackScreenProps<MainRootStackParams, 'getAvailableUser'>;
const Message: FC<Props> = ({navigation, route}) => {
 

  return (
    <View style={{flex: 1}}>
      <CommonFlotingBotton
        onPress={() => navigation.navigate(navigationString.GetAvailableUser)}
      />
      <UsersChatListComponent navigation={navigation} route={route} />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
