import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Header from '../../../components/common/Header';
import CommonFlotingBotton from '../../../components/common/CommonFlotingBotton';
import {MainRootStackParams} from '../../../navigation/MainStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import navigationString from '../../../navigation/navigationString';
import UsersChatListComponent from '../../../components/modules/UsersChatListComponent';
import {useDispatch} from 'react-redux';
import {logout} from '../../../redux/slices/authSlice';

type Props = NativeStackScreenProps<MainRootStackParams, 'getAvailableUser'>;

const Message: FC<Props> = ({navigation,route}) => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <View style={{flex: 1}}>
      <Header
        text="ChatApp"
        onPress={logOut}
        isForthIcon={true}
        isRightHeaderContainer={false}
      />
      <CommonFlotingBotton
        onPress={() => navigation.navigate(navigationString.GetAvailableUser)}
      />
      <UsersChatListComponent navigation={navigation} route={route} />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
